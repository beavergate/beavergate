import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Landlord from '@/models/Landlord';

// GET /api/landlords/property/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Validate property ID if necessary
    if (!id) {
      return NextResponse.json({ message: 'Property ID is required' }, { status: 400 });
    }

    // Assuming "propertyId" is the correct field to filter landlords by property
    const landlords = await Landlord.find({ propertyId: id });

    // Return an empty array if no landlords are found
    return NextResponse.json(landlords, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
