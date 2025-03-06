const ChatIcon = () => {
    return (
      <div className="fixed bottom-8 right-8 bg-accent-red rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg z-50">
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
          <path d="M7 9h10v2H7z"/>
          <path d="M7 12h7v2H7z"/>
        </svg>
      </div>
    );
  };
  
  export default ChatIcon;