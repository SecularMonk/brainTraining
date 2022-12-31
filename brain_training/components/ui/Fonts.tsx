import { Inter, Rubik } from "@next/font/google";
import clsx from "clsx";

export const title = Rubik({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
});

export const text = Inter({
   subsets: ["latin"],
   weight: ["400", "700"],
});

export default function Fonts() {
   return (
      <div className={clsx("flex h-screen w-full flex-col items-center justify-center gap-4 bg-stone-900 text-white", text.className)}>
         <h1 className={clsx("text-8xl font-bold", title.className)}>Hi, I&apos;m Omari</h1>
         <button className="rounded bg-teal-800 px-8 py-4 text-2xl shadow">Let&apos;s Talk</button>
      </div>
   );
}
