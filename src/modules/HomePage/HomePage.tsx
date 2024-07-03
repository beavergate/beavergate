"use client";

import DatePickerWithRange from "@/components/DatePickerWithRange";
import React from "react";
import PropertyRevenueOverviewCard from "./components/PropertyRevenueOverviewCard";
import PropertyCard from "./components/PropertyCard";
import Last30DaysOverviewCard from "./components/Last30DaysOverviewCard";
import SubHeader from "@/components/SubHeader";

const HomePage = () => {
  return (
    <>
      <SubHeader />

      <div className="container max-w-[1600px] mt-10">
        <div className="flex justify-between items-center">
          <div>
            <h2>Dashboard</h2>
            <h6 className="text-[#5D7196]">
              Welcome to #1 Property Managment Platform
            </h6>
          </div>
          <div>
            <DatePickerWithRange className="rounded-md shadow" />
          </div>
        </div>
        <div className="grid grid-cols-[70%_auto] mt-10">
          <PropertyRevenueOverviewCard />
          <div className="w-full pl-4 flex flex-col justify-between gap-4">
            <PropertyCard />
            <Last30DaysOverviewCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
