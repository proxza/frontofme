import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const hashtags = await prisma.category.findMany();
    return NextResponse.json(hashtags);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong!");
  }
}
