"use client";

import React, { useEffect, useState } from "react";
import { Property } from "../../types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PropertyGridCard from "./components/PropertyGridCard";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useGetPropertiesByUserId } from "@/hooks/property";

const Grid = () => {
  const router = useRouter();
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProperties = async ({ page = 1 }) => {
    try {
      const { properties, totalPages } = await getPropertiesByUserId({
        page,
        limit: 9,
      });
      setProperties(properties);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties({ page: 1 });
  }, []);

  const onPageChange = (page: number) => {
    fetchProperties({ page });
    setCurrentPage(page);
  };

  const handleCardClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  console.log("properties", properties);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p>No properties found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {properties.map((property: Property) => (
              <PropertyGridCard
                key={property._id}
                property={property}
                onClick={() => handleCardClick(property._id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Grid;
