import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: []) {
   return classes.filter(Boolean).join(" ");
}

export default function LabeledDropdown() {
   const [menuItems, setMenuItems] = useState([
      { _id: 1, link: "#", text: "Home" },
      { _id: 2, link: "#", text: "About" },
      { _id: 3, link: "#", text: "Quiz" },
   ]);
   return (
      <Menu as="div" className="relative inline-block text-left ">
         <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-100">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
               </svg>
            </Menu.Button>
         </div>

         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute justify-between menu menu-compact dropdown-content rounded-box left-0 z-10 mt-3 w-52 p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-700 shadow-lg ring-black ring-opacity-5 focus:outline-none">
               <div className="py-1">
                  {menuItems &&
                     menuItems.map((Element) => {
                        return (
                           <Menu.Item key={Element._id}>
                              {({ active }) => (
                                 <a
                                    href={Element?.link}
                                    className={classNames(active ? "bg-cyan-500 text-white rounded-md" : "text-white", "block px-4 py-2 text-sm")}
                                 >
                                    {Element.text}
                                 </a>
                              )}
                           </Menu.Item>
                        );
                     })}
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   );
}
