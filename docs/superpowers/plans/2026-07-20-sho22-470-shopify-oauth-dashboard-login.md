# Shopify OAuth Dashboard Login (SHO22-470) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let merchants reach the web dashboard from the marketing-site "Dashboard" button via Shopify login — silent auto-login when a Shopify session + installed app exist, App Store listing redirect when the app isn't installed, and a "Continue with Shopify" option on the sign-in page.

**Architecture:** A new Rails endpoint (`POST /api/v1/shopify-login`) checks the `Shop` table for the entered store domain and returns either a Shopify authorize URL (with a Redis-backed one-time `state` nonce) or the App Store listing URL. A new Rails callback (`GET /auth/dashboard/callback`) verifies state + HMAC, proves the visitor is shop staff by exchanging the OAuth code for a per-user (online) token that is **never persisted**, then reuses the existing `HandoffTokenStore` → `dashboard.agencyai.app/auth/shopify?token=…` → `POST /api/v1/sessions/shopify` path unchanged. The Next.js sign-in page gets a "Continue with Shopify" section plus a once-per-browser-session automatic attempt for remembered store domains.

**Tech Stack:** Rails (agency-shopify repo, Minitest + WebMock, Redis, Net::HTTP), Next.js 16 / React 19 (agency-dashboard repo, Vitest + Testing Library, Zustand).

## Global Constraints

