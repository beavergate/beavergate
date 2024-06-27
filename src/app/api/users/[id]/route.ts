import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "@/services/userService";
import handleError from "@/utils/handleError";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserById(params.id);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await req.json();
    const user = await updateUser(params.id, updateData);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteUser(params.id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}
