export default function AnimatedBackground() {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl animate-floating top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-500 opacity-25 rounded-full blur-3xl animate-floating-slow bottom-20 right-20"></div>
        <div className="absolute w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-floating top-1/3 left-1/2"></div>
      </div>
    );
  }
  