import React from "react";
import PropertiesModule from "modules/Properties";
import { NextRequest } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Properties = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-3">
      <div>
        <PropertiesModule session={session} />
      </div>
    </div>
  );
};

export default Properties;
