"use client";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import HeroSlideshow from "./HeroSlideshow";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

type Mobil = {
  id: string;
  merek: string;
  model: string;
  tahun: string;
  harga: string;
  images: string[];
  lokasi: string;
};

export default function Home() {
  const [semuaMobil, setSemuaMobil] = useState<Mobil[]>([]);
  const [mobilTampil, setMobilTampil] = useState<Mobil[]>([]);
  const [webSettings, setWebSettings] = useState<any>(null);
  
  const [kataKunci, setKataKunci] = useState("");
  const [lokasiPilihan, setLokasiPilihan] = useState("Semua Lokasi");
  const [daftarLokasi, setDaftarLokasi] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: dataMobil, error: errMobil } = await supabase
          .from("mobil")
          .select("*")
          .order("created_at", { ascending: false });

        if (errMobil) throw errMobil;

        setSemuaMobil(dataMobil || []);
        setMobilTampil(dataMobil || []);

        if (dataMobil) {
          const lokasiUnik = Array.from(new Set(dataMobil.map(m => m.lokasi).filter(Boolean)));
          setDaftarLokasi(lokasiUnik as string[]);
        }

        const { data: dataSettings, error: errSettings } = await supabase
          .from("pengaturan_web")
          .select("*")
          .eq("id", 1)
          .single();
          
        if (!errSettings) {
          setWebSettings(dataSettings);
        }

      } catch (err: any) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let hasilFilter = semuaMobil;

    if (lokasiPilihan !== "Semua Lokasi") {
      hasilFilter = hasilFilter.filter(mobil => 
        mobil.lokasi?.toLowerCase() === lokasiPilihan.toLowerCase()
      );
    }

    if (kataKunci.trim() !== "") {
      const keyword = kataKunci.toLowerCase();
      hasilFilter = hasilFilter.filter(mobil => 
        mobil.merek?.toLowerCase().includes(keyword) || 
        mobil.model?.toLowerCase().includes(keyword) ||
        mobil.tahun?.includes(keyword)
      );
    }

    setMobilTampil(hasilFilter);
  }, [kataKunci, lokasiPilihan, semuaMobil]);


  return (
    <>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <title>Deheritage Auto - Classic Car Rental</title>
        {/* INI ADALAH BAGIAN YANG HILANG SEBELUMNYA, YANG MENGATUR DESAIN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: { 'dh-charcoal': '#121212', 'dh-ivory': '#FDFBF7', 'dh-gold': '#B38B42' },
                fontFamily: { serif: ['Playfair Display', 'serif'], sans: ['Montserrat', 'sans-serif'] }
              }
            }
          }
        `}} />
      </head>

      <main className="min-h-screen bg-dh-ivory text-dh-charcoal font-sans selection:bg-dh-gold selection:text-dh-charcoal pb-10">
        
        {/* NAVBAR */}
        <header className="w-full py-5 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 bg-dh-ivory sticky top-0 z-50 shadow-sm gap-4">
          <Link href="/" className="flex flex-col items-center text-center hover:opacity-80 transition-opacity">
            <div className="text-dh-gold text-[9px] tracking-[0.4em] font-medium mb-1 font-serif uppercase">
              ⚜ Classic & Vintage ⚜
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-[0.2em] text-dh-charcoal">
              DEHERITAGE <span className="text-dh-gold font-light">AUTO</span>
            </h1>
          </Link>
          <nav className="flex gap-6 md:gap-12 text-[10px] tracking-[0.2em] uppercase font-semibold text-dh-charcoal">
            <Link href="/" className="hover:text-dh-gold transition">Beranda</Link>
            <a href="#katalog-unggulan" className="hover:text-dh-gold transition">Katalog</a>
          </nav>
        </header>

        {/* HERO SECTION SLIDESHOW */}
        {!isLoading && (
          <HeroSlideshow 
            judul={webSettings?.judul_utama || "Timeless Elegance For Your Special Moments"}
            subJudul={webSettings?.sub_judul || "Koleksi eksklusif kendaraan klasik premium untuk momen berharga Anda."}
            fotoLatar={webSettings?.foto_latar || []}
          />
        )}

        {/* KATALOG SECTION */}
        <section id="katalog-unggulan" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-dh-gold text-xs tracking-[0.3em] uppercase font-bold mb-2 block">SELECTED FLEET</span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-wide text-dh-charcoal">Koleksi Unggulan</h3>
            <div className="w-14 h-[2px] bg-dh-gold mx-auto mt-4 mb-3"></div>
            
            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-2xl mx-auto mt-8">
                <strong>Error Database:</strong> {errorMsg}
              </div>
            )}
          </div>

          {/* BARIS PENCARIAN & FILTER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-2/3">
              <input 
                type="text" 
                placeholder="Cari mobil (Cth: Mercedes, Mustang, 1967)..." 
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-dh-gold focus:ring-1 focus:ring-dh-gold text-sm transition-shadow"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Lokasi */}
            <div className="relative w-full md:w-1/3">
              <select 
                value={lokasiPilihan}
                onChange={(e) => setLokasiPilihan(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-dh-gold focus:ring-1 focus:ring-dh-gold text-sm cursor-pointer"
              >
                <option value="Semua Lokasi">Semua Lokasi</option>
                {daftarLokasi.map((lok, index) => (
                  <option key={index} value={lok}>{lok.toUpperCase()}</option>
                ))}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-4 top-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* GRID KATALOG MOBIL */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dh-gold"></div>
            </div>
          ) : (
            <>
              {mobilTampil.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {mobilTampil.map((mobil) => (
                    <Link href={`/mobil/${mobil.id}`} key={mobil.id} className="block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group border border-gray-150">
                      <div className="relative h-64 bg-dh-charcoal overflow-hidden">
                        <img src={mobil.images?.[0] || "https://images.unsplash.com/photo-1511216113906-8f56bb469a51?q=80&w=1000"} alt={mobil.model} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-95 group-hover:opacity-100" />
                        <div className="absolute top-4 left-4 bg-dh-charcoal text-dh-ivory border border-dh-gold text-[10px] tracking-widest px-3.5 py-1.5 uppercase font-semibold">{mobil.tahun}</div>
                        <div className="absolute top-4 right-4 bg-dh-gold text-dh-charcoal text-[9px] tracking-wider font-extrabold px-3 py-1.5 uppercase rounded-sm shadow">Sewa / Rental</div>
                        
                        {/* Label Lokasi */}
                        {mobil.lokasi && (
                          <div className="absolute bottom-4 right-4 bg-dh-charcoal/80 backdrop-blur-sm text-dh-ivory border border-gray-500/30 text-[9px] tracking-widest px-3 py-1.5 uppercase font-semibold flex items-center gap-1.5 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-dh-gold">
                              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            {mobil.lokasi}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 flex-grow flex flex-col border border-t-0 border-gray-100">
                        <div className="text-[10px] text-dh-gold tracking-widest font-extrabold mb-1 uppercase">{mobil.merek}</div>
                        <h4 className="text-xl font-serif font-bold text-dh-charcoal mb-2 tracking-wide group-hover:text-dh-gold transition-colors">{mobil.model}</h4>
                        <div className="w-10 h-[1.5px] bg-dh-gold/45 my-3"></div>
                        <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-dh-charcoal font-serif font-extrabold text-[14px]">{mobil.harga}</span>
                          <span className="text-[11px] font-bold tracking-widest uppercase text-dh-gold border-b-2 border-dh-gold/20 pb-1">Detail & Booking</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-gray-200 rounded-sm shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-serif text-dh-charcoal">Mobil tidak ditemukan</p>
                  <p className="text-gray-500 mt-2">Coba gunakan kata kunci atau pilih lokasi lain.</p>
                  <button 
                    onClick={() => { setKataKunci(""); setLokasiPilihan("Semua Lokasi"); }}
                    className="mt-6 px-6 py-2 bg-dh-gold text-white text-xs tracking-widest uppercase font-bold rounded-sm hover:bg-dh-charcoal transition-colors"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}