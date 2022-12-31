import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: []) {
   return classes.filter(Boolean).join(" ");
}

export default function LabeledDropdown({ drawerIsOpen, toggleDrawer }) {
   const [menuItems, setMenuItems] = useState([
      { _id: 1, link: "#", text: "Home" },
      { _id: 2, link: "#", text: "About" },
      { _id: 3, link: "#", text: "Quiz" },
   ]);
   return (
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button
               onClick={() => {
                  toggleDrawer();
               }}
               className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
               </svg>
            </Menu.Button>
         </div>
      </Menu>
   );
}
