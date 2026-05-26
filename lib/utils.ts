export function scrollTo(href: string, close?: () => void) {
  close?.();
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/") {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/" + href;
  }
}
