export interface Tool {
  id: string;
  slug: string;
  icon: string;
  priority: 'P0' | 'P1' | 'P2';
  category: string;
}

export const tools: Tool[] = [
  { id: 'compress-image', slug: 'compress-image', icon: '⚡', priority: 'P0', category: 'optimize' },
  { id: 'compress-image-to-100kb', slug: 'compress-image-to-100kb', icon: '📦', priority: 'P0', category: 'optimize' },
  { id: 'rotate-image', slug: 'rotate-image', icon: '🔄', priority: 'P0', category: 'transform' },
  { id: 'crop-image', slug: 'crop-image', icon: '✂', priority: 'P0', category: 'transform' },
  { id: 'resize-image', slug: 'resize-image', icon: '📐', priority: 'P0', category: 'transform' },
  { id: 'flip-image', slug: 'flip-image', icon: '↔', priority: 'P1', category: 'transform' },
  { id: 'invert-image', slug: 'invert-image', icon: '🔮', priority: 'P1', category: 'effects' },
  { id: 'black-and-white', slug: 'black-and-white', icon: '🎭', priority: 'P1', category: 'effects' },
  { id: 'blur-image', slug: 'blur-image', icon: '💨', priority: 'P1', category: 'effects' },
  { id: 'add-border-to-image', slug: 'add-border-to-image', icon: '🔲', priority: 'P1', category: 'decorate' },
  { id: 'watermark-image', slug: 'watermark-image', icon: '💧', priority: 'P2', category: 'decorate' },
  { id: 'convert-to-jpg', slug: 'convert-to-jpg', icon: '🔀', priority: 'P2', category: 'convert' },
  { id: 'meme-generator', slug: 'meme-generator', icon: '😂', priority: 'P2', category: 'create' },
];

export const getRelatedTools = (currentSlug: string, count = 3): Tool[] => {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return tools.slice(0, count);

  const sameCat = tools.filter((t) => t.slug !== currentSlug && t.category === current.category);
  const others = tools.filter((t) => t.slug !== currentSlug && t.category !== current.category);

  return [...sameCat, ...others].slice(0, count);
};
