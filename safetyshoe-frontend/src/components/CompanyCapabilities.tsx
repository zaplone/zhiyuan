'use client';

import { 
  Factory, ShieldCheck, TrendingUp, CheckCircle2,
  BadgeCheck, Users
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const STATS = [
  { label: 'Daily Capacity', value: '6,000-8,000', unit: 'Pairs', icon: TrendingUp },
  { label: 'Production Lines', value: '6', unit: 'Lines', icon: Factory },
  { label: 'Workers', value: '300+', unit: 'People', icon: Users },
  { label: 'Annual Output', value: '3M+', unit: 'Pairs/Year', icon: ShieldCheck },
];

const ADVANTAGES = [
  {
    title: 'Certified Quality',
    description: 'Footwear built to ISO 20345 and, where your market requires, ASTM F2413 or CSA Z195—with lab evidence per order. Factory holds ISO 9001 / 14001 / 45001.',
    icon: BadgeCheck,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Factory Direct',
    description: 'Direct manufacturing pricing with transparent production process.',
    icon: Factory,
    color: 'bg-accent-50 text-accent-600',
  },
  {
    title: 'Flexible OEM/ODM',
    description: 'Rapid 7-day prototyping and full brand customization service.',
    icon: Users,
    color: 'bg-green-50 text-green-600',
  }
];

export function CompanyCapabilities() {
  const t = useTranslations('WhyChooseUs');

  return (
    <section id="capabilities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Manufacturing Excellence
          </h2>
          <p className="text-slate-600 text-lg">
            Combining craftsmanship with automation to deliver consistent quality globally.
          </p>
        </div>

        {/* Key Stats Bar - Cleaner Horizontal Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-primary-600 mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Advantages Grid - Simplified */}
        <div className="grid md:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-100 hover:shadow-lg transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${adv.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
