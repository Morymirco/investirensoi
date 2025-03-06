export default function MissionSection() {
    const images = [
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
     'ecommerce.jpg',
    ]
  
  
    return (
      <section className="relative overflow-hidden bg-[#020B2D] py-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Dark base */}
          <div className="absolute inset-0 bg-[#020B2D]"></div>
  
          {/* Radial gradient spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 50%, rgba(76, 38, 125, 0.3) 0%, rgba(2, 11, 45, 0) 50%)",
            }}
          ></div>
        </div>
  
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4 transform perspective-1000">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    transform: `translateZ(${(index % 3) * 10}px) translateY(${Math.floor(index / 3) * 5}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                  <img
                    src={`${image}`}
                    alt={`Team member ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
  
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Notre <span className="text-[#6C8DFF]">mission</span>
              </h2>
              <div className="space-y-4 text-white/90">
                <p className="text-xl">Osez devenir une meilleure version de vous-même avec notre école en ligne.</p>
                <p>
                  Des milliers de personnes ont déjà suivi nos programmes en ligne dans les domaines du business, de
                  l&apos;investissement et du développement personnel.
                </p>
                <p>
                  Nos formations de haute qualité sont conçues par plus de 30 experts francophones, et notre plateforme
                  d&apos;apprentissage en ligne vise à offrir un moyen efficace et pratique de développer vos compétences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }