'use client';

import { useState, useEffect, type FormEvent } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Check,
  Layers,
  Activity,
  Shield,
  Zap,
  Droplets,
  Info,
  Factory,
  FileCheck,
  Globe,
  Clock,
  HelpCircle,
  Play,
  X,
  ChevronRight,
  Send,
  Loader2,
  Download,
  MapPin,
  Package,
  ChevronDown,
} from 'lucide-react';
import { Product } from '@/types';
import { submitInquiry } from '@/lib/siteApi';
import { isValidImageUrl, getSafeImageUrl } from '@/lib/imageUtils';
import { ImageMagnifier } from './ImageMagnifier';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
  locale: string;
}

const TRUST_STATS = {
  pairsShipped: '2M+',
  countries: '50+',
  responseHours: '24',
};

const KEY_FEATURE_IDS = ['safety', 'comfort', 'durability', 'compliance', 'grip', 'breathability'] as const;
const FAQ_IDS = ['moq', 'samples', 'leadTime', 'certDocs', 'payment', 'audit'] as const;

const PLACEHOLDER = {
  description:
    'Professional safety shoe built for demanding workplaces. Features a steel toe cap meeting EN ISO 20345 impact and compression requirements, breathable lining for all-day comfort, and a dual-density PU outsole for slip and oil resistance (SRC). Ideal for construction, logistics, and general industry. Suitable for OEM and private label. Compliant with CE marking for EU market access.',
  materials: {
    upper: 'Buffalo leather / Synthetic',
    toe_cap: 'Steel' as const,
    midsole: 'Steel Plate' as const,
    outsole: 'Dual density PU',
    lining: 'Textile / Mesh',
  },
  industries: ['Construction', 'Logistics', 'Oil & Gas'] as string[],
  features: ['Steel toe', 'Slip resistant', 'Oil resistant', 'Puncture resistant'],
};

function useProductWithPlaceholders(product: Product) {
  const description = product.description?.trim() || PLACEHOLDER.description;
  const materials = {
    upper: product.materials?.upper || PLACEHOLDER.materials.upper,
    toe_cap: product.materials?.toe_cap || PLACEHOLDER.materials.toe_cap,
    midsole: product.materials?.midsole || PLACEHOLDER.materials.midsole,
    outsole: product.materials?.outsole || PLACEHOLDER.materials.outsole,
    lining: product.materials?.lining || PLACEHOLDER.materials.lining,
  };
  const industries = (product.industries?.length ? product.industries : PLACEHOLDER.industries) as string[];
  const features = (product.features?.length ? product.features : PLACEHOLDER.features) as string[];
  return { ...product, description, materials, industries, features };
}

