'use client';

import { SCHOOLS } from '@/lib/utils';

export default function SchoolFilter({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (school: string | null) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            selected === null
              ? 'bg-saiki-accent text-saiki-bg'
              : 'border border-saiki-border/50 bg-saiki-card/50 text-saiki-muted hover:border-saiki-accent/50 hover:text-saiki-text'
          }`}
        >
          All Schools
        </button>
        {SCHOOLS.map((school) => (
          <button
            key={school.id}
            onClick={() => onSelect(school.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              selected === school.id
                ? 'text-saiki-bg'
                : 'border border-saiki-border/50 bg-saiki-card/50 text-saiki-muted hover:text-saiki-text'
            }`}
            style={
              selected === school.id
                ? { backgroundColor: school.color }
                : { borderColor: `${school.color}30` }
            }
          >
            {school.icon} {school.name}
          </button>
        ))}
      </div>
    </div>
  );
}
