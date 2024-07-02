import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

import { Lock } from "lucide-react";
import { revalidatePath } from "next/cache";

const Navbar = async () => {

  async function signOut() {
    revalidatePath("/");
  }

  return (
    <header className="w-full">
      <div className="container p-4 sm:p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Lock />
          <h5 className="mt-0.5">BeaverGate</h5>
        </Link>

        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
