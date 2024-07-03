import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

const ProfileDropdown = () => {
  return (
    <div>
      {" "}
      <NavigationMenu className="hover:bg-transparent">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center text-white focus:outline-none bg-transparent hover:bg-transparent hover:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent">
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Rodney Leonard"
                />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="ml-2 text-[16px]">Rodney Leonard</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white text-black rounded shadow-lg flex flex-col cursor-pointer">
              <NavigationMenuLink className=" px-10 py-2 hover:bg-gray-100">
                Profile
              </NavigationMenuLink>
              <NavigationMenuLink className=" px-10 py-2 hover:bg-gray-100">
                Settings
              </NavigationMenuLink>
              <NavigationMenuLink className=" px-10 py-2 hover:bg-gray-100">
                Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ProfileDropdown;
