import SidebarLayout from "@/components/SidebarLayout";
import AssetPage from "modules/AssetPage/AssetPage";
import React from "react";

const Assets = () => {
  return (
    <SidebarLayout>
      <div className="space-y-3">
        <div>
          <AssetPage />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Assets;
