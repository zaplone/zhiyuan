'use client';

import { useTranslations } from 'next-intl';

export function Marquee() {
  const t = useTranslations('Marquee');

  const items = [
    t('item1'),
    t('item2'),
    t('item3'),
    t('item4'),
    t('item5'),
    t('item6'),
    t('item7'),
    t('item8'),
    t('item9'),
    t('item10'),
  ];

  // 复制一遍以实现无缝滚动
  const duplicatedItems = [...items, ...items];

  return (
    <div className="bg-[#d4460a] overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex">
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="font-['Share_Tech_Mono'] text-xs tracking-[3px] uppercase text-white/90 px-9 inline-flex items-center gap-3"
          >
            {item}
            <span className="text-white/40 text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}