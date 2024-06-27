import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "@/services/userService";
import handleError from "@/utils/handleError";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const user = await createUser(userData);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const user = await getUserById(userId);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const updateData = await req.json();
    const user = await updateUser(userId, updateData);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    await deleteUser(userId);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}
