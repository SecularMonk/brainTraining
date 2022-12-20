import AvatarWithDropdown from "./AvatarWithDropdown";
import LabeledDropdown from "./LabeledDropdown";
import Drawer from "./Drawer";
import { useSession } from "next-auth/react";

export default function Navbar() {
   const { data: session } = useSession();

   return (
      <div className="navbar bg-base-100">
         <LabeledDropdown />
         <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Brain Training</a>
         </div>
         <div className="flex-none"></div>
         <AvatarWithDropdown session={session} />
      </div>
   );
}
