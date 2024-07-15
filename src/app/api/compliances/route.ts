import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Compliance from '@/models/Compliance';

// GET /api/compliances
export async function GET() {
  try {
    await connectToDatabase();
    const compliances = await Compliance.find({});
    return NextResponse.json(compliances, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

// POST /api/compliances
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const compliance = await Compliance.create(data);
    return NextResponse.json(compliance, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
