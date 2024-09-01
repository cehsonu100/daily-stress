'use client';
import { useRouter } from 'next/navigation';

const ButtonToDSA = () => {
  const router = useRouter();
  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <button
      className="relative px-6 py-3 m-5 overflow-hidden font-bold text-white transition-transform transform border-2 border-transparent rounded-lg  bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-glow animate-glow-effect"
      onClick={() => handleClick('/dsaquestions')}
    >
      DSA Questions
      <style jsx>{`
        .animate-glow-effect {
          animation: glow 1.5s ease-in-out infinite;
        }
        
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.7);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
          }
        }
      `}</style>
    </button>
  );
};

export default ButtonToDSA;