- **Two repos.** Rails tasks run in `/Users/vladholovchak/work/agency-shopify`; dashboard tasks run in `/Users/vladholovchak/work/agency-dashboard`. Commit to each repo separately, on a feature branch `vladholovchak/sho22-470-shopify-oauth-login` in each.
- **No new scopes.** The authorize URL must request exactly `ShopifyApp.configuration.scope` (currently `read_customers,read_orders,read_all_orders,read_products,read_reports`) so already-installed shops get a silent redirect with no re-consent.
- **No new gems or npm packages.** Use `Net::HTTP` (existing convention, see `app/services/slack_notifier.rb:128`), WebMock (already in Gemfile line 160), and Vitest/Testing Library (already in package.json).
- **Never persist the online access token** obtained in the callback. It is proof-of-identity only. The shop's offline token in `Shop#shopify_token` must not be touched by this flow.
- **Callback host convention:** external callback URLs are built as `"#{ENV["HOST"]}/…"` (see `app/controllers/api/google_auth_controller.rb:459`). Dashboard URL is `ENV["AGENCY_DASHBOARD_URL"]` (already set, used by the embedded app's Advanced Dashboard button).
- **App Store listing URL:** `https://apps.shopify.com/agency-ai` (handle from `shopify.app.toml:6`).
- **Client-approved disclosure:** `POST /api/v1/shopify-login` intentionally reveals whether a domain has the app installed (needed for the listing-page redirect). Do not "fix" this to a generic error.
- **Error redirect contract:** every callback failure redirects to `#{AGENCY_DASHBOARD_URL}/sign-in?error=shopify` — the sign-in page shows a toast for it and must never auto-retry when `?error` is present.
- Rails tests: `bin/rails test <path>` from the agency-shopify repo root. Dashboard tests: `npm test -- <path>` from the agency-dashboard repo root.

---

## Part 1 — Rails (`/Users/vladholovchak/work/agency-shopify`)

### Task 1: DashboardLoginStateStore (OAuth state nonce)

**Files:**
- Create: `app/lib/dashboard_login_state_store.rb`
- Test: `test/lib/dashboard_login_state_store_test.rb`

**Interfaces:**
- Consumes: nothing (Redis only, same pattern as `app/lib/handoff_token_store.rb`)
- Produces: `DashboardLoginStateStore.write(shop_domain) → state_token (String)` and `DashboardLoginStateStore.redeem(state) → shop_domain (String) | nil`. One-shot: a second `redeem` of the same state returns nil (no grace window — the OAuth redirect fires exactly once, unlike the StrictMode-double-fired handoff redemption).

- [ ] **Step 1: Write the failing test**

```ruby
# test/lib/dashboard_login_state_store_test.rb
# frozen_string_literal: true

require "test_helper"

class DashboardLoginStateStoreTest < ActiveSupport::TestCase
  DOMAIN = "state-shop.myshopify.com"

  # In-memory stand-in for the Redis client so tests never hit a real server.
  class FakeRedis
    def initialize = @store = {}
    def set(key, value, **_opts) = @store[key] = value
    def get(key) = @store[key]
    def getdel(key) = @store.delete(key)
  end

  setup do
    DashboardLoginStateStore.instance_variable_set(:@redis, FakeRedis.new)
  end

  teardown do
    DashboardLoginStateStore.instance_variable_set(:@redis, nil)
  end

  test "write returns a hex token and redeem resolves it to the domain" do
    state = DashboardLoginStateStore.write(DOMAIN)
    assert_match(/\A\h{64}\z/, state)
    assert_equal DOMAIN, DashboardLoginStateStore.redeem(state)
  end

  test "redeem is one-shot" do
    state = DashboardLoginStateStore.write(DOMAIN)
    DashboardLoginStateStore.redeem(state)
    assert_nil DashboardLoginStateStore.redeem(state)
  end

  test "redeem of an unknown state returns nil" do
    assert_nil DashboardLoginStateStore.redeem("nope")
  end
end
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bin/rails test test/lib/dashboard_login_state_store_test.rb`
Expected: FAIL with `NameError: uninitialized constant DashboardLoginStateStore`

- [ ] **Step 3: Write the implementation**

```ruby
# app/lib/dashboard_login_state_store.rb
# One-time OAuth `state` nonces for the standalone dashboard's
# "Continue with Shopify" login (SHO22-470). Mirrors HandoffTokenStore but
# without a redeemed-grace window: the Shopify OAuth redirect delivers the
# state exactly once, so a strict one-shot GETDEL is correct and any replay
# must fail.
class DashboardLoginStateStore
  TTL_SECONDS = 600 # merchant may need to log into Shopify mid-flow
  KEY_PREFIX = "dashboard_login_state"

  # Returns the state token string for the given shopify_domain.
  def self.write(shopify_domain)
    state = SecureRandom.hex(32)
    redis.set(key(state), shopify_domain, ex: TTL_SECONDS)
    state
  end

  # Returns the shopify_domain the state was issued for, or nil if the state
  # is unknown, expired, or already redeemed.
  def self.redeem(state)
    return nil if state.blank?
    redis.getdel(key(state))
  end

  def self.key(state)
    "#{KEY_PREFIX}:#{state}"
  end
  private_class_method :key

  def self.redis
    # Heroku Redis uses rediss:// with a self-signed cert — same VERIFY_NONE
    # handling the cache store and Sidekiq use, otherwise the TLS handshake raises.
    @redis ||= Redis.new(
      url: ENV.fetch("REDIS_URL", "redis://localhost:6379/1"),
      ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }
    )
  end
  private_class_method :redis
end
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bin/rails test test/lib/dashboard_login_state_store_test.rb`
Expected: PASS (3 runs, 0 failures)

- [ ] **Step 5: Commit**

```bash
git add app/lib/dashboard_login_state_store.rb test/lib/dashboard_login_state_store_test.rb
git commit -m "feat: add DashboardLoginStateStore for dashboard Shopify-login OAuth state"
```

---

### Task 2: ShopDomainNormalizer

**Files:**
- Create: `app/lib/shop_domain_normalizer.rb`
- Test: `test/lib/shop_domain_normalizer_test.rb`

**Interfaces:**
- Produces: `ShopDomainNormalizer.normalize(input) → "example.myshopify.com" (String) | nil`. Accepts bare store names (`example`), full domains, and URLs with protocol/path; returns nil for anything that doesn't resolve to a valid `*.myshopify.com` domain.

- [ ] **Step 1: Write the failing test**

```ruby
# test/lib/shop_domain_normalizer_test.rb
# frozen_string_literal: true

require "test_helper"

class ShopDomainNormalizerTest < ActiveSupport::TestCase
  test "accepts a bare store name" do
    assert_equal "my-store.myshopify.com", ShopDomainNormalizer.normalize("my-store")
  end

  test "accepts a full domain and downcases" do
    assert_equal "my-store.myshopify.com", ShopDomainNormalizer.normalize("My-Store.myshopify.com")
  end

  test "strips protocol, path, and whitespace" do
    assert_equal "my-store.myshopify.com",
      ShopDomainNormalizer.normalize(" https://my-store.myshopify.com/admin ")
  end

  test "rejects non-myshopify hosts" do
    assert_nil ShopDomainNormalizer.normalize("example.com")
    assert_nil ShopDomainNormalizer.normalize("evil.myshopify.com.attacker.com")
  end

  test "rejects blank and garbage input" do
    assert_nil ShopDomainNormalizer.normalize(nil)
    assert_nil ShopDomainNormalizer.normalize("")
    assert_nil ShopDomainNormalizer.normalize("my store!")
  end
end
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bin/rails test test/lib/shop_domain_normalizer_test.rb`
Expected: FAIL with `NameError: uninitialized constant ShopDomainNormalizer`

- [ ] **Step 3: Write the implementation**

```ruby
# app/lib/shop_domain_normalizer.rb
# Normalizes merchant-entered store identifiers ("my-store",
# "https://My-Store.myshopify.com/admin") to a canonical
# "my-store.myshopify.com", or nil when the input can't be a Shopify shop
# domain. The strict pattern is a safety boundary: the result is interpolated
# into the OAuth authorize URL, so nothing except *.myshopify.com may pass.
class ShopDomainNormalizer
  DOMAIN_RE = /\A[a-z0-9][a-z0-9\-]*\.myshopify\.com\z/

  def self.normalize(input)
    return nil if input.blank?

    domain = input.to_s.strip.downcase
    domain = domain.sub(%r{\Ahttps?://}, "").split("/").first.to_s
    domain = "#{domain}.myshopify.com" unless domain.include?(".")
    domain.match?(DOMAIN_RE) ? domain : nil
  end
end
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bin/rails test test/lib/shop_domain_normalizer_test.rb`
Expected: PASS (5 runs, 0 failures)

- [ ] **Step 5: Commit**

```bash
git add app/lib/shop_domain_normalizer.rb test/lib/shop_domain_normalizer_test.rb
git commit -m "feat: add ShopDomainNormalizer for merchant-entered store domains"
```

---

### Task 3: POST /api/v1/shopify-login endpoint

**Files:**
- Create: `app/controllers/api/v1/shopify_login_controller.rb`
- Modify: `config/routes.rb:26` (add route next to `shopify-handoff-token`)
- Test: `test/controllers/api/v1/shopify_login_controller_test.rb`

**Interfaces:**
- Consumes: `ShopDomainNormalizer.normalize` (Task 2), `DashboardLoginStateStore.write` (Task 1).
- Produces: `POST /api/v1/shopify-login` with JSON body `{ shop_domain: string }`. Responses:
  - `200 { "installed": true, "authorize_url": "https://<shop>/admin/oauth/authorize?..." }`
  - `200 { "installed": false, "listing_url": "https://apps.shopify.com/agency-ai" }`
  - `422 { "error": "Enter a valid .myshopify.com store domain" }`
- Also produces constant `Api::V1::ShopifyLoginController::LISTING_URL` used by Task 4.

- [ ] **Step 1: Add the route**

In `config/routes.rb`, directly under line 26 (`get "shopify-handoff-token" => "shopify_handoff#create"`), add:

```ruby
      post   "shopify-login"    => "shopify_login#create"
```

- [ ] **Step 2: Write the failing test**

```ruby
# test/controllers/api/v1/shopify_login_controller_test.rb
# frozen_string_literal: true

require "test_helper"

# POST /api/v1/shopify-login — entry point for the standalone dashboard's
# "Continue with Shopify" button (SHO22-470). Installed shops get a Shopify
# authorize URL with a one-time state nonce; unknown shops get the App Store
# listing URL (intentional, client-approved disclosure — the redirect target
# IS the answer).
module Api
  module V1
    class ShopifyLoginControllerTest < ActionDispatch::IntegrationTest
      DOMAIN = "login-shop.myshopify.com"

      class FakeRedis
        def initialize = @store = {}
        def set(key, value, **_opts) = @store[key] = value
        def get(key) = @store[key]
        def getdel(key) = @store.delete(key)
      end

      setup do
        @old_key = ENV["SHOPIFY_API_KEY"]
        @old_host = ENV["HOST"]
        ENV["SHOPIFY_API_KEY"] = "test_api_key"
        ENV["HOST"] = "https://s.example.test"
        DashboardLoginStateStore.instance_variable_set(:@redis, FakeRedis.new)
      end

      teardown do
        ENV["SHOPIFY_API_KEY"] = @old_key
        ENV["HOST"] = @old_host
        DashboardLoginStateStore.instance_variable_set(:@redis, nil)
      end

      def login(shop_domain)
        post "/api/v1/shopify-login", params: { shop_domain: }, as: :json
      end

      test "invalid domain returns 422" do
        login("not a shop!")
        assert_response :unprocessable_entity
        assert_equal "Enter a valid .myshopify.com store domain", JSON.parse(response.body)["error"]
      end

      test "unknown shop returns the App Store listing URL" do
        login("ghost-shop.myshopify.com")
        assert_response :success
        body = JSON.parse(response.body)
        assert_equal false, body["installed"]
        assert_equal "https://apps.shopify.com/agency-ai", body["listing_url"]
      end

      test "installed shop returns an authorize URL with state, scopes, and per-user grant" do
        Shop.create!(shopify_domain: DOMAIN, shopify_token: "t")

        login("Login-Shop") # exercises normalization too
        assert_response :success
        body = JSON.parse(response.body)
        assert_equal true, body["installed"]

        uri = URI(body["authorize_url"])
        assert_equal DOMAIN, uri.host
        assert_equal "/admin/oauth/authorize", uri.path

        query = Rack::Utils.parse_nested_query(uri.query)
        assert_equal "test_api_key", query["client_id"]
        assert_equal ShopifyApp.configuration.scope, query["scope"]
        assert_equal "https://s.example.test/auth/dashboard/callback", query["redirect_uri"]
        assert_equal ["per-user"], query["grant_options"]
        # state must be redeemable back to the shop domain
        assert_equal DOMAIN, DashboardLoginStateStore.redeem(query["state"])
      end
    end
  end
end
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bin/rails test test/controllers/api/v1/shopify_login_controller_test.rb`
Expected: FAIL (routing error or uninitialized constant `Api::V1::ShopifyLoginController`)

- [ ] **Step 4: Write the controller**

```ruby
# app/controllers/api/v1/shopify_login_controller.rb
module Api
  module V1
    # Entry point for the standalone dashboard's "Continue with Shopify"
    # login (SHO22-470).
    #
    # Intentionally inherits ApplicationController, NOT Api::V1::BaseController —
    # this must be reachable before auth, same as SessionsController.
    #
    # Unlike ShopifyHandoffController, this endpoint deliberately reveals
    # whether a shop has the app installed: uninstalled shops are sent to the
    # App Store listing, which discloses the same fact. Client-approved.
    class ShopifyLoginController < ApplicationController
      skip_before_action :verify_authenticity_token

      LISTING_URL = "https://apps.shopify.com/agency-ai"

      # POST /api/v1/shopify-login  { shop_domain: "my-store" | "my-store.myshopify.com" | url }
      def create
        shop_domain = ShopDomainNormalizer.normalize(params[:shop_domain])

        unless shop_domain
          render json: { error: "Enter a valid .myshopify.com store domain" }, status: :unprocessable_entity
          return
        end

        unless Shop.exists?(shopify_domain: shop_domain)
          render json: { installed: false, listing_url: LISTING_URL }
          return
        end

        state = DashboardLoginStateStore.write(shop_domain)
        render json: { installed: true, authorize_url: authorize_url(shop_domain, state) }
      end

      private

      # Standard authorization-code grant against the shop. Same scopes the app
      # already holds, so installed shops with a live admin session redirect
      # back silently (no consent screen). grant_options[]=per-user requests an
      # ONLINE token: proof of the acting staff user, and it never touches the
      # shop's stored offline token.
      def authorize_url(shop_domain, state)
        query = {
          client_id: ENV["SHOPIFY_API_KEY"],
          scope: ShopifyApp.configuration.scope,
          redirect_uri: "#{ENV["HOST"]}/auth/dashboard/callback",
          state: state,
          "grant_options[]": "per-user"
        }.to_query
        "https://#{shop_domain}/admin/oauth/authorize?#{query}"
      end
    end
  end
end
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bin/rails test test/controllers/api/v1/shopify_login_controller_test.rb`
Expected: PASS (3 runs, 0 failures)

- [ ] **Step 6: Verify CORS covers the new path**

Run: `grep -rn "api/v1\|resource" config/initializers/cors.rb`
Expected: a wildcard like `resource "/api/v1/*"` — the new route is covered automatically. If paths are enumerated individually, add `/api/v1/shopify-login` to the list and include that edit in the commit.

- [ ] **Step 7: Commit**

```bash
git add app/controllers/api/v1/shopify_login_controller.rb config/routes.rb test/controllers/api/v1/shopify_login_controller_test.rb
git commit -m "feat: add POST /api/v1/shopify-login for dashboard Continue-with-Shopify"
```

---

### Task 4: GET /auth/dashboard/callback (OAuth callback)

**Files:**
- Create: `app/controllers/dashboard_login_controller.rb`
- Modify: `config/routes.rb:16` (add top-level route after the app pages block, well before the catch-all at line 409)
- Test: `test/controllers/dashboard_login_controller_test.rb`

**Interfaces:**
- Consumes: `DashboardLoginStateStore.redeem` (Task 1), `HandoffTokenStore.write` (existing), `Api::V1::ShopifyLoginController::LISTING_URL` (Task 3), `ENV["AGENCY_DASHBOARD_URL"]`, `ENV["SHOPIFY_API_KEY"]`, `ENV["SHOPIFY_API_SECRET"]`.
- Produces: `GET /auth/dashboard/callback?code=…&shop=…&state=…&hmac=…&timestamp=…` which 302-redirects to:
  - success → `#{AGENCY_DASHBOARD_URL}/auth/shopify?token=<handoff>` (existing redemption path, unchanged)
  - shop uninstalled mid-flow → App Store listing
  - any verification/exchange failure → `#{AGENCY_DASHBOARD_URL}/sign-in?error=shopify`

- [ ] **Step 1: Add the route**

In `config/routes.rb`, after line 16 (`get "settings" => ...`), add:

```ruby
  # SHO22-470 — Shopify OAuth callback for the standalone dashboard's
  # "Continue with Shopify" login. Must NOT collide with the ShopifyApp
  # engine's /auth/shopify/* routes.
  get "auth/dashboard/callback" => "dashboard_login#callback"
```

- [ ] **Step 2: Write the failing test**

```ruby
# test/controllers/dashboard_login_controller_test.rb
# frozen_string_literal: true

require "test_helper"

# GET /auth/dashboard/callback — Shopify OAuth callback for the standalone
# dashboard login (SHO22-470). Every failure mode must redirect to the
# dashboard sign-in page with ?error=shopify (never render an error page on
# the API host); success mints a HandoffTokenStore token and redirects into
# the existing /auth/shopify redemption path.
class DashboardLoginControllerTest < ActionDispatch::IntegrationTest
  DOMAIN = "cb-shop.myshopify.com"
  DASHBOARD_URL = "https://dashboard.example.test"
  API_SECRET = "test_api_secret"

  class FakeRedis
    def initialize = @store = {}
    def set(key, value, **_opts) = @store[key] = value
    def get(key) = @store[key]
    def getdel(key) = @store.delete(key)
  end

  setup do
    @old_env = {
      "AGENCY_DASHBOARD_URL" => ENV["AGENCY_DASHBOARD_URL"],
      "SHOPIFY_API_KEY" => ENV["SHOPIFY_API_KEY"],
      "SHOPIFY_API_SECRET" => ENV["SHOPIFY_API_SECRET"]
    }
    ENV["AGENCY_DASHBOARD_URL"] = DASHBOARD_URL
    ENV["SHOPIFY_API_KEY"] = "test_api_key"
    ENV["SHOPIFY_API_SECRET"] = API_SECRET
    DashboardLoginStateStore.instance_variable_set(:@redis, FakeRedis.new)
    HandoffTokenStore.instance_variable_set(:@redis, FakeRedis.new)
  end

  teardown do
    @old_env.each { |k, v| ENV[k] = v }
    DashboardLoginStateStore.instance_variable_set(:@redis, nil)
    HandoffTokenStore.instance_variable_set(:@redis, nil)
  end

  # Builds callback params with a valid HMAC the way Shopify does: all params
  # except hmac, sorted, joined k=v with &, HMAC-SHA256 hex with the API secret.
  def callback_params(shop: DOMAIN, state:, code: "authcode", extra: {})
    params = { "code" => code, "shop" => shop, "state" => state,
               "timestamp" => Time.now.to_i.to_s }.merge(extra)
    message = params.sort.map { |k, v| "#{k}=#{v}" }.join("&")
    params.merge("hmac" => OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha256"), API_SECRET, message))
  end

  def stub_token_exchange(status: 200)
    stub_request(:post, "https://#{DOMAIN}/admin/oauth/access_token")
      .to_return(
        status: status,
        body: { access_token: "online_token", associated_user: { email: "staff@example.com" } }.to_json,
        headers: { "Content-Type" => "application/json" }
      )
  end

  test "happy path mints a handoff token and redirects to the dashboard" do
    Shop.create!(shopify_domain: DOMAIN, shopify_token: "t")
    stub_token_exchange
    state = DashboardLoginStateStore.write(DOMAIN)

    get "/auth/dashboard/callback", params: callback_params(state:)

    assert_response :redirect
    assert_match %r{\A#{Regexp.escape(DASHBOARD_URL)}/auth/shopify\?token=\h{64}\z}, response.location
    token = response.location[/token=(\h{64})/, 1]
    assert_equal DOMAIN, HandoffTokenStore.redeem(token)
  end

  test "unknown state redirects to sign-in with error" do
    get "/auth/dashboard/callback", params: callback_params(state: "bogus")
    assert_redirected_to "#{DASHBOARD_URL}/sign-in?error=shopify"
  end

  test "state issued for a different shop redirects to sign-in with error" do
    state = DashboardLoginStateStore.write("other-shop.myshopify.com")
    get "/auth/dashboard/callback", params: callback_params(state:)
    assert_redirected_to "#{DASHBOARD_URL}/sign-in?error=shopify"
  end

  test "invalid hmac redirects to sign-in with error" do
    Shop.create!(shopify_domain: DOMAIN, shopify_token: "t")
    state = DashboardLoginStateStore.write(DOMAIN)
    params = callback_params(state:).merge("hmac" => "0" * 64)

    get "/auth/dashboard/callback", params: params
    assert_redirected_to "#{DASHBOARD_URL}/sign-in?error=shopify"
  end

  test "shop uninstalled mid-flow redirects to the App Store listing" do
    stub_token_exchange
    state = DashboardLoginStateStore.write(DOMAIN)

    get "/auth/dashboard/callback", params: callback_params(state:)
    assert_redirected_to "https://apps.shopify.com/agency-ai"
  end

  test "failed code exchange redirects to sign-in with error" do
    Shop.create!(shopify_domain: DOMAIN, shopify_token: "t")
    stub_token_exchange(status: 400)
    state = DashboardLoginStateStore.write(DOMAIN)

    get "/auth/dashboard/callback", params: callback_params(state:)
    assert_redirected_to "#{DASHBOARD_URL}/sign-in?error=shopify"
  end
end
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bin/rails test test/controllers/dashboard_login_controller_test.rb`
Expected: FAIL with `NameError: uninitialized constant DashboardLoginController` (routing resolves after Step 1; if WebMock isn't auto-enabled in `test_helper.rb`, add `require "webmock/minitest"` to the top of this test file next to `require "test_helper"`).

- [ ] **Step 4: Write the controller**

```ruby
# app/controllers/dashboard_login_controller.rb
# Shopify OAuth (authorization-code grant) callback for the standalone
# dashboard's "Continue with Shopify" login (SHO22-470).
#
# Flow: verify one-time state + Shopify HMAC, prove the visitor is staff on
# the shop by exchanging the code for a per-user (ONLINE) token — which is
# discarded, never persisted, and never touches Shop#shopify_token — then
# mint a HandoffTokenStore token and enter the exact same
# /auth/shopify?token=… redemption path the embedded app's "Advanced
# Dashboard" button uses.
#
# Every failure redirects to the dashboard sign-in page with ?error=shopify:
# the visitor's browser is mid-redirect on the API host, so rendering JSON or
# an error page here would strand them.
class DashboardLoginController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /auth/dashboard/callback?code=…&shop=…&state=…&hmac=…&timestamp=…
  def callback
    shop = params[:shop].to_s
    expected_shop = DashboardLoginStateStore.redeem(params[:state].to_s)

    return fail_redirect unless expected_shop.present? && expected_shop == shop && valid_hmac?

    unless Shop.exists?(shopify_domain: shop)
      # Installed when the flow started, gone now — treat as not installed.
      return redirect_to(Api::V1::ShopifyLoginController::LISTING_URL, allow_other_host: true)
    end

    return fail_redirect unless exchange_code_succeeds?(shop, params[:code].to_s)

    token = HandoffTokenStore.write(shop)
    redirect_to "#{ENV["AGENCY_DASHBOARD_URL"]}/auth/shopify?token=#{token}", allow_other_host: true
  rescue => e
    puts "DashboardLoginController#callback failed: #{e.class}: #{e.message} | dashboard_login_controller.rb"
    Sentry.capture_exception(e, fingerprint: ["dashboard_login", "callback", e.class.name]) if defined?(Sentry) && Sentry.initialized?
    fail_redirect
  end

  private

  # Shopify signs the callback query: HMAC-SHA256 hex over all params except
  # hmac, sorted lexicographically and joined as k=v with &.
  # https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/authorization-code-grant#verify-a-request
  def valid_hmac?
    received = params[:hmac].to_s
    return false if received.blank?

    message = request.query_parameters
      .reject { |k, _| k == "hmac" }
      .sort
      .map { |k, v| "#{k}=#{v}" }
      .join("&")
    digest = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha256"), ENV["SHOPIFY_API_SECRET"].to_s, message)
    ActiveSupport::SecurityUtils.secure_compare(digest, received)
  end

  # Exchanges the authorization code. A 2xx proves Shopify vouches for this
  # visitor as staff on the shop. The returned online token is discarded.
  def exchange_code_succeeds?(shop, code)
    uri = URI("https://#{shop}/admin/oauth/access_token")
    response = Net::HTTP.post(
      uri,
      {
        client_id: ENV["SHOPIFY_API_KEY"],
        client_secret: ENV["SHOPIFY_API_SECRET"],
        code: code
      }.to_json,
      "Content-Type" => "application/json"
    )
    response.is_a?(Net::HTTPSuccess)
  end

  def fail_redirect
    redirect_to "#{ENV["AGENCY_DASHBOARD_URL"]}/sign-in?error=shopify", allow_other_host: true
  end
end
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bin/rails test test/controllers/dashboard_login_controller_test.rb`
Expected: PASS (6 runs, 0 failures)

- [ ] **Step 6: Run the full Rails test suite for regressions**

Run: `bin/rails test`
Expected: PASS — same failure count as `main` (zero new failures)

- [ ] **Step 7: Commit**

```bash
git add app/controllers/dashboard_login_controller.rb config/routes.rb test/controllers/dashboard_login_controller_test.rb
git commit -m "feat: add Shopify OAuth callback for dashboard Continue-with-Shopify login"
```

---

### Task 5: Register the new redirect URL with Shopify

**Files:**
- Modify: `shopify.app.toml:18`

**Interfaces:**
- Produces: Shopify accepts `https://s.agencyai.app/auth/dashboard/callback` as a valid `redirect_uri`. Without this, the authorize URL from Task 3 errors with "invalid redirect_uri" in production.

- [ ] **Step 1: Add the redirect URL**

```toml
[auth]
redirect_urls = [
  "https://s.agencyai.app/auth/shopify/callback",
  "https://s.agencyai.app/auth/dashboard/callback"
]
```

- [ ] **Step 2: Commit**

```bash
git add shopify.app.toml
git commit -m "config: allow /auth/dashboard/callback as OAuth redirect URL"
```

- [ ] **Step 3: Deploy the config (MANUAL — requires Partner access)**

Run: `shopify app deploy` from the repo root (needs the Partner account that owns "Agency AI", client_id `b1a04a97e5e3b2c9b246652c500656a9`).
Expected: new app version created with the extra redirect URL. **This must happen before production testing; flag to the user if credentials are unavailable.** If a dev-store config exists (`shopify.app.*.toml`), add the dev host's `/auth/dashboard/callback` there the same way for local testing.

---

## Part 2 — Dashboard (`/Users/vladholovchak/work/agency-dashboard`)

### Task 6: shopify-login client library

**Files:**
- Create: `src/lib/shopify-login.ts`
- Test: `src/lib/shopify-login.test.ts`

**Interfaces:**
- Consumes: `apiPost` from `@/lib/api-client` (base path `/api/v1`, so `apiPost("/shopify-login", …)`).
- Produces (used by Tasks 7–8):
  - `shopifyLogin(shopDomain: string): Promise<ShopifyLoginResponse>` where `ShopifyLoginResponse = { installed: true; authorize_url: string } | { installed: false; listing_url: string }`
  - `getRememberedShopDomain(): string | null` / `rememberShopDomain(domain: string): void` (localStorage key `"shopify_shop_domain"`)
  - `hasAutoAttempted(): boolean` / `markAutoAttempted(): void` (sessionStorage key `"shopify_auto_login_attempted"`; `hasAutoAttempted` returns `true` when storage is unavailable so a broken environment never redirect-loops)

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/shopify-login.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api-client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api-client")>(
    "@/lib/api-client",
  );
  return { ...actual, apiPost: vi.fn() };
});

