"use client";

export default function FormSewa({ harga, namaMobil, layanan }: { harga: string, namaMobil: string, layanan?: string[] }) {
  // GANTI ALAMAT EMAIL DI BAWAH INI DENGAN EMAIL ASLI ADMIN DEHERITAGE AUTO!
  const emailAdmin = "@gmail.com"; 

  return (
    <div className="sticky top-28 bg-white border border-gray-200 p-8 md:p-10 shadow-xl rounded-sm">
      <div className="mb-8 pb-8 border-b border-gray-100">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Tarif Sewa</div>
        <div className="text-3xl font-serif font-black text-dh-charcoal">{harga}</div>
      </div>

      {/* === KODE TAG LAYANAN (MULAI) === */}
      {layanan && Array.isArray(layanan) && layanan.length > 0 && (
        <div className="mb-8">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">
            Tersedia Untuk:
          </div>
          <div className="flex flex-wrap gap-2">
            {layanan.map((tag: string, index: number) => (
              <span 
                key={index} 
                className="px-4 py-1.5 text-[10px] md:text-xs font-semibold text-[#c39b57] border border-[#c39b57] rounded-full bg-[#c39b57]/5 tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* === KODE TAG LAYANAN (SELESAI) === */}

      <h3 className="text-xl font-serif font-bold text-dh-charcoal mb-2 tracking-wider">Formulir Pengajuan Sewa</h3>
      <p className="text-xs text-gray-500 mb-8 font-light leading-relaxed">
        Lengkapi data di bawah ini. Tim kami akan segera menghubungi Anda untuk konfirmasi ketersediaan dan pembayaran.
      </p>

      {/* MENGGUNAKAN FORMSUBMIT UNTUK MENGIRIM DATA KE EMAIL ADMIN */}
      <form action={`https://formsubmit.co/${emailAdmin}`} method="POST" className="flex flex-col gap-6">
        
        {/* Konfigurasi Tersembunyi FormSubmit */}
        <input type="hidden" name="_subject" value={`Pemesanan Baru: ${namaMobil}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        
        {/* Data Mobil yang dikirim secara tersembunyi ke email */}
        <input type="hidden" name="Mobil Yang Dipilih" value={namaMobil} />
        <input type="hidden" name="Tarif Sewa" value={harga} />

        <div>
          <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Nama Lengkap *</label>
          <input type="text" name="Nama Lengkap" required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors" placeholder="Masukkan nama Anda..." />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Nomor WhatsApp *</label>
            <input type="text" name="Nomor WhatsApp" required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors" placeholder="+62 8..." />
          </div>
          <div>
            <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Email Anda *</label>
            <input type="email" name="Email Pelanggan" required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors" placeholder="email@anda.com" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Tanggal Sewa *</label>
            <input type="date" name="Tanggal Sewa" required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors text-gray-600" />
          </div>
          <div>
            <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Durasi (Jam)</label>
            <select name="Durasi Sewa" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors text-gray-600">
              <option value="6 jam">6 Jam</option>
              <option value="12 Jam">12 Jam</option>
              <option value="18 Jam">18 jam</option>
              <option value="24 Jam">24 jam</option>
              <option value="Lebih dari 24 Jam">Lebih dari 24 Jam</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-dh-charcoal uppercase tracking-widest font-bold mb-2 block">Keperluan (Opsional)</label>
          <input type="text" name="Keperluan" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-dh-gold bg-transparent text-sm transition-colors" placeholder="Contoh: Properti Wedding, Syuting..." />
        </div>

        <button type="submit" className="w-full bg-dh-gold text-dh-charcoal font-bold tracking-[0.2em] uppercase text-xs py-4 mt-6 hover:bg-dh-charcoal hover:text-dh-gold transition-colors duration-300 rounded-sm">
          Kirim Permintaan
        </button>
      </form>
    </div>
  );
}