# SHO22-470 — Deploy handoff & E2E test checklist

## For the dev running the Shopify config deploy

Branch `vladholovchak/sho22-470-shopify-oauth-login` in **agency-shopify** changes
`shopify.app.toml` to add a second OAuth redirect URL:

```
https://s.agencyai.app/auth/dashboard/callback
```

After that branch merges (or from the branch, if you want it live for testing first):

1. From the agency-shopify repo root, with Partner access to the "Agency AI" app
   (client_id b1a04a97e5e3b2c9b246652c500656a9): `shopify app deploy`
2. Verify in the Partner Dashboard → Agency AI → Configuration that
   `/auth/dashboard/callback` appears under Allowed redirection URLs.

Nothing else changes app-side: same scopes, same webhooks. Without this deploy, the
new "Continue with Shopify" flow fails at Shopify with an invalid_redirect_uri error;
everything else (dashboard, embedded app) is unaffected.

## E2E checklist (dev store, after deploy)

Prereqs: Rails + dashboard deployed from the feature branches; env vars already in
place (HOST, AGENCY_DASHBOARD_URL, SHOPIFY_API_KEY/SECRET, REDIS_URL — all existing).
A dev store with the Agency AI app installed.

1. **Installed + logged into Shopify:** clear dashboard localStorage → /sign-in →
   enter dev-store domain → Continue with Shopify → expect instant redirect chain to
   /home, logged in, no Shopify consent screen.
2. **Silent auto-attempt:** sign out of the dashboard (keep localStorage) → open
   /sign-in in a fresh tab → expect automatic redirect to /home, zero clicks.
3. **Not logged into Shopify:** repeat 1 in incognito → expect Shopify's login page,
   then /home.
4. **App not installed:** enter a .myshopify.com domain without the app → expect the
   Agency AI App Store listing page.
5. **Error path:** open
   `https://s.agencyai.app/auth/dashboard/callback?state=bogus&shop=x.myshopify.com&code=x&hmac=0`
   → expect bounce to /sign-in?error=shopify with the toast, and no auto-attempt loop.
6. **Regression:** the embedded app's "Advanced Dashboard" button still logs into
   the dashboard.
