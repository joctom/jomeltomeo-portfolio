function extractIndex(path: string) {
  const match = path.match(/\((\d+)\)[^/]*$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function numberedGallery(modules: Record<string, string>) {
  return Object.entries(modules)
    .sort(([a], [b]) => extractIndex(a) - extractIndex(b))
    .map(([, src]) => src);
}

export const typographyGallery = numberedGallery(
  import.meta.glob("../assets/ai-images/one/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const whimsicalGrannyGallery = numberedGallery(
  import.meta.glob("../assets/ai-images/two/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const plagueGothicGallery = numberedGallery(
  import.meta.glob("../assets/ai-images/three/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);
