import Property from "modules/Property";
import React from "react";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  // Fetch the property data here if necessary or handle it inside the component
  const { id } = params;

  return (
    <div className="space-y-3">
      <Property id={id} />
    </div>
  );
};

export default PropertyPage;
