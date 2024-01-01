import { cva } from "class-variance-authority";

export default function Hamburger({ isOpen, setIsOpen }) {
   function toggleHamburgerOpen() {
      setIsOpen(!isOpen);
   }
   return (
      <div
         className="container"
         onClick={() => {
            toggleHamburgerOpen();
         }}
      >
         <div className="hamburger w-8 h-8 flex justify-around flex-nowrap z-10">
            <div className="burger w-8 h-1 rounded bg-black translate-x-2" />
            <div className="burger w-8 h-1 rounded bg-black translate-x-2" />
            <div className="burger w-8 h-1 rounded bg-black translate-x-2" />
         </div>

         <style jsx>{`
            .hamburger {
               width: 2rem;
               height: 2rem;
               display: flex;
               justify-content: space-around;
               flex-flow: column nowrap;
               z-index: 10;
            }
            .burger {
               width: 2rem;
               height: 0.25rem;
               border-radius: 10px;
               background-color: black;
               transform-origin: 1px;
               transition: all 0.3s linear;
            }
            .burger1 {
               transform: ${isOpen ? "rotate(45deg)" : "rotate(0)"};
            }
            .burger2 {
               transform: ${isOpen ? "translateX(100%)" : "translateX(0)"};
               opacity: ${isOpen ? 0 : 1};
            }
            .burger3 {
               transform: ${isOpen ? "rotate(-45deg)" : "rotate(0)"};
            }
         `}</style>
      </div>
   );
}
