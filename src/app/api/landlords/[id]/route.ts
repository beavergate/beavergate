import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Landlord from '@/models/Landlord';
import mongoose from 'mongoose';

// GET /api/landlords/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const landlord = await Landlord.findById(id);
    if (!landlord) {
      return NextResponse.json({ success: false, message: 'Landlord not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: landlord });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// PUT /api/landlords/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const data = await req.json();
    const landlord = await Landlord.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!landlord) {
      return NextResponse.json({ success: false, message: 'Landlord not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: landlord });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
