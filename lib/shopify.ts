// ─── Shopify Storefront API — GraphQL types & query strings ──────────────────
// Headless integration only. No Shopify themes, Hydrogen, or Shopify UI.
// All frontend design, layout, and components remain unchanged.

export const SHOPIFY_STOREFRONT_API_VERSION = "2025-01";

// ─── Response types ───────────────────────────────────────────────────────────

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  tags: string[];
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: ShopifyCartLine }[] };
};

export type ShopifyUserError = {
  field: string[] | null;
  message: string;
};

// ─── GraphQL queries ──────────────────────────────────────────────────────────

export const QUERY_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        edges {
          node { url altText width height }
        }
      }
      variants(first: 30) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { url altText width height }
          }
        }
      }
      tags
    }
  }
`;

export const QUERY_ALL_PRODUCTS = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges {
              node { url altText width height }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price { amount currencyCode }
              }
            }
          }
          tags
        }
      }
    }
  }
`;

export const MUTATION_CART_CREATE = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 5) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
