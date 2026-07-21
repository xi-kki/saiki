'use client';

import { CONTENT_CATEGORIES, type ContentCategory } from '@/lib/utils';

export default function CategoryTabs({
  selected,
  onSelect,
}: {
  selected: ContentCategory | 'all';
  onSelect: (cat: ContentCategory | 'all') => void;
}) {
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
        {CONTENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              selected === cat || (typeof selected === 'object' && selected?.id === cat.id)
                ? 'text-saiki-bg'
                : 'border border-saiki-border/50 bg-saiki-card/50 text-saiki-muted hover:text-saiki-text'
            }`}
            style={
              selected === cat || (typeof selected === 'object' && selected?.id === cat.id)
                ? { backgroundColor: cat.color }
                : { borderColor: `${cat.color}30` }
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
