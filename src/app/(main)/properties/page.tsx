import React from "react";
import PropertiesModule from "modules/Properties";
import { NextRequest } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SidebarLayout from "@/components/SidebarLayout";

const Properties = async () => {
  const session = await getServerSession(authOptions);
  return (
    <SidebarLayout>
      <div className="space-y-3">
      <div>
        <PropertiesModule session={session} />
      </div>
    </div>
    </SidebarLayout>
    
  );
};

export default Properties;
