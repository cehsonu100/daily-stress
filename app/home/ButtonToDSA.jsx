'use client';
import { useRouter } from 'next/navigation';

const ButtonToDSA = () => {
  const router = useRouter();
  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <button
      className="relative px-6 py-3 m-5 overflow-hidden font-bold text-white transition-transform transform rounded-lg  bg-gradient-to-r from-red-300 via-blue-500 to-green-500 hover:scale-110 group"
      onClick={() => handleClick('/dsaquestions')}
    >
      <span className="relative z-10">DSA Questions</span>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-300 via-blue-500 to-green-500 opacity-40 animate-gradient"></div>
      <style jsx>{`
        .animate-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 99, 71, 0.8), rgba(255, 215, 0, 0.8), rgba(0, 0, 255, 0.8), rgba(0, 255, 0, 0.8), rgba(128, 0, 128, 0.8));
          background-size: 400% 400%;
          z-index: 0;
          animation: gradient 4s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        button {
          position: relative;
        }
      `}</style>
    </button>
  );
};

export default ButtonToDSA;
