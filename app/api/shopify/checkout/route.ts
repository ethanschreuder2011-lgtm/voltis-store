// ─── POST /api/shopify/checkout ───────────────────────────────────────────────
// Returns a Shopify product/checkout URL for a given product handle.
//
// Current mode (no Storefront token required):
//   Returns the native Shopify product page URL:
//   https://voltisemotos.myshopify.com/products/{handle}
//   The buyer lands on the Shopify product page and completes checkout there.
//
// Upgrade path (when SHOPIFY_STOREFRONT_ACCESS_TOKEN is available):
//   Uncomment the "WITH STOREFRONT TOKEN" block to create a cart directly
//   and return a one-click checkout URL that skips the product page.
//
// Body:  { handle: string }
// Reply: { checkoutUrl: string } | { error: string }

import { NextRequest, NextResponse } from "next/server";

const DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "voltisemotos.myshopify.com";

export async function POST(req: NextRequest) {
  let handle: string | undefined;

  try {
    const body = await req.json();
    handle = typeof body?.handle === "string" ? body.handle.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!handle) {
    return NextResponse.json(
      { error: "Missing required field: handle" },
      { status: 400 }
    );
  }

  // ── Current: direct product page URL (no credentials required) ──────────
  const checkoutUrl = `https://${DOMAIN}/products/${handle}`;

  console.log(`[Shopify] Checkout URL built: ${checkoutUrl}`);

  return NextResponse.json({ checkoutUrl });

  // ── Upgrade path: cart creation via Storefront API ───────────────────────
  // Uncomment this block once SHOPIFY_STOREFRONT_ACCESS_TOKEN is set in .env.local.
  // This creates a cart and returns a direct checkout URL (skips the product page).
  //
  // const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
  // if (!TOKEN) {
  //   // Fall back to product page URL when token not yet configured
  //   return NextResponse.json({ checkoutUrl: `https://${DOMAIN}/products/${handle}` });
  // }
  //
  // const STOREFRONT_URL = `https://${DOMAIN}/api/2025-01/graphql.json`;
  //
  // const GET_PRODUCT = `
  //   query GetProduct($handle: String!) {
  //     product(handle: $handle) {
  //       variants(first: 1) {
  //         edges { node { id availableForSale } }
  //       }
  //     }
  //   }
  // `;
  //
  // const CREATE_CART = `
  //   mutation CartCreate($variantId: ID!) {
  //     cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }) {
  //       cart { checkoutUrl }
  //       userErrors { message }
  //     }
  //   }
  // `;
  //
  // async function gql<T>(query: string, variables?: object): Promise<T> {
  //   const res = await fetch(STOREFRONT_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Shopify-Storefront-Access-Token": TOKEN,
  //     },
  //     body: JSON.stringify({ query, variables }),
  //     cache: "no-store",
  //   });
  //   const json = await res.json();
  //   if (!res.ok || json.errors?.length) throw new Error(json.errors?.[0]?.message ?? res.statusText);
  //   return json.data as T;
  // }
  //
  // try {
  //   const { product } = await gql<any>(GET_PRODUCT, { handle });
  //   const variantId = product?.variants?.edges?.[0]?.node?.id;
  //   if (!variantId) throw new Error(`No variant found for handle: "${handle}"`);
  //
  //   const { cartCreate } = await gql<any>(CREATE_CART, { variantId });
  //   if (cartCreate.userErrors?.length) throw new Error(cartCreate.userErrors[0].message);
  //
  //   return NextResponse.json({ checkoutUrl: cartCreate.cart.checkoutUrl });
  // } catch (err) {
  //   const msg = err instanceof Error ? err.message : String(err);
  //   console.error(`[Shopify] Cart creation failed: ${msg}`);
  //   // Fall back to product page
  //   return NextResponse.json({ checkoutUrl: `https://${DOMAIN}/products/${handle}` });
  // }
}
