const SpiralIcon = () => {
    return (
      <div className="absolute right-8 top-8 w-12 h-12 z-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,10 A40,40 0 1,1 10,50 A40,40 0 1,1 90,50 A40,40 0 1,1 50,10 Z" fill="none" stroke="white" strokeWidth="3"/>
          <circle cx="50" cy="50" r="8" fill="white"/>
        </svg>
      </div>
    );
  };
  
  export default SpiralIcon;