import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#000025] pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#000025]">
                <Image src="/logo_footer.png" alt="Logo" width={100} height={400} className="w-auto h-8 md:h-10"/>
              </div>
              <span className="text-white text-lg md:text-xl font-bold">INVESTIR EN SOI</span>
            </div>
            <div className="text-gray-400 space-y-1 md:space-y-2 text-sm md:text-base">
              <p>Yattaya, ratoma</p>
              <p>conakry -Guinée</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400">
                <Mail className="w-4 md:w-5 h-4 md:h-5" />
                <a href="mailto:contact@investirensoi.com" className="hover:text-white transition-colors text-sm md:text-base">
                  contact@investirensoi.com
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400">
                <Phone className="w-4 md:w-5 h-4 md:h-5" />
                <a href="tel:+224625212115" className="hover:text-white transition-colors text-sm md:text-base">
                  (+224) 625 21 21 15
                </a>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Pages</h3>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/formations" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Formations */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Catégories</h3>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <Link href="/formations?categorie=Business" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/formations?categorie=Développement" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Développement
                </Link>
              </li>
              <li>
                <Link href="/formations?categorie=Marketing" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/formations?categorie=Design" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Design
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} Investir En Soi. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

