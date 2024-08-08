"use client";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 md:w-1/3">
      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
        GM
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">Geetansh Marodia</h3>
        <p>Senior Associate, Business</p>
        <p>Finance</p>
        <p className="font-semibold">Finance</p>
        <p className="text-gray-500">UN10359</p>
        <p className="text-blue-500">geetansh.marodia@unacademy.com</p>
      </div>
    </div>
  );
};

export default ProfileCard;
