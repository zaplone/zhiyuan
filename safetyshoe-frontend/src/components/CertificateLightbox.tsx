'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type CertificateLightboxProps = {
  src: string | null;
  alt: string;
  title?: string;
  closeLabel?: string;
  open: boolean;
  onClose: () => void;
};

export function CertificateLightbox({ src, alt, title, closeLabel = 'Close', open, onClose }: CertificateLightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleKey]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? alt}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-5xl overflow-auto rounded-lg bg-white p-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white transition hover:bg-slate-800"
          aria-label={closeLabel}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative min-h-[200px] w-full min-w-[280px] max-w-[min(90vw,960px)]">
          <Image
            src={src}
            alt={alt}
            width={960}
            height={1280}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 90vw, 960px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
