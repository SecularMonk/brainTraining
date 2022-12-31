import { signIn, signOut } from "next-auth/react";
import Button from "./Button";

export default function AvatarWithDropdown({ session }) {
   const options = [
      { _id: 1, link: "#", text: "Profile" },
      { _id: 2, link: "#", text: "Settings" },
   ];
   return (
      <div className="dropdown dropdown-end">
         <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
               <img src="https://placeimg.com/80/80/people" />
            </div>
         </label>
         <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {options &&
               options.map((Element) => {
                  return (
                     <li key={Element?._id ?? 1}>
                        <a href={Element.link} className="justify-between">
                           {Element.text}
                        </a>
                     </li>
                  );
               })}
            <li></li>
            {session ? (
               <li>
                  <Button onClick={async () => signOut()} intent="danger" fullWidth={false}>
                     Logout
                  </Button>
               </li>
            ) : (
               <li>
                  <Button onClick={async () => signIn()} intent="primary" fullWidth={false}>
                     Log in
                  </Button>
               </li>
            )}
         </ul>
      </div>
   );
}
