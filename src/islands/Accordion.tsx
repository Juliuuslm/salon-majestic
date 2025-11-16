import { useState } from 'react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  const [expandedHeight, setExpandedHeight] = useState<Record<string, number>>({});

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-lg border border-eventflow-border transition-all duration-300 hover:border-eventflow-primary hover:shadow-md animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="flex w-full items-center justify-between bg-white px-6 py-4 text-left font-medium text-eventflow-black transition-all duration-300 hover:bg-eventflow-extra active:bg-eventflow-extra"
            aria-expanded={openItems.includes(item.id)}
            aria-controls={`accordion-${item.id}`}
          >
            <span className="flex-1 transition-colors duration-300">
              {item.question}
            </span>
            <svg
              className={`h-5 w-5 flex-shrink-0 text-eventflow-primary transition-all duration-500 ${
                openItems.includes(item.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {/* Animated Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openItems.includes(item.id) ? 'max-h-96' : 'max-h-0'
            }`}
            id={`accordion-${item.id}`}
          >
            <div className="border-t border-eventflow-border bg-gradient-to-b from-eventflow-extra/50 to-eventflow-extra/30 px-6 py-4 text-eventflow-gray transition-opacity duration-500">
              <p className="leading-relaxed animate-in fade-in duration-300">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
