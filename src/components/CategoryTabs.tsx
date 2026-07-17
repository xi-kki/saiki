'use client';

import { CONTENT_CATEGORIES, type ContentCategory } from '@/lib/utils';

export default function CategoryTabs({
  selected,
  onSelect,
}: {
  selected: ContentCategory | 'all';
  onSelect: (cat: ContentCategory | 'all') => void;
}) {
  const categories = Object.entries(CONTENT_CATEGORIES);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSelect('all')}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            selected === 'all'
              ? 'bg-saiki-accent text-saiki-bg'
              : 'border border-saiki-border/50 bg-saiki-card/50 text-saiki-muted hover:border-saiki-accent/50 hover:text-saiki-text'
          }`}
        >
          ✨ All
        </button>
        {categories.map(([key, cat]) => (
          <button
            key={key}
            onClick={() => onSelect(key as ContentCategory)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              selected === key
                ? 'text-saiki-bg'
                : 'border border-saiki-border/50 bg-saiki-card/50 text-saiki-muted hover:text-saiki-text'
            }`}
            style={
              selected === key
                ? { backgroundColor: cat.color }
                : { borderColor: `${cat.color}30` }
            }
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
