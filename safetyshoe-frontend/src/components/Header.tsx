'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Factory, Mail } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const mouseNearTopRef = useRef(false);
  const pathname = usePathname();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('oem'), href: '/services/oem' },
    { name: t('about'), href: '/about' },
    { name: t('news'), href: '/news' },
  ];

  /** 当前仅开放英文站；其它语言文案就绪后，可恢复多语言列表与下拉切换 */
  const siteLocaleLabel = 'English';
  const siteLocaleCode = 'en';

  // Check if we are on the homepage or OEM page or About page (which has dark hero)
  // Remove the locale prefix to check the path safely
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  /** 当前页若有 #contact 则平滑滚动；否则跳转至首页 /{locale}/#contact */
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('contact');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const isDarkHeroPage = 
    pathWithoutLocale === '/' || 
    pathWithoutLocale === '/services/oem' || 
    pathWithoutLocale === '/about';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      // 顶部 80px 内始终显示；向上滑显示；向下滑隐藏；鼠标在顶部区域时显示
      const visible =
        y <= 80 ||
        y < lastScrollYRef.current ||
        mouseNearTopRef.current;
      setIsHeaderVisible(visible);
      lastScrollYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearTop = e.clientY <= 80;
      mouseNearTopRef.current = nearTop;
      if (nearTop) setIsHeaderVisible(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isTransparent = !isScrolled && isDarkHeroPage;

  const headerClass = isTransparent
    ? 'bg-transparent text-white py-5'
    : 'bg-white shadow-md text-slate-900 py-3';

  const navItemColor = isTransparent
    ? 'text-white/80 hover:text-white'
    : 'text-slate-600 hover:text-primary-600';
    
  const navItemActiveColor = isTransparent 
    ? 'text-white font-bold' 
    : 'text-primary-600 font-bold';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
          headerClass
        )}
        style={{
          transform: (isHeaderVisible || isOpen) ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Brand: Factory icon + wordmark (aligned with zhiyuanwebsite nav) */}
            <div className="flex-shrink-0 min-w-0">
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="bg-orange-600 p-2 rounded-lg shrink-0">
                  <Factory className="text-white w-6 h-6" aria-hidden />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span
                    className={cn(
                      'text-xl sm:text-2xl font-black tracking-tighter italic truncate',
                      isTransparent ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {t('brandName')}{' '}
                    <span
                      className={cn(
                        isTransparent ? 'text-orange-300' : 'text-orange-600'
                      )}
                    >
                      {t('brandHighlight')}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'text-[9px] font-bold uppercase tracking-[0.4em] mt-0.5 truncate',
                      isTransparent ? 'text-white/65' : 'text-slate-500'
                    )}
                  >
                    {t('brandTagline')}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={`/${locale}${item.href === '/' ? '' : item.href}`}
                    className={cn(
                      'text-base font-medium transition-colors',
                      pathname === `/${locale}${item.href === '/' ? '' : item.href}` ? navItemActiveColor : navItemColor
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Lang + CTA（搜索入口暂隐藏） */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={`/${locale}/#contact`}
                onClick={handleContactClick}
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all',
                  'bg-orange-600 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/25',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2',
                  isTransparent ? 'ring-offset-slate-900' : 'ring-offset-white'
                )}
              >
                {t('contact')}
              </Link>

              <div
                className={cn(
                  'p-2 rounded-full flex items-center gap-1.5 select-none',
                  isTransparent ? 'text-white/90' : 'text-slate-600'
                )}
                title="English site only"
                aria-label={`Site language: ${siteLocaleLabel}`}
              >
                <Globe className="w-5 h-5 shrink-0 opacity-90" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-wide">{siteLocaleCode}</span>
              </div>

            </div>

            {/* Mobile: 联系我们 + menu */}
            <div className="md:hidden flex items-center gap-2">
               {/* Mobile Lang Switcher (Simplified) */}
               <div className="text-sm font-bold uppercase hidden">
                  {locale}
                </div>

              <Link
                href={`/${locale}/#contact`}
                onClick={handleContactClick}
                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-md bg-orange-600 hover:bg-orange-500 transition-all"
              >
                {t('contact')}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 rounded-md focus:outline-none",
                  isTransparent ? "text-white" : "text-slate-900"
                )}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col space-y-4 animate-slide-up">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    pathname === `/${locale}${item.href === '/' ? '' : item.href}`
                      ? 'bg-slate-50 text-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            </div>
          )}
        </nav>
      </header>

      {/* Floating Contact Buttons */}
      <div className="fixed right-6 bottom-24 z-40 flex flex-col gap-3">
        {/* Email Button */}
        <div className="relative group">
          <a
            href="mailto:james@zhiyuanshoes.com.cn"
            className="w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-orange-600/50"
            aria-label="Email: james@zhiyuanshoes.com.cn"
          >
            <Mail className="h-6 w-6" />
          </a>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            james@zhiyuanshoes.com.cn
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="relative group">
          <a
            href="https://wa.me/8615263623818"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-[#25D366]/50"
            aria-label="WhatsApp: +86 152 6362 3818"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            WhatsApp: +86 152 6362 3818
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </>
  );
}