import { apiPost } from "@/lib/api-client";
import {
  getRememberedShopDomain,
  hasAutoAttempted,
  markAutoAttempted,
  rememberShopDomain,
  shopifyLogin,
} from "@/lib/shopify-login";

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

describe("shopifyLogin", () => {
  it("POSTs the domain to /shopify-login and returns the response", async () => {
    const response = { installed: true as const, authorize_url: "https://x.myshopify.com/admin/oauth/authorize?x=1" };
    vi.mocked(apiPost).mockResolvedValueOnce(response);

    const result = await shopifyLogin("x.myshopify.com");

    expect(apiPost).toHaveBeenCalledWith("/shopify-login", { shop_domain: "x.myshopify.com" });
    expect(result).toEqual(response);
  });
});

describe("remembered shop domain", () => {
  it("round-trips through localStorage", () => {
    expect(getRememberedShopDomain()).toBeNull();
    rememberShopDomain("x.myshopify.com");
    expect(getRememberedShopDomain()).toBe("x.myshopify.com");
  });
});

describe("auto-attempt flag", () => {
  it("is false until marked, then true", () => {
    expect(hasAutoAttempted()).toBe(false);
    markAutoAttempted();
    expect(hasAutoAttempted()).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/shopify-login.test.ts`
Expected: FAIL — cannot resolve `@/lib/shopify-login`

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/shopify-login.ts
/*
 * "Continue with Shopify" login for the sign-in page (SHO22-470).
 *
 * shopifyLogin() → POST /api/v1/shopify-login. The backend decides the
 * destination: an OAuth authorize URL for installed shops, the App Store
 * listing for everyone else. The caller's only job is to navigate to it.
 *
 * The remembered shop domain (localStorage) enables the silent auto-attempt
 * on later visits; the auto-attempt flag (sessionStorage) guarantees at most
 * one attempt per browser session so an abandoned Shopify login can never
 * redirect-loop the sign-in page.
 */
import { apiPost } from "@/lib/api-client";

export type ShopifyLoginResponse =
  | { installed: true; authorize_url: string }
  | { installed: false; listing_url: string };

const SHOP_DOMAIN_KEY = "shopify_shop_domain";
const AUTO_ATTEMPT_KEY = "shopify_auto_login_attempted";

export async function shopifyLogin(shopDomain: string): Promise<ShopifyLoginResponse> {
  return apiPost<ShopifyLoginResponse>("/shopify-login", { shop_domain: shopDomain });
}

export function getRememberedShopDomain(): string | null {
  try {
    return window.localStorage.getItem(SHOP_DOMAIN_KEY);
  } catch {
    return null;
  }
}

export function rememberShopDomain(domain: string): void {
  try {
    window.localStorage.setItem(SHOP_DOMAIN_KEY, domain);
  } catch {
    // Storage unavailable (private mode, quota) — auto-attempt just won't arm.
  }
}

export function hasAutoAttempted(): boolean {
  try {
    return window.sessionStorage.getItem(AUTO_ATTEMPT_KEY) === "1";
  } catch {
    return true; // treat unavailable storage as "already attempted" — never loop
  }
}

export function markAutoAttempted(): void {
  try {
    window.sessionStorage.setItem(AUTO_ATTEMPT_KEY, "1");
  } catch {
    // hasAutoAttempted() already returns true in this case
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/shopify-login.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/shopify-login.ts src/lib/shopify-login.test.ts
git commit -m "feat: add shopify-login client lib (SHO22-470)"
```

---

### Task 7: Remember the shop domain after a successful Shopify session

**Files:**
- Modify: `src/app/auth/shopify/page.tsx:23-28`

**Interfaces:**
- Consumes: `rememberShopDomain` (Task 6); `User.shopifyDomain` (existing, `src/lib/mocks/types.ts:27`).
- Produces: every successful Shopify handoff (from the embedded app button OR the new OAuth flow) arms the auto-attempt for future visits.

- [ ] **Step 1: Apply the edit**

In `src/app/auth/shopify/page.tsx`, add the import:

```typescript
import { rememberShopDomain } from "@/lib/shopify-login";
```

and change the success branch of the `apiPost` call (lines 24–28) to:

```typescript
      .then((data) => {
        setToken(data.token);
        useAuthStore.getState().setUser(data.user);
        if (data.user.shopifyDomain) rememberShopDomain(data.user.shopifyDomain);
        router.replace("/home");
      })
```

- [ ] **Step 2: Verify build and existing tests**

Run: `npm test && npm run lint`
Expected: PASS, no lint errors

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/shopify/page.tsx
git commit -m "feat: remember shop domain after Shopify handoff for silent re-login"
```

---

### Task 8: "Continue with Shopify" section + auto-attempt on the sign-in page

**Files:**
- Create: `src/components/auth/shopify-sign-in.tsx`
- Create: `src/components/auth/shopify-sign-in.test.tsx`
- Modify: `src/app/sign-in/page.tsx`

**Interfaces:**
- Consumes: everything from Task 6; `Button`, `Input`, `Label`, `toast` UI primitives (same imports as `sign-in/page.tsx`); `getToken` from `@/lib/api-client`.
- Produces: `<ShopifySignInSection />` — self-contained client component rendered above the email/password form. Handles: domain input (pre-filled from remembered domain), submit → navigate to `authorize_url`/`listing_url`, `?error=shopify` toast, and the once-per-session silent auto-attempt.

- [ ] **Step 1: Write the failing component test**

```tsx
// src/components/auth/shopify-sign-in.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api-client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api-client")>(
    "@/lib/api-client",
  );
  return { ...actual, apiPost: vi.fn(), getToken: vi.fn(() => null) };
});

import { apiPost } from "@/lib/api-client";
import { ShopifySignInSection } from "@/components/auth/shopify-sign-in";

// window.location is not configurable under jsdom; navigation goes through
// this seam instead so tests can observe it.
const navigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.history.replaceState(null, "", "/sign-in");
});

