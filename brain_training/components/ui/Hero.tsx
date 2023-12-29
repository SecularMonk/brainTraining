import { Inter, Rubik, Poppins } from "@next/font/google";
import clsx from "clsx";
import { ButtonOrLink } from "./ButtonOrLink";
import Button from "./Button";

export const title = Poppins({
   subsets: ["latin"],
   weight: ["200"],
});

export const text = Inter({
   subsets: ["latin"],
   weight: ["400", "700"],
});

export default function Hero() {
   return (
      <div
         className="hero min-h-screen m-auto bg-fixed bg-center bg-cover custom-img"
         style={{ backgroundImage: `url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg")` }}
      >
         <div className="hero-overlay bg-opacity-60 min-h-screen"></div>
         <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
               <h1 className={clsx("mb-5 text-6xl font-bold text-white", title.className)}>BOOST YOUR BRAIN POWER</h1>
               <p className={clsx("mb-5 text-gray-300", text.className)}>The only science-backed way to improve your IQ.</p>
               <Button className="btn btn-primary" href="http://localhost:3000/api/auth/signin">
                  Get started
               </Button>
            </div>
         </div>
      </div>
   );
}
