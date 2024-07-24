"use client";

import React from "react";
import DashboardModule from "modules/Properties";

const Dashboard = () => {
  return (
    <div className="space-y-3">
      <DashboardModule session={null} />
    </div>
  );
};

export default Dashboard;
