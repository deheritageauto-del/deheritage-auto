"use client";

import { useState } from "react";

export default function GaleriFoto({ images, altText }: { images: string[], altText: string }) {
  // Sistem memori untuk mengingat gambar mana yang sedang diklik (default: gambar pertama)
  const [gambarUtama, setGambarUtama] = useState(images[0] || "https://images.unsplash.com/photo-1511216113906-8f56bb469a51?q=80&w=1920");

  return (
    <div className="flex flex-col gap-4">
      {/* Gambar Besar (Utama) */}
      <div className="w-full h-[400px] md:h-[500px] bg-dh-charcoal overflow-hidden rounded-sm relative">
        <img 
          src={gambarUtama} 
          alt={altText} 
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        />
      </div>

      {/* Deretan Gambar Kecil (Thumbnail) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mt-2">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setGambarUtama(img)}
              className={`h-20 md:h-24 bg-gray-200 overflow-hidden rounded-sm cursor-pointer transition-all duration-300 border-2 ${
                gambarUtama === img 
                  ? 'border-dh-gold opacity-100 scale-105 shadow-md' // Tampilan jika sedang dipilih
                  : 'border-transparent opacity-50 hover:opacity-100' // Tampilan jika tidak dipilih
              }`}
            >
              <img src={img} alt={`${altText} ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}