import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";
import Landlord from "@/models/Landlord";
import Compliance from "@/models/Compliance";
import Commercial from "@/models/Commercial";
import Utility from "@/models/Utility";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const validateAndTransformBooleanFields = (data: any, fields: string[]) => {
  fields.forEach((field) => {
    if (typeof data[field] === "string") {
      data[field] = data[field].toLowerCase() === "true";
    }
  });
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user._id;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const mongoSession = await mongoose.startSession();

  try {
    mongoSession.startTransaction();

    const data = await req.json();
    console.log("Incoming data:", data);
    const {
      landlords: landlordsData,
      compliance: complianceData,
      commercial: commercialData,
      utility: utilityData,
      property: propertyData,
    } = data;

    // Validate incoming data here (pseudo-code, replace with actual validation)
    if (
      !landlordsData ||
      !Array.isArray(landlordsData) ||
      landlordsData.length === 0
    ) {
      throw new Error("Invalid landlords data");
    }
    if (!complianceData || typeof complianceData !== "object") {
      throw new Error("Invalid compliance data");
    }
    if (!commercialData || typeof commercialData !== "object") {
      throw new Error("Invalid commercial data");
    }
    if (!utilityData || typeof utilityData !== "object") {
      throw new Error("Invalid utility data");
    }
    if (!propertyData || typeof propertyData !== "object") {
      throw new Error("Invalid property data");
    }

    // Transform boolean fields in complianceData
    validateAndTransformBooleanFields(complianceData, [
      "fire",
      "shops_and_establishment",
      "title_clearance",
    ]);

    // Create Landlords
    const landlords = await Promise.all(
      landlordsData.map((landlordData: any) =>
        Landlord.create([landlordData], { session: mongoSession })
      )
    );

    // Create Compliance
    const compliance = await Compliance.create([complianceData], {
      session: mongoSession,
    });

    // Create Commercial
    const commercial = await Commercial.create([commercialData], {
      session: mongoSession,
    });

    // Create Utility
    const utility = await Utility.create([utilityData], {
      session: mongoSession,
    });

    const fullProprty = {
      ...propertyData,
      user,
      landlords: landlords.map((landlord: any) => landlord[0]._id),
      compliance: compliance[0]._id,
      commercial: commercial[0]._id,
      utility: utility[0]._id,
    };

    // Create Property
    const [property] = await Property.create([fullProprty], {
      session: mongoSession,
    });
    await mongoSession.commitTransaction();
    mongoSession.endSession();

    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    await mongoSession.abortTransaction();
    mongoSession.endSession();

    console.error("Error creating property:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
