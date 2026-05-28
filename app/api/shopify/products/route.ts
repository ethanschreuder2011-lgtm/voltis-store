// ─── GET /api/shopify/products ────────────────────────────────────────────────
// Diagnostic route. Open in browser to verify the store is accessible and
// to confirm which product handles to use in lib/bikeData.tsx.
//
// Without a Storefront token: verifies the store domain is reachable and
// shows the handles currently configured in bikeData.tsx.
//
// With a Storefront token (SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local):
// also fetches live product data so you can match handles exactly.
//
// Usage: http://localhost:3000/api/shopify/products

import { NextResponse } from "next/server";

const DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "voltisemotos.myshopify.com";
const TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  "";

// Handles currently set in lib/bikeData.tsx
const CONFIGURED_HANDLES = [
  { bike: "26 Sur-Ron Light Bee",  handle: "sur-ron-light-bee",  url: `https://${DOMAIN}/products/sur-ron-light-bee` },
  { bike: "26 Sur-Ron Ultra Bee",  handle: "sur-ron-ultra-bee",  url: `https://${DOMAIN}/products/sur-ron-ultra-bee` },
  { bike: "Falcon Pro",         handle: "falcon-pro",         url: `https://${DOMAIN}/products/falcon-pro` },
  { bike: "Arctic Leopard",     handle: "arctic-leopard",     url: `https://${DOMAIN}/products/arctic-leopard` },
  { bike: "Strike Shadow",      handle: "strike-shadow",      url: `https://${DOMAIN}/products/strike-shadow` },
];

export async function GET() {
  const base = {
    store: DOMAIN,
    storefrontTokenConfigured: Boolean(TOKEN),
    configuredHandles: CONFIGURED_HANDLES,
    instructions: {
      step1: "In Shopify Admin → Products, create one product per bike.",
      step2: "Set each product to Active (not Draft) so it has a public URL.",
      step3: "The product handle is shown in the URL when you click a product: /admin/products/{id} — look for the 'Handle' field.",
      step4: "Update shopifyHandle in lib/bikeData.tsx to match each product's handle exactly.",
      step5: "Test each URL in the configuredHandles list above — it should open the Shopify product page.",
      storefrontToken: "Optional: add SHOPIFY_STOREFRONT_ACCESS_TOKEN to .env.local for direct cart/checkout creation (skips the product page step).",
    },
  };

  // Without a Storefront token, just return the config info
  if (!TOKEN) {
    return NextResponse.json({
      ...base,
      liveProducts: null,
      note: "Set SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local to also fetch live Shopify product data here.",
    });
  }

  // With a Storefront token, also fetch live product data
  try {
    const res = await fetch(
      `https://${DOMAIN}/api/2025-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": TOKEN,
        },
        body: JSON.stringify({
          query: `{
            products(first: 50) {
              edges {
                node {
                  title
                  handle
                  availableForSale
                  variants(first: 1) {
                    edges { node { id price { amount currencyCode } } }
                  }
                }
              }
            }
          }`,
        }),
        cache: "no-store",
      }
    );

    const json = await res.json();

    if (!res.ok || json.errors?.length) {
      return NextResponse.json({
        ...base,
        liveProducts: null,
        tokenError:
          "Storefront token returned an error. Verify the token in .env.local is the Storefront API access token (not the Admin API key).",
      });
    }

    const liveProducts = json.data.products.edges.map(
      (e: { node: { title: string; handle: string; availableForSale: boolean; variants: { edges: { node: { id: string; price: { amount: string; currencyCode: string } } }[] } } }) => ({
        title: e.node.title,
        handle: e.node.handle,
        availableForSale: e.node.availableForSale,
        variantId: e.node.variants.edges[0]?.node.id ?? null,
        price: e.node.variants.edges[0]?.node.price ?? null,
        shopifyUrl: `https://${DOMAIN}/products/${e.node.handle}`,
      })
    );

    return NextResponse.json({ ...base, liveProducts });
  } catch (err) {
    return NextResponse.json({
      ...base,
      liveProducts: null,
      fetchError: err instanceof Error ? err.message : String(err),
    });
  }
}
