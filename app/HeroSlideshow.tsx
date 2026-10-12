"use client";

import { useState, useEffect } from "react";

export default function HeroSlideshow({ judul, subJudul, fotoLatar }: { judul: string, subJudul: string, fotoLatar: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efek ganti foto otomatis setiap 10 detik (10000 milidetik)
  useEffect(() => {
    if (!fotoLatar || fotoLatar.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fotoLatar.length);
    }, 10000); 

    return () => clearInterval(interval);
  }, [fotoLatar]);

  return (
    <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center px-6 bg-dh-charcoal overflow-hidden">
      
      {/* Transisi Halus Antar Gambar */}
      {fotoLatar && fotoLatar.length > 0 ? (
        fotoLatar.map((foto, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-50' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${foto}')` }}
          ></div>
        ))
      ) : (
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920')" }}></div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-dh-charcoal via-dh-charcoal/70 to-transparent z-0"></div>

      <div className="relative z-10 max-w-4xl px-2">
        <span className="text-dh-gold text-xs tracking-[0.5em] uppercase font-bold mb-4 block">
          PREMIUM VINTAGE COLLECTION
        </span>
        <h2 className="text-dh-ivory text-4xl md:text-7xl font-serif font-bold tracking-tight leading-tight mb-6 drop-shadow-lg">
          {judul}
        </h2>
        <div className="w-16 h-[2px] bg-dh-gold mx-auto mb-6"></div>
        <p className="text-gray-200 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-10 drop-shadow">
          {subJudul}
        </p>
        <div className="flex gap-4 justify-center items-center">
          <a 
            href="#katalog-unggulan" 
            className="bg-dh-gold text-dh-charcoal px-8 py-3.5 text-[11px] tracking-[0.25em] font-bold uppercase hover:bg-white hover:text-dh-charcoal transition shadow-xl rounded-sm cursor-pointer"
          >
            Lihat Koleksi
          </a>
        </div>
      </div>
    </section>
  );
}