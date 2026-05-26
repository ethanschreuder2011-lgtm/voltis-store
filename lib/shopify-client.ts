// ─── Shopify helpers (server-side only) ───────────────────────────────────────
// Used by app/api/shopify/** routes only.
// Client components must NOT import this — they call the API routes instead.

export const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "voltisemotos.myshopify.com";

export const SHOPIFY_STOREFRONT_API_VERSION = "2025-01";

/** Returns the Storefront API access token if configured, or empty string. */
export function getStorefrontToken(): string {
  return (
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
    ""
  );
}

/** Returns true when a Storefront access token is configured. */
export function hasStorefrontToken(): boolean {
  return Boolean(getStorefrontToken());
}

/**
 * Build a Shopify product page URL.
 * Works without any API credentials.
 */
export function productPageUrl(handle: string): string {
  return `https://${SHOPIFY_DOMAIN}/products/${handle}`;
}

/**
 * Core fetch wrapper for the Shopify Storefront API.
 * Requires SHOPIFY_STOREFRONT_ACCESS_TOKEN to be set.
 */
export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const token = getStorefrontToken();
  if (!token) {
    throw new Error(
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set. " +
      "See .env.local for instructions on generating the token."
    );
  }

  const url = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status} ${res.statusText}`);
  }

  if (json.errors?.length) {
    const code = json.errors[0]?.extensions?.code;
    const msg  = json.errors[0]?.message;
    if (code === "UNAUTHORIZED" || !msg) {
      throw new Error(
        "Shopify Storefront API: UNAUTHORIZED. " +
        "The token in SHOPIFY_STOREFRONT_ACCESS_TOKEN is incorrect. " +
        "Go to Shopify Admin → your app → API credentials → " +
        "copy the Storefront API access token (not the Admin API key)."
      );
    }
    throw new Error(`Shopify GraphQL: ${msg}`);
  }

  return json.data as T;
}
