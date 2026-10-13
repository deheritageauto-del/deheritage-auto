import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import GaleriFoto from "./GaleriFoto";
import FormSewa from "./FormSewa";

// 1. KONEKSI KE BRANKAS DATA (SUPABASE)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export function generateStaticParams() {
  return [{ id: 'dummy' }];
}

export default async function DetailMobil({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: mobil, error } = await supabase
    .from("mobil")
    .select("*")
    .eq("id", id)
    .single();

  if (!mobil || error) {
    return (
      <>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-[#FDFBF7] font-serif">
          <h1 className="text-3xl mb-4">Kendaraan Tidak Ditemukan</h1>
          <Link href="/" className="text-[#B38B42] hover:underline font-sans text-sm tracking-widest uppercase">
            Kembali ke Beranda
          </Link>
        </div>
      </>
    );
  }

  const images = mobil.images || [];

  return (
    <>
      {/* KODE PEMANGGIL DESAIN TAILWIND CSS (YANG SEBELUMNYA HILANG) */}
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'dh-charcoal': '#121212',
                  'dh-ivory': '#FDFBF7',
                  'dh-gold': '#B38B42',
                  'dh-gold-hover': '#C59B4E',
                },
                fontFamily: {
                  serif: ['Playfair Display', 'serif'],
                  sans: ['Montserrat', 'sans-serif'],
                }
              }
            }
          }
        `}} />
      </head>

      <main className="min-h-screen bg-dh-ivory text-dh-charcoal font-sans selection:bg-dh-gold selection:text-dh-charcoal pb-24">
        
        <header className="w-full py-5 px-6 md:px-16 border-b border-gray-200 bg-dh-ivory sticky top-0 z-50 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold tracking-[0.2em] uppercase text-dh-charcoal hover:text-dh-gold transition flex items-center gap-2">
            <span>&larr;</span> Kembali
          </Link>
          <div className="text-dh-gold text-[10px] tracking-[0.3em] font-serif uppercase font-bold">
            Deheritage Auto
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* KIRI: FOTO & DESKRIPSI */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <span className="text-dh-gold text-xs tracking-[0.4em] font-extrabold uppercase block mb-3">
                {mobil.merek}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-black tracking-wide text-dh-charcoal uppercase leading-tight">
                {mobil.model}
              </h1>
            </div>

            <GaleriFoto images={images} altText={mobil.model} />

            <div className="mt-6 border-t border-gray-200 pt-10">
              <h3 className="text-xl font-serif font-bold text-dh-charcoal mb-6 tracking-wider">Spesifikasi Kendaraan</h3>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-10 mb-10">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Tahun</div>
                  <div className="text-sm font-medium">{mobil.tahun}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Transmisi</div>
                  <div className="text-sm font-medium">{mobil.transmisi}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Warna</div>
                  <div className="text-sm font-medium">{mobil.warna}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Kapasitas</div>
                  <div className="text-sm font-medium">{mobil.kapasitas}</div>
                </div>
                
                {/* Tambahan Lokasi */}
                {mobil.lokasi && (
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Lokasi Unit</div>
                    <div className="text-sm font-medium">{mobil.lokasi}</div>
                  </div>
                )}
                
              </div>

              <h3 className="text-xl font-serif font-bold text-dh-charcoal mb-4 tracking-wider">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base text-justify whitespace-pre-wrap">
                {mobil.deskripsi}
              </p>
            </div>
          </div>

          {/* KANAN: FORMULIR PEMESANAN VIA EMAIL */}
          <div className="lg:col-span-5">
            <FormSewa harga={mobil.harga} namaMobil={`${mobil.merek} ${mobil.model}`} />
          </div>

        </div>
      </main>
    </>
  );
}