export function ProductDetailClient({ product, locale }: ProductDetailClientProps) {
  const t = useTranslations('ProductQuickView');
  const tDetail = useTranslations('ProductDetail');
  const tNav = useTranslations('Navigation');

  const p = useProductWithPlaceholders(product);

  const [activeImage, setActiveImage] = useState<string>(
    product.images && product.images.length > 0
      ? getSafeImageUrl(product.images[0])
      : getSafeImageUrl(product.image || '')
  );
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const hasVideo = !!product.video_url;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show sticky CTA bar after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetMarket: '',
    quantity: '',
    message: `I am interested in ${p.name}. Please send me a quote.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const galleryImages: string[] =
    product.images && product.images.length > 0
      ? (product.images.filter(isValidImageUrl) as string[])
      : isValidImageUrl(product.image)
        ? [product.image!]
        : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: `[Target Market: ${formData.targetMarket}] [Qty: ${formData.quantity}]\n${formData.message}`,
        product_name: p.name,
      });
      setSubmitStatus(success ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb：跟随页面滚动 ── */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-sm text-slate-500 gap-y-1">
            <Link href={`/${locale}`} className="hover:text-slate-800 transition-colors">{tNav('home')}</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-300 shrink-0" aria-hidden />
            <Link href={`/${locale}/products`} className="hover:text-slate-800 transition-colors">{tDetail('breadcrumb.products')}</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-300 shrink-0" aria-hidden />
            <span className="text-slate-800 font-medium truncate max-w-[min(100%,280px)] sm:max-w-xl">{p.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main two-column layout ── */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 xl:gap-16">

          {/* ════════════════════════════════════════
              LEFT COLUMN
          ════════════════════════════════════════ */}
          <div className="w-full lg:w-[52%] pb-10 pt-3 md:pt-4">

            {/* Main image */}
            <div className="relative aspect-square w-full md:aspect-[4/3] lg:aspect-square rounded-2xl border border-slate-100 bg-white overflow-hidden">
              {isValidImageUrl(activeImage) ? (
                <ImageMagnifier src={activeImage} alt={product.name} fit="contain" className="bg-white" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400 text-sm">
                  {tDetail('gallery.noImage')}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.is_new && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">NEW</span>
                )}
                {product.featured && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">HOT</span>
                )}
              </div>

              {/* Video button */}
              {hasVideo && (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur text-slate-900 p-2 rounded-full shadow-md hover:bg-white transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-800 text-slate-800" />
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {(galleryImages.length > 1 || hasVideo) && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-slate-900 ring-2 ring-slate-900/10'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
                {hasVideo && (
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden border-2 border-transparent hover:border-slate-300 flex-shrink-0 bg-slate-900 flex flex-col items-center justify-center text-white transition-all"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span className="text-xs mt-0.5 font-medium">{tDetail('gallery.video')}</span>
                  </button>
                )}
              </div>
            )}

            {/* ── Certification badges — always visible in left col ── */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                { label: tDetail('certGrid.ce'), sub: tDetail('certGrid.ceSub') },
                { label: tDetail('certGrid.enIso'), sub: tDetail('certGrid.enIsoSub') },
                { label: tDetail('certGrid.sgs'), sub: tDetail('certGrid.sgsSub') },
              ].map((c) => (
                <div key={c.label} className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-1 text-center">
                  <span className="text-xs font-bold text-slate-900 leading-none">{c.label}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 leading-none">{c.sub}</span>
                </div>
              ))}
              {/* PDF download shortcut */}
              {p.spec_pdf_url ? (
                <a
                  href={p.spec_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-xl py-2.5 px-1 text-center hover:bg-blue-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                  <span className="text-[10px] text-blue-700 font-medium leading-none">{tDetail('certGrid.specPdf')}</span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl py-2.5 px-1 text-center opacity-50">
                  <Download className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                  <span className="text-[10px] text-slate-400 leading-none">{tDetail('certGrid.specPdf')}</span>
                </div>
              )}
            </div>

            {/* ── Mini social proof — always visible in left col ── */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{tDetail('trustedBy.line')}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  tDetail('trustedBy.chip1'),
                  tDetail('trustedBy.chip2'),
                  tDetail('trustedBy.chip3'),
                  tDetail('trustedBy.chip4'),
                ].map((r) => (
                  <span key={r} className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{r}</span>
                ))}
              </div>
            </div>

          </div>

          {/* ════════════════════════════════════════
              RIGHT COLUMN — scrollable content
          ════════════════════════════════════════ */}
          <div className="w-full lg:w-[48%] flex flex-col divide-y divide-slate-100 pt-3 md:pt-4 pb-24">

            {/* ── 01 HERO ── */}
            <section className="pb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {p.industries.map((ind) => (
                  <span key={ind} className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {ind}
                  </span>
                ))}
                {product.safety_standard && (
                  <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded-full">
                    {product.safety_standard}
                  </span>
                )}
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Factory className="w-3 h-3" />
                  {tDetail('hero.oemChip')}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">
                {p.name}
              </h1>

              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{tDetail('hero.valueLine')}</p>

              {product.model_code && (
                <div className="inline-flex items-center gap-2 text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-slate-600 non-mono">{tDetail('modelLabel')}</span>
                  {product.model_code}
                </div>
              )}
            </section>

            {/* ── 02 DESCRIPTION（在 2M+ 信任数据之上） ── */}
            <section className="py-6">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                {tDetail('descriptionSection.title')}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">{p.description}</p>
              <p className="text-slate-400 text-xs mt-3 italic">{tDetail('descriptionSection.factoryLine')}</p>
            </section>

            {/* ── 03 TRUST STATS ── */}
            <section className="py-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">{TRUST_STATS.pairsShipped}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">{tDetail('trustSignals.shipped')}</div>
                </div>
                <div className="text-center p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">{TRUST_STATS.countries}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">{tDetail('trustSignals.countries')}</div>
                </div>
                <div className="text-center p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1 tabular-nums">
                    <Clock className="w-4 h-4 text-slate-500" />{TRUST_STATS.responseHours}h
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-tight">{tDetail('trustSignals.response')}</div>
                </div>
              </div>
            </section>

            {/* ── 04 FULL SPECS ── */}
            <section className="py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{tDetail('specs.title')}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{tDetail('specs.subtitle')}</p>
                </div>
                {p.spec_pdf_url && (
                  <a
                    href={p.spec_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {tDetail('downloads.specSheet')}
                  </a>
                )}
              </div>
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                {[
                  [tDetail('specs.upper'), p.materials.upper],
                  [tDetail('specs.toeCap'), p.materials.toe_cap],
                  [tDetail('specs.midsole'), p.materials.midsole],
                  [tDetail('specs.outsole'), p.materials.outsole],
                  [tDetail('specs.lining'), p.materials.lining],
                  [tDetail('specs.safetyLevel'), p.safety_standard || 'S1'],
                  [tDetail('specs.weight'), p.specs_extra?.weight || tDetail('specs.weightDefault')],
                  [tDetail('specs.testStandard'), p.specs_extra?.test_standard || tDetail('specs.testDefault')],
                  [tDetail('specs.colors'), p.specs_extra?.colors || tDetail('specs.colorsDefault')],
                  [tDetail('specs.sizes'), p.specs_extra?.sizes || '36–48 (EU)'],
                ].map(([k, v], i) => (
                  <div key={k} className={`flex items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
                    <span className="text-slate-500 w-32 flex-shrink-0">{k}</span>
                    <span className="font-medium text-slate-900">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 05 KEY FEATURES ── */}
            <section className="py-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">{tDetail('keyFeatures.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {KEY_FEATURE_IDS.map((id) => {
                  const title = tDetail(`keyFeatures.${id}.title`);
                  const d1 = tDetail(`keyFeatures.${id}.desc1`);
                  const d2 = tDetail(`keyFeatures.${id}.desc2`);
                  const icons: Record<string, ReactNode> = {
                    safety: <Shield className="w-4 h-4 text-slate-700" />,
                    comfort: <Zap className="w-4 h-4 text-slate-700" />,
                    durability: <Layers className="w-4 h-4 text-slate-700" />,
                    compliance: <FileCheck className="w-4 h-4 text-slate-700" />,
                    grip: <Droplets className="w-4 h-4 text-slate-700" />,
                    breathability: <Activity className="w-4 h-4 text-slate-700" />,
                  };
                  return (
                    <div key={id} className="flex gap-3 p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {icons[id] ?? <Activity className="w-4 h-4 text-slate-700" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-0.5">{title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{d1} {d2}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {p.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.features.map((f, idx) => (
                    <span key={idx} className="inline-flex items-center text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Check className="w-3 h-3 text-emerald-500 mr-1.5 flex-shrink-0" />{f}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* ── 06 CERTIFICATIONS ── */}
            <section className="py-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">{tDetail('certifications.title')}</h2>
              <div className="bg-slate-900 text-white rounded-2xl p-5">
                <p className="text-slate-300 text-xs mb-4 leading-relaxed">{tDetail('certifications.subtitle')}</p>
                <ul className="space-y-2 text-sm mb-4">
                  {[
                    tDetail('certifications.ce'),
                    tDetail('certifications.en20345'),
                    tDetail('certifications.sgs'),
                  ].map((cert) => (
                    <li key={cert} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-xs leading-relaxed">{tDetail('certifications.meaning')}</p>
                {p.spec_pdf_url && (
                  <a
                    href={p.spec_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-lg transition-colors w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {tDetail('downloads.certReport')}
                  </a>
                )}
              </div>
            </section>

            {/* ── 07 SOCIAL PROOF — new module ── */}
            <section className="py-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">{tDetail('socialProof.title')}</h2>
              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 font-medium">{tDetail('socialProof.shipped')}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { flag: '🇩🇪', label: tDetail('socialProof.regionEU') },
                    { flag: '🇸🇦', label: tDetail('socialProof.regionME') },
                    { flag: '🇺🇸', label: tDetail('socialProof.regionNA') },
                    { flag: '🇻🇳', label: tDetail('socialProof.regionSEA') },
                    { flag: '🇧🇷', label: tDetail('socialProof.regionLA') },
                    { flag: '🌍', label: tDetail('socialProof.regionAF') },
                  ].map(({ flag, label }) => (
                    <span key={label} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                      {flag} {label}
                    </span>
                  ))}
                </div>
                {/* Buyer testimonial placeholder — replace with real CMS data */}
                <div className="bg-white rounded-xl border border-slate-100 p-4">
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-3">
                    &ldquo;{tDetail('socialProof.testimonial')}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {tDetail('socialProof.authorInitials')}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-900">{tDetail('socialProof.author')}</span>
                      <span className="text-xs text-slate-400 ml-1.5">· {tDetail('socialProof.authorRole')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 08 INDUSTRY APPLICATIONS ── */}
            {p.industries.length > 0 && (
              <section className="py-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">{tDetail('industryApplications.title')}</h2>
                <p className="text-xs text-slate-400 mb-4">{tDetail('industryApplications.subtitle')}</p>
                <div className="space-y-3">
                  {p.industries.map((ind) => {
                    try {
                      const pain = tDetail(`industryApplications.${ind}.pain`);
                      const solution = tDetail(`industryApplications.${ind}.solution`);
                      if (!pain || pain.startsWith('industryApplications.') || !solution || solution.startsWith('industryApplications.')) return null;
                      return (
                        <div key={ind} className="p-4 rounded-xl border border-slate-200 bg-white">
                          <h3 className="font-bold text-slate-900 text-sm mb-2">{ind}</h3>
                          <p className="text-xs text-slate-500 mb-1">
                            <span className="font-medium text-slate-600">{tDetail('industryApplications.challengeLabel')} </span>
                            {pain}
                          </p>
                          <p className="text-xs text-slate-700">
                            <span className="font-medium text-slate-600">{tDetail('industryApplications.solutionLabel')} </span>
                            {solution}
                          </p>
                        </div>
                      );
                    } catch { return null; }
                  })}
                </div>
              </section>
            )}

            {/* ── 09 OEM ── */}
            <section className="py-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">{tDetail('oem.title')}</h2>
              <p className="text-xs text-slate-400 mb-4">{tDetail('oem.subtitle')}</p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-5">
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">{tDetail('oem.intro')}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 mb-4">
                  {[
                    tDetail('oem.logo'),
                    tDetail('oem.color'),
                    tDetail('oem.material'),
                    tDetail('oem.packaging'),
                    tDetail('oem.privateLabel'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
                {/* MOQ + Lead time — key info B2B buyers need */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-blue-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">{tDetail('oem.minOrderLabel')}</div>
                      <div className="text-sm font-bold text-slate-900">
                        {p.moq?.trim() || tDetail('oem.pairFallback')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">{tDetail('oem.leadTimeLabel')}</div>
                      <div className="text-sm font-bold text-slate-900">
                        {p.specs_extra?.lead_time?.trim() || tDetail('oem.leadTimeDefault')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 10 FAQ ── */}
            <section className="py-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                {tDetail('faq.title')}
              </h2>
              <div className="space-y-1.5">
                {FAQ_IDS.map((id) => {
                  const q = tDetail(`faq.${id}.q`);
                  const a = tDetail(`faq.${id}.a`);
                  const isOpen = openFaq === id;
                  return (
                    <div key={id} className="rounded-xl border border-slate-100 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : id)}
                        className="w-full text-left px-4 py-3.5 flex justify-between items-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {q}
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── 11 INQUIRY FORM ── */}
            <section id="inquiry-form" className="pt-6 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-1">{tDetail('cta.requestQuote')}</h2>
              <p className="text-slate-500 text-sm mb-6">{tDetail('cta.formDesc')}</p>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
                {submitStatus === 'success' ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{t('inquirySent')}</h4>
                    <p className="text-sm text-slate-600">{t('inquiryDesc')}</p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-4 text-sm font-bold text-slate-700 hover:text-slate-900"
                    >
                      {tDetail('inquiryForm.sendAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                          {t('form.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm"
                          placeholder={tDetail('inquiryForm.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                          {t('form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm"
                          placeholder="Work email"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company + Target Market (new) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                          {t('form.company')}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm"
                          placeholder={tDetail('inquiryForm.companyPlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                          {tDetail('inquiryForm.targetMarket')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.targetMarket}
                          onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm"
                          placeholder={tDetail('inquiryForm.targetMarketPlaceholder')}
                        />
                      </div>
                    </div>

                    {/* Row 3: Quantity (new) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        {tDetail('inquiryForm.quantity')} *
                      </label>
                      <select
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm bg-white text-slate-900"
                      >
                        <option value="">{tDetail('inquiryForm.quantityPlaceholder')}</option>
                        <option value="500-999">{tDetail('inquiryForm.qty500_999')}</option>
                        <option value="1000-2999">{tDetail('inquiryForm.qty1000_2999')}</option>
                        <option value="3000-9999">{tDetail('inquiryForm.qty3000_9999')}</option>
                        <option value="10000+">{tDetail('inquiryForm.qty10000_plus')}</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        {t('form.message')} *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full h-28 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 outline-none transition-all text-sm resize-none"
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />{t('error')}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />{t('sending')}</>
                      ) : (
                        <>{t('send')}<Send className="w-4 h-4" /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400">{tDetail('inquiryForm.footerNote')}</p>
                  </form>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE STICKY CTA BAR
          Hidden on lg+ (desktop has form always visible in right col)
      ════════════════════════════════════════ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3">
          {/* Mini product info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
            <p className="text-xs text-slate-500">{tDetail('stickyCta.subline')}</p>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            {tDetail('stickyCta.button')}
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════
          VIDEO MODAL
      ════════════════════════════════════════ */}
      {isVideoOpen && hasVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <video controls autoPlay className="w-full aspect-video" src={product.video_url}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}