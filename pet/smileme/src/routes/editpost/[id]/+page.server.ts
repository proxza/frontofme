import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/database";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { id } = params;
    const post = await db.content.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      return {
        status: 404,
        error: "Post not found",
      };
    }
    return { post };
  } catch (err) {
    console.error("Failed to load post:", err);
    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const title = formData.get("title") as string;
      const typeContent = parseInt(formData.get("typeContent") as string);
      const content = formData.get("content") as string;
      const { id } = params;

      await db.content.update({
        where: { id: parseInt(id) },
        data: { title, typeContent, content },
      });

      return {
        status: 303,
        headers: {
          Location: "/",
        },
      };
    } catch (err) {
      console.error("Failed to update post:", err);
      return {
        status: 500,
        error: "Failed to process the form",
      };
    }
  },
};
