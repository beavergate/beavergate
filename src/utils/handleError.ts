import { NextResponse } from "next/server";

const handleError = (error: any) => {
  console.error(error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};

export default handleError;
