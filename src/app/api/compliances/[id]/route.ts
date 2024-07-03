import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Compliance from '@/models/Compliance';
import mongoose from 'mongoose';

// GET /api/compliances/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const compliance = await Compliance.findById(id);
    if (!compliance) {
      return NextResponse.json({ success: false, message: 'Compliance not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: compliance });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// PUT /api/compliances/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const data = await req.json();
    const compliance = await Compliance.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!compliance) {
      return NextResponse.json({ success: false, message: 'Compliance not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: compliance });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
