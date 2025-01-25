"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateAsset } from "@/hooks/asset"; // Hook to create asset

const CreateAsset: React.FC = () => {
  const router = useRouter();
  const [createAsset, { loading }] = useCreateAsset();
  const [formData, setFormData] = useState({
    name: "",
    asset_tag: "",
    serial_no: "",
    model_no: "",
    cost: 0,
    issued_date: "",
    return_date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAsset(formData);
      router.push("/assets"); // Redirect back to the assets list
    } catch (err) {
      console.error("Error creating asset:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="asset_tag"
          placeholder="Asset Tag"
          value={formData.asset_tag}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="serial_no"
          placeholder="Serial No"
          value={formData.serial_no}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="model_no"
          placeholder="Model No"
          value={formData.model_no}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
          required
        />
        <input
          type="date"
          name="issued_date"
          placeholder="Issued Date"
          value={formData.issued_date}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
        />
        <input
          type="date"
          name="return_date"
          placeholder="Return Date"
          value={formData.return_date}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Asset"}
        </button>
      </form>
    </div>
  );
};

export default CreateAsset;
