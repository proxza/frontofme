import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TPost } from "@/app/types";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function EditPost({ params }: { params: { id: string } }) {
  // Route protection
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/sign-in");
  }

  const id = params.id;
  console.log("[DEBUG] Post ID: ", id);
  return <EditPostForm />;
}
