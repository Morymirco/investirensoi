export default function MissionSection() {
    const images = [
      'https://img.freepik.com/photos-gratuite/jeune-femme-travaillant-ses-ecouteurs-dessus_23-2149116562.jpg?t=st=1741312286~exp=1741315886~hmac=cdf9c8740cdae076545c3b3af36bedb4988d47fdc921159d9a9c76072cb0de14&w=1380',
     'https://img.freepik.com/photos-gratuite/petit-garcon-faisant-ecole-ligne_23-2149041135.jpg?t=st=1741312365~exp=1741315965~hmac=8203d6f24985fb7b7f28acb61dd05ec4c28ad2705398aa0d07bbbb0d2a6a11c5&w=1380',
     'https://img.freepik.com/photos-gratuite/homme-coup-moyen-ordinateur-portable_23-2149045940.jpg?t=st=1741312401~exp=1741316001~hmac=d78f6b631b06a1e59558d80816e10afcbe3fefa2ae54a3e61b1795d633110da4&w=1380',
     'https://img.freepik.com/photos-gratuite/homme-affaires-travailler-ordinateur-portable_23-2148634788.jpg?t=st=1741312433~exp=1741316033~hmac=296af049211e5e83ff3759d8d59e6e0fa1406de10ba720b2b50a9de44a6762ad&w=900',
     'https://img.freepik.com/photos-gratuite/femme-affaires-africaine-discutant-femme-partenaire-distance-ligne-assise-devant-ordinateur-portable-travaillant-dans-bureau-demarrage-parlant-par-appel-video-lors-reunion-virtuelle-minuit-aide-casque_482257-21358.jpg?t=st=1741312457~exp=1741316057~hmac=631ce2c2b7602d2ed4b4314d98489ce89bcd5ce0930d12c4b48a7b63ef1fa146&w=1800',
     'https://img.freepik.com/photos-gratuite/etudiant-noir-portant-casque-ayant-cours-entreprise-audio-ordinateur-portable_482257-16802.jpg?t=st=1741312490~exp=1741316090~hmac=a713cf6547b33c9d3254acc1014199c7fa610543bce49aee1b77abb91f28ffbc&w=1380',
     'https://img.freepik.com/photos-gratuite/femme-coup-moyen-ordinateur-portable-maison_23-2150170910.jpg?t=st=1741312514~exp=1741316114~hmac=aa687a036592b5fb6473b19dff185f493e1389425e2ea4bd888b4b665b647a6a&w=1380',
     'https://img.freepik.com/photos-gratuite/jeune-etudiant-travaillant-affectation_23-2149257193.jpg?t=st=1741312533~exp=1741316133~hmac=59d9a4135626300e27aa83fdbf003b9d16c89dc328c6a9e0796efbd49fe035df&w=1380',
     'https://img.freepik.com/photos-gratuite/femme-angle-eleve-s-entrainant-ordinateur-portable_23-2150384088.jpg?t=st=1741312564~exp=1741316164~hmac=298c7ec6ea5ec68d57aaf4f3644f5376e8d13df6620c15c2c5ea664ffc1d4482&w=1380',
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