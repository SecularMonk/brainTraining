import { useState } from "react";
import AvatarWithDropdown from "./AvatarWithDropdown";
import LabeledDropdown from "./LabeledDropdown";
import Hamburger from "./Hamburger";
import Drawer from "./Drawer";
import { useSession } from "next-auth/react";

export default function Navbar({ drawerIsOpen, toggleDrawer }) {
   const { data: session } = useSession();

   return (
      <div className="navbar bg-base-100">
         {/* <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} /> */}
         <LabeledDropdown drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
         {/* <Drawer drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} /> */}
         <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Brain Training</a>
         </div>
         <div className="flex-none"></div>
         <AvatarWithDropdown session={session} />
      </div>
   );
}
