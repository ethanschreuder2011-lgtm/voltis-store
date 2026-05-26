# Shopify Headless Integration — Setup Guide

This site uses the **Shopify Storefront API** for checkout only.  
All frontend design, layout, animations, and components are unchanged.

---

## How it works

- Every product page retains its full cinematic design and local images.
- Clicking **Buy Now** or **Pre-Order Now** calls the Storefront API to create a Shopify cart, then redirects to the hosted Shopify checkout URL.
- **Reserve & Pay on Pickup** is an internal flow — it opens the reservation modal and never touches Shopify.
- If Shopify credentials are missing or the API call fails, the buttons fall back silently to `/#contact`. The site always works.

---

## Step 1 — Create a Storefront API token in Shopify

1. Log in to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** (enable custom app development if prompted)
3. Click **"Create an app"** → give it a name (e.g. *Voltis Storefront*)
4. Go to **Configuration** → **Storefront API access scopes**
5. Enable: `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`
6. Click **Save** → go to **API credentials**
7. Copy the **Storefront API access token**

---

## Step 2 — Add credentials to `.env.local`

Open `/lbx-store/.env.local` and fill in both values:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
```

> **Format note:** The domain is `your-store.myshopify.com` — no `https://`, no trailing slash.

---

## Step 3 — Match product handles in `lib/bikeData.tsx`

Each bike has a `shopifyHandle` field that must match the product's URL handle in Shopify.

| Bike | Current handle | Find it in Shopify |
|---|---|---|
| Sur-Ron Light Bee | `sur-ron-light-bee` | Admin → Products → click product → see URL |
| Sur-Ron Ultra Bee | `sur-ron-ultra-bee` | |
| Falcon Pro | `falcon-pro` | |
| Arctic Leopard | `arctic-leopard` | |
| Strike Shadow | `strike-shadow` | |

To update a handle, open `lib/bikeData.tsx` and find the line:
```ts
shopifyHandle: "current-value", // ← update to match your Shopify product handle
```

---

## Step 4 — Run locally

```bash
cd lbx-store
npm install
npm run dev
```

Site runs at **http://localhost:3000** — identical to before.

To test checkout end-to-end, fill in `.env.local` with real credentials, then click any **Buy Now** button. You should be redirected to Shopify's hosted checkout page.

---

## Step 5 — Deploy (Vercel)

1. Push your code to GitHub
2. In the **Vercel dashboard** → your project → **Settings** → **Environment Variables**
3. Add both variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
4. Redeploy

> These are `NEXT_PUBLIC_` variables — Vercel treats them as client-safe, which is correct for the Storefront API token.

---

## Files added / changed

| File | What changed |
|---|---|
| `lib/shopify.ts` | GraphQL types and query strings (new) |
| `lib/shopify-client.ts` | Storefront API fetch client (new) |
| `components/bike/ShopifyCheckoutButton.tsx` | Drop-in checkout button component (new) |
| `lib/bikeData.tsx` | Added `shopifyHandle` to type + each bike |
| `components/bike/BikeHeroUnified.tsx` | Buy Now / Pre-Order Now → ShopifyCheckoutButton |
| `components/bike/BikeBottomCTA.tsx` | Buy Now / Pre-Order Now → ShopifyCheckoutButton |
| `components/bike/BikePreOrderBanner.tsx` | Pre-Order Now → ShopifyCheckoutButton |
| `next.config.ts` | Added Shopify CDN to allowed image hosts |
| `.env.local` | Credentials template (fill in values) |

**Nothing else changed.** All styling, animations, images, layouts, and components are identical.

---

## Troubleshooting

**"Buy Now does nothing / goes to /#contact"**  
→ Check that `.env.local` has both values filled in and the dev server was restarted after editing it.

**"Product not found" in console**  
→ The `shopifyHandle` in `bikeData.tsx` doesn't match the product handle in your Shopify store. Go to Shopify Admin → Products → click the product → the handle is the last segment of the URL.

**"Cart error" in console**  
→ Confirm the Storefront API scopes include `unauthenticated_write_checkouts` (or `unauthenticated_read_checkouts`).

**Shopify images not loading via `next/image`**  
→ The `cdn.shopify.com` remote pattern is already added to `next.config.ts`. If you use a custom CDN domain, add it there too.
