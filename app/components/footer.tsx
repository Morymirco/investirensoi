import { Input } from "@/components/ui/input"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#000025] pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
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

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Services</h3>
            <ul className="space-y-2 md:space-y-4">
              {[
                "Apprentissage en ligne",
                "Bootcamp",
                "Séminaire en ligne",
                "Certifications",
                "Mentoring",
                "Corporate Services",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Entreprise</h3>
            <ul className="space-y-2 md:space-y-4">
              {["À propos de nous", "Direction", "Carrières", "Article & News", "Mentions légales"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-4 md:mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
              Inscrivez-vous à notre newsletter pour obtenir des informations mises à jour, des actualités et des
              informations gratuites.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500 text-sm md:text-base"
              />
              <button className="bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 px-4 md:px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm md:text-base whitespace-nowrap">
                <Mail className="w-4 h-4" />
                <span>S&apos;inscrire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
            <p className="text-white text-base md:text-lg lg:text-xl lg:max-w-2xl text-center lg:text-left mb-4 lg:mb-0">
              Prêt à apprendre en déplacement ? Téléchargez notre cours en ligne sur application mobile et commencez à
              apprendre à tout moment et en tout lieu !
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-4 items-center justify-center sm:justify-start w-full sm:w-auto">
              <a href="#" className="transition-transform hover:scale-105">
                <img src="/Google-Play.png.webp" alt="Get it on Google Play" className="h-10 md:h-12" />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <img src="/App-Store.png" alt="Download on the App Store" className="h-10 md:h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

