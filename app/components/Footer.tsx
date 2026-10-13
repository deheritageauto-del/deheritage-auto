import Image from "next/image";
import Link from "next/link";
import { BsThreads } from "react-icons/bs";
import { FaWhatsapp, FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#d6d3d1] text-gray-800 py-16 mt-20 border-t border-[#c2bdbc]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kolom Kiri: Logo, Deskripsi, dan Sosial Media */}
          <div className="flex flex-col space-y-6">
            
            <div className="flex items-center">
               <Image 
                  src="/logo.png" 
                  alt="Deheritage Auto Logo" 
                  width={200} 
                  height={80} 
                  className="object-contain"
                />
            </div>

            <p className="text-sm leading-relaxed max-w-md text-gray-700 font-medium">
              Kami menawarkan pengalaman terbaik untuk menjadi kenangan terbaik Anda 
            </p>

            {/* Ikon Sosial Media */}
            <div className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/deheritageauto/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-[#c39b57] hover:bg-[#c39b57] hover:text-white transition-colors shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@heritageauto.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-[#c39b57] hover:bg-[#c39b57] hover:text-white transition-colors shadow-sm">
                <FaTiktok size={18} />
              </a>
              <a href="https://www.threads.com/@deheritageauto" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-[#c39b57] hover:bg-[#c39b57] hover:text-white transition-colors shadow-sm">
                <FaThreads size={18} />
              </a>
              <a href="https://www.youtube.com/@heritageauto2026" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-[#c39b57] hover:bg-[#c39b57] hover:text-white transition-colors shadow-sm">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}