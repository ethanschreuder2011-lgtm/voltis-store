"use client";

// ─── ShopifyCheckoutButton ─────────────────────────────────────────────────
// Redirects Buy Now / Pre-Order Now to the Shopify product page.
//
// HOW IT WORKS (no Storefront API token required):
//   1. User clicks the button
//   2. We construct https://voltisemotos.myshopify.com/products/{handle}
//   3. Browser navigates there — Shopify handles Add to Cart + Checkout natively
//
// UPGRADING LATER (when Storefront token is available):
//   Replace window.location.href with a call to POST /api/shopify/checkout
//   which will create a cart and return a direct checkout URL (skipping the
//   product page). The button markup, className, and style stay identical.
//
// States:
//   idle    — renders children as-is, no visual change
//   loading — spinner + "Redirecting…" (brief, while navigation starts)
//   error   — inline warning for 3 s when handle is missing

import { useState } from "react";

const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "voltisemotos.myshopify.com";

type State = "idle" | "loading" | "error";

interface Props {
  /** Shopify product handle — used to build the product page URL as fallback */
  shopifyHandle?: string;
  /** Direct cart URL — overrides the product page when set.
   *  Format: https://{store}.myshopify.com/cart/{variantId}:1
   *  Adds the variant to cart and opens checkout immediately. */
  shopifyCartUrl?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ShopifyCheckoutButton({
  shopifyHandle,
  shopifyCartUrl,
  children,
  className,
  style,
}: Props) {
  const [state, setState] = useState<State>("idle");

  const handleClick = () => {
    if (state !== "idle") return;

    setState("loading");

    // ── Path 1: direct cart URL (e.g. Sur-Ron Light Bee) ──────────────────
    // When shopifyCartUrl is set, redirect there immediately.
    // This adds the variant to the Shopify cart and opens checkout directly.
    if (shopifyCartUrl) {
      window.location.href = shopifyCartUrl;
      return;
    }

    // ── Path 2: product page URL ───────────────────────────────────────────
    // When only shopifyHandle is set, send the buyer to the Shopify product page.
    if (shopifyHandle) {
      window.location.href = `https://${SHOPIFY_DOMAIN}/products/${shopifyHandle}`;
      return;
    }

    // ── Path 3: not configured ─────────────────────────────────────────────
    console.error(
      "[Shopify] Buy Now clicked but neither shopifyCartUrl nor shopifyHandle is set.\n" +
      "Open lib/bikeData.tsx and add shopifyCartUrl or shopifyHandle to this bike."
    );
    setState("error");
    setTimeout(() => setState("idle"), 3000);
  };

  // ── Error state ────────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <button type="button" disabled className={className} style={style}>
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <span>Not configured — check console</span>
        </span>
      </button>
    );
  }

  // ── Loading state ──────────────────────────────────────────────────────
  if (state === "loading") {
    return (
      <button type="button" disabled className={className} style={style}>
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Redirecting…</span>
        </span>
      </button>
    );
  }

  // ── Idle — visually identical to whatever was passed in ───────────────
  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
