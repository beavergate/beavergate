// components/Header.tsx
import { FC } from "react";
import { Bell, Mail } from "lucide-react";
import ProfileDropdown from "./components/ProfileDropdown";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="bg-[#121924] p-4 shadow ">
      <div className="container max-w-[1600px] flex justify-between p-0">
        <div className="flex items-center gap-3">
        <Link href="/">
         {/* <Image src="/logo.png" alt="Clova Logo" width={40} height={40} /> */}
         <h5 className="text-white">
            BeaverGate
          </h5>
         </Link>
         
        </div>
        <div className="flex items-center space-x-4">
          <Mail size={20} color="#ffffff" className="cursor-pointer" />
          <Bell size={20} color="#ffffff" className="cursor-pointer" />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
