import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Property from "@/models/Property";
import Landlord from "@/models/Landlord";
import Compliance from "@/models/Compliance";
import Commercial from "@/models/Commercial";
import Utility from "@/models/Utility";
import Tag from "@/models/Tag";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user._id;

  await connectToDatabase();

  const mongoSession = await mongoose.startSession();

  try {
    mongoSession.startTransaction();

    const data = await req.json();

    const {
      landlords: landlordsData,
      compliance: complianceData,
      commercial: commercialData,
      utility: utilityData,
      tags: tagsData,
      property: propertyData,
    } = data;

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

    // Create Tags
    const tags = await Promise.all(
      tagsData.map((tagData: any) =>
        Tag.create([tagData], { session: mongoSession })
      )
    );

    // Create Property
    const property = await Property.create(
      [
        {
          ...propertyData,
          user,
          landlords: landlords.map((landlord: any) => landlord[0]._id),
          compliance: compliance[0]._id,
          commercial: commercial[0]._id,
          utility: utility[0]._id,
          tags: tags.map((tag: any) => tag[0]._id),
        },
      ],
      { session: mongoSession }
    );

    await mongoSession.commitTransaction();
    mongoSession.endSession();

    return NextResponse.json(
      { success: true, data: property },
      { status: 201 }
    );
  } catch (error: any) {
    await mongoSession.abortTransaction();
    mongoSession.endSession();

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
