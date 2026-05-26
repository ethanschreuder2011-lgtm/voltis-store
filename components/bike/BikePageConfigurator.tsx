"use client";

import { useState } from "react";
import { BikeHeroUnified } from "./BikeHeroUnified";
import { BikeGallery } from "./BikeGallery";
import type { BikePageData } from "@/lib/bikeData";

export function BikePageConfigurator({ bike }: { bike: BikePageData }) {
  const defaultId = bike.defaultVariant ?? bike.variants?.[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(defaultId);

  const v = bike.variants?.find((x) => x.id === activeId);

  const effective: BikePageData = v
    ? {
        ...bike,
        heroImage: v.heroImage,
        galleryImages: v.galleryImages,
        ...(v.galleryLabels ? { galleryLabels: v.galleryLabels } : {}),
        ...(v.accentHex ? { accentHex: v.accentHex } : {}),
        ...(v.glowColor ? { glowColor: v.glowColor } : {}),
        ...(v.titleGradient ? { titleGradient: v.titleGradient } : {}),
        ...(v.price !== undefined ? { price: v.price } : {}),
      }
    : bike;

  return (
    <>
      <BikeHeroUnified
        bike={effective}
        variants={bike.variants}
        activeVariantId={activeId}
        onVariantChange={setActiveId}
      />
      <BikeGallery bike={effective} hideMobile />
    </>
  );
}
