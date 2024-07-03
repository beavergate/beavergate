import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Compliance from '@/models/Compliance';

// GET /api/compliances
export async function GET() {
  try {
    await connectToDatabase();
    const compliances = await Compliance.find({});
    return NextResponse.json({ success: true, data: compliances });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// POST /api/compliances
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const compliance = await Compliance.create(data);
    return NextResponse.json({ success: true, data: compliance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
