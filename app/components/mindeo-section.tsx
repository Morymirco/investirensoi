import Image from "next/image"

const MindeoSection = () => {
  return (
    <section className="relative w-full py-16 bg-[#020B2D] text-white overflow-hidden min-h-screen">
      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(76, 38, 125, 0.3) 0%, rgba(2, 11, 45, 0) 50%)",
          }}
        ></div>
      </div>

      <div className="container max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        {/* Left column - Text content */}
        <div className="md:w-1/2 z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Progressez vers votre
            <br />
            prochain niveau de
            <br />
            <span className="text-blue-400">succès</span>
          </h2>

          <p className="my-8 text-gray-300 max-w-xl">
            Mindeo c'est déjà 4 formations expertes dans leurs domaines: Lancez vos business grâce à Business Pro,
            comprenez les rouages de l'investissement immobilier avec Immo Pro ou devenez une meilleure version de
            vous-même grâce à Success Pro.
          </p>

          {/* Stats section */}
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="stat text-center md:text-left">
              <h3 className="text-4xl font-bold">+30</h3>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Experts</p>
                  <p className="text-gray-400">à vos côtés</p>
                </div>
              </div>
            </div>

            <div className="stat text-center md:text-left">
              <h3 className="text-4xl font-bold">+200</h3>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Heures</p>
                  <p className="text-gray-400">de contenus</p>
                </div>
              </div>
            </div>

            <div className="stat text-center md:text-left">
              <h3 className="text-4xl font-bold">+250M€</h3>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Générés</p>
                  <p className="text-gray-400">par nos élèves</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Mobile screenshots */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative w-full flex justify-center">
          <div className="relative h-[400px] md:h-[500px] w-full max-w-[320px] md:max-w-full">
            {/* Main phone mockup */}
            <div className="absolute right-0 md:right-8 transform rotate-3 shadow-xl rounded-3xl">
              <div className="relative w-56 md:w-80 h-auto overflow-hidden rounded-3xl border-gray-900">
                <Image
                  src="/phone3.png"
                  alt="Mindeo app screenshot"
                  width={320}
                  height={650}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Secondary phone mockup */}
            <div className="absolute left-0 md:left-0 top-12 transform -rotate-6 shadow-xl rounded-3xl">
              <div className="relative w-44 md:w-64 h-auto overflow-hidden rounded-3xl border-gray-900">
                <Image
                  src="/phone2.png"
                  alt="Mindeo pack screenshot"
                  width={250}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Floating icon 1 - Graduation Cap (replacing Chart) */}
            <div className="absolute right-0 md:right-4 bottom-24 md:bottom-32 p-2 md:p-3 bg-white rounded-lg shadow-lg">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-500 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 md:h-6 w-5 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v4" />
                </svg>
              </div>
            </div>

            {/* Floating icon 2 - Light Bulb (replacing Ethereum) */}
            <div className="absolute left-0 md:left-8 bottom-8 p-2 md:p-3 bg-blue-100 rounded-full shadow-lg">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 md:h-8 w-6 md:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>

            {/* Floating icon 3 - Book/Course (replacing Shopping) */}
            <div className="absolute right-24 md:right-36 top-16 p-2 md:p-3 bg-blue-100 rounded-lg shadow-lg">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-600 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 md:h-6 w-5 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MindeoSection

