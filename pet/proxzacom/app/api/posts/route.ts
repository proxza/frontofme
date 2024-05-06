import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content, selectedHashtag, imageUrl, publicId } = await req.json();

  const authorEmail = "joy@doy.com";

  if (!title || !content) {
    return NextResponse.json({ error: "Title and Content are required!" }, { status: 500 });
  }

  try {
    const newPost = await prisma.post.create({
      data: { title, content, imageUrl, publicId, catName: selectedHashtag, authorEmail },
    });

    console.log("Post created.");
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "Could not create post." });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Some error occured." }, { status: 500 });
  }
}
