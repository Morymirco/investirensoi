import { Star } from "lucide-react"
import { useState, useEffect } from "react"

interface CourseProps {
  id: number
  title: string
  price: number
  image: string
  rating: number
  category: string
  date: string
}

export default function CourseCard({ title, price, image, rating, date }: CourseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle the button click
  const handleEnrollClick = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Auto hide the success notification after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 3000);
  };

  // Close notification manually
  const closeNotification = () => {
    setShowSuccess(false);
  };

  return (
    <>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-6 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg z-50 max-w-sm animate-fade-in-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Inscription réussie à <span className="font-semibold">{title}</span></p>
            </div>
            <button onClick={closeNotification} className="text-green-500 hover:text-green-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Course Card */}
      <div className="bg-[#070730]/40 rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] border h-full flex flex-col">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-[#00b67a] font-semibold text-xl mb-6 line-clamp-2 h-14">{title}</h3>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-500 font-bold">{price}</span>
            <div className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <img src="/mory.jpg" alt="Auteur" className="w-7 h-7 rounded-full mr-2" />
            <span className="text-gray-500">Mory Koulibaly</span>
          </div>
          
          <div className="mt-auto">
            <button 
              onClick={handleEnrollClick}
              disabled={isLoading}
              className="w-full bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 font-medium py-2 rounded-full transition-colors text-[14px] flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Inscription en cours...
                </>
              ) : (
                "Inscrivez-vous maintenant"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

