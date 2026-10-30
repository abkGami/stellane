import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FOCUS_RING } from '@/lib/constants';

export type AccordionItem = { question: string; answer: string };

export default function Accordion({
  items,
  idPrefix = 'faq',
}: {
  items: AccordionItem[];
  idPrefix?: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className="rounded-[20px] px-6 bg-[rgba(12,15,40,0.42)] backdrop-blur-[20px] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <h3>
              <button
                type="button"
                id={`${idPrefix}-button-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full items-center justify-between gap-4 py-5 text-left text-white text-[18px] sm:text-[20px] font-[450] rounded-[8px] ${FOCUS_RING}`}
              >
                {item.question}
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-[#B7C6FF]" aria-hidden="true" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-[#B7C6FF]" aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-button-${i}`}
              className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-white/70 text-[15px] leading-[1.4]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
