import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-[#000025] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="w-10 h-10 rounded-full bg-[#000025]">
                <Image src="/logo_footer.png" alt="Logo" width={100} height={400} className="w-auto h-10"/>
              </div>
              <span className="text-white text-xl font-bold">INVESTIR EN SOI</span>
            </div>
            <div className="text-gray-400 space-y-2">
              <p>Yattaya, ratoma</p>
              <p>conakry -Guinée</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@investirensoi.com" className="hover:text-white transition-colors">
                  contact@investirensoi.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <a href="tel:+224625212115" className="hover:text-white transition-colors">
                  (+224) 625 21 21 15
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                "Apprentissage en ligne",
                "Bootcamp",
                "Séminaire en ligne",
                "Certifications",
                "Mentoring",
                "Corporate Services",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Entreprise</h3>
            <ul className="space-y-4">
              {["À propos de nous", "Direction", "Carrières", "Article & News", "Mentions légales"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Inscrivez-vous à notre newsletter pour obtenir des informations mises à jour, des actualités et des
              informations gratuites.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500 "
              />
              <button className="bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Mail className="w-4 h-4" />
                <span>S&apos;inscrire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-white text-lg md:text-xl lg:max-w-2xl text-center lg:text-left">
              Prêt à apprendre en déplacement ? Téléchargez notre cours en ligne sur application mobile et commencez à
              apprendre à tout moment et en tout lieu !
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-transform hover:scale-105">
                <img src="/Google-Play.png.webp" alt="Get it on Google Play" className="h-12" />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <img src="/App-Store.png" alt="Download on the App Store" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