describe("ShopifySignInSection", () => {
  it("submits the entered domain and navigates to the authorize URL", async () => {
    vi.mocked(apiPost).mockResolvedValueOnce({
      installed: true,
      authorize_url: "https://x.myshopify.com/admin/oauth/authorize?a=1",
    });

    render(<ShopifySignInSection navigate={navigate} />);
    await userEvent.type(screen.getByLabelText(/store domain/i), "x.myshopify.com");
    await userEvent.click(screen.getByRole("button", { name: /continue with shopify/i }));

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith("https://x.myshopify.com/admin/oauth/authorize?a=1"),
    );
    expect(apiPost).toHaveBeenCalledWith("/shopify-login", { shop_domain: "x.myshopify.com" });
  });

  it("navigates to the listing URL when the app is not installed", async () => {
    vi.mocked(apiPost).mockResolvedValueOnce({
      installed: false,
      listing_url: "https://apps.shopify.com/agency-ai",
    });

    render(<ShopifySignInSection navigate={navigate} />);
    await userEvent.type(screen.getByLabelText(/store domain/i), "x.myshopify.com");
    await userEvent.click(screen.getByRole("button", { name: /continue with shopify/i }));

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith("https://apps.shopify.com/agency-ai"),
    );
  });

  it("auto-attempts once when a remembered domain exists and no error param", async () => {
    window.localStorage.setItem("shopify_shop_domain", "x.myshopify.com");
    vi.mocked(apiPost).mockResolvedValue({
      installed: true,
      authorize_url: "https://x.myshopify.com/admin/oauth/authorize?a=1",
    });

    const { unmount } = render(<ShopifySignInSection navigate={navigate} />);
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));

    // second mount in the same browser session must NOT re-attempt
    unmount();
    render(<ShopifySignInSection navigate={navigate} />);
    await new Promise((r) => setTimeout(r, 50));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it("does not auto-attempt when ?error=shopify is present", async () => {
    window.localStorage.setItem("shopify_shop_domain", "x.myshopify.com");
    window.history.replaceState(null, "", "/sign-in?error=shopify");

    render(<ShopifySignInSection navigate={navigate} />);
    await new Promise((r) => setTimeout(r, 50));
    expect(navigate).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/auth/shopify-sign-in.test.tsx`
Expected: FAIL — cannot resolve `@/components/auth/shopify-sign-in`

- [ ] **Step 3: Write the component**

```tsx
// src/components/auth/shopify-sign-in.tsx
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { getToken } from "@/lib/api-client";
import {
  getRememberedShopDomain,
  hasAutoAttempted,
  markAutoAttempted,
  shopifyLogin,
} from "@/lib/shopify-login";

/*
 * "Continue with Shopify" for the sign-in page (SHO22-470).
 *
 * Manual path: merchant enters their store domain (pre-filled when
 * remembered), we ask the backend where to send them — Shopify OAuth for
 * installed shops (silent when a Shopify admin session exists), the App
 * Store listing otherwise.
 *
 * Silent path: when a previous Shopify login remembered the domain, attempt
 * the OAuth redirect automatically on mount — at most once per browser
 * session (sessionStorage guard), never when the callback just bounced back
 * with ?error=shopify, and never when a dashboard token already exists (the
 * page is about to redirect to /home anyway).
 */
export function ShopifySignInSection({
  navigate = (url: string) => window.location.assign(url),
}: {
  navigate?: (url: string) => void;
}) {
  const [shopDomain, setShopDomain] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasError = params.get("error") === "shopify";
    if (hasError) {
      toast.error("Shopify sign-in didn't complete. Try again or use email.");
    }

    const remembered = getRememberedShopDomain();
    if (remembered) setShopDomain(remembered);

    if (getToken() || hasError || !remembered || hasAutoAttempted()) return;
    markAutoAttempted();
    shopifyLogin(remembered)
      .then((res) => {
        if (res.installed) navigate(res.authorize_url);
      })
      .catch(() => {
        // Silent attempt only — the merchant sees the normal sign-in page.
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await shopifyLogin(shopDomain.trim());
      navigate(res.installed ? res.authorize_url : res.listing_url);
    } catch {
      toast.error("Enter a valid .myshopify.com store domain.");
      setSubmitting(false);
    }
    // Keep the button in its loading state on success — the page is navigating.
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <Label htmlFor="shopify-domain">Store domain</Label>
        <Input
          id="shopify-domain"
          type="text"
          placeholder="my-store.myshopify.com"
          value={shopDomain}
          onChange={(e) => setShopDomain(e.target.value)}
          required
        />
      </div>
      <Button type="submit" loading={submitting}>
        Continue with Shopify
      </Button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/auth/shopify-sign-in.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Mount it on the sign-in page**

In `src/app/sign-in/page.tsx`, add the import:

```typescript
import { ShopifySignInSection } from "@/components/auth/shopify-sign-in";
```

and insert between the `</header>` (line 80) and the email `<form>` (line 81):

```tsx
        <ShopifySignInSection />
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase text-fg-muted">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>
```

(If the codebase has no `bg-border` utility, use the same border color class as the card's `border-default`.)

- [ ] **Step 6: Run the full dashboard test suite and lint**

Run: `npm test && npm run lint`
Expected: PASS, no new lint errors

- [ ] **Step 7: Visual check**

Run the dev server (`npm run dev`) and load `/sign-in`: Shopify section above the divider, email form below, no layout breakage. With localStorage `shopify_shop_domain` set and no token, the page should immediately attempt the redirect (observe via the network tab: one `POST /api/v1/shopify-login`).

- [ ] **Step 8: Commit**

```bash
git add src/components/auth/shopify-sign-in.tsx src/components/auth/shopify-sign-in.test.tsx src/app/sign-in/page.tsx
git commit -m "feat: Continue with Shopify + silent auto-attempt on sign-in (SHO22-470)"
```

---

## Part 3 — Verification & ship

### Task 9: End-to-end verification on a dev store (MANUAL)

**Files:** none (checklist).

Prereqs: Task 5 Step 3 deployed (or dev-store toml updated); Rails + dashboard running with `HOST`, `AGENCY_DASHBOARD_URL`, `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `REDIS_URL` set; a dev store with the app installed.

- [ ] **Scenario 1 — installed + logged into Shopify:** clear dashboard localStorage → `/sign-in` → enter dev-store domain → Continue with Shopify → expect: instant redirect chain, land on `/home` logged in, no Shopify consent screen.
- [ ] **Scenario 2 — silent auto-attempt:** sign out of the dashboard (keeps localStorage) → open `/sign-in` in a fresh tab → expect: automatic redirect to `/home` with no clicks.
- [ ] **Scenario 3 — not logged into Shopify:** repeat Scenario 1 in an incognito window (localStorage empty, not logged into Shopify) → expect: Shopify login page, then `/home`.
- [ ] **Scenario 4 — app not installed:** enter a `.myshopify.com` domain that doesn't have the app → expect: App Store listing page.
- [ ] **Scenario 5 — error path:** open `/auth/dashboard/callback?state=bogus&shop=x.myshopify.com&code=x&hmac=0` on the Rails host → expect: bounce to `/sign-in?error=shopify` with the toast, and NO auto-attempt loop.
- [ ] **Scenario 6 — regression:** embedded app "Advanced Dashboard" button still logs into the dashboard.

### Task 10: Un-hide the marketing-site Dashboard button (SHIP GATE — only after client sign-off)

**Files:**
- Modify: all 10 HTML files in `/Users/vladholovchak/work/agency-new-website` containing `.nav-dashboard { display: none; …SHO22-470… }` (index.html, about.html, blog.html, pricing.html, cookie-policy.html, privacy-policy.html, terms-of-service.html, and the 3 files in blog/).

- [ ] **Step 1: Remove the hide rule in every file**

```bash
cd /Users/vladholovchak/work/agency-new-website
grep -rln "SHO22-470: hidden until dashboard launch" *.html blog/*.html
sed -i '' '/SHO22-470: hidden until dashboard launch/d' $(grep -rln "SHO22-470: hidden until dashboard launch" *.html blog/*.html)
```

Expected: `grep` afterwards returns nothing; `git diff` shows exactly one deleted line per file (the `display: none; /* SHO22-470… */` line inside `.nav-dashboard`).

- [ ] **Step 2: Verify visually** — open index.html, confirm the Dashboard button renders in the desktop header and mobile menu and links to `https://dashboard.agencyai.app/`.

- [ ] **Step 3: Commit**

```bash
git add *.html blog/*.html
git commit -m "feat: re-enable Dashboard nav button now that Shopify login is live (SHO22-470)"
```

---

## Self-review notes

- Spec coverage: rule 1 (silent auto-login) = Tasks 3+4+6+7+8 auto-attempt; rule 2 (listing redirect) = Task 3 `installed:false` branch + Task 4 mid-flow branch; rule 3 (Shopify login option) = Tasks 3+8; account creation = existing `find_or_create_owner_for_shop` via unchanged redemption path (no new work); loop guards = Task 6 storage semantics + Task 8 tests.
- Type consistency: `ShopifyLoginResponse` field names (`installed`, `authorize_url`, `listing_url`) match the Rails JSON keys in Task 3; `?error=shopify` matches between Task 4 `fail_redirect` and Task 8 checks; localStorage/sessionStorage keys defined once in Task 6 and only referenced elsewhere.
- Known judgment call: Task 4 verifies HMAC with hand-rolled canonicalization (sorted `k=v` join) per Shopify's documented scheme rather than a gem helper — the shopify_api cookie-based validator doesn't fit a server-initiated flow.
