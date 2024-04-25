import { db } from "$lib/database";
import type { Actions } from "./$types";

export const actions: Actions = {
  editpost: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const typeContent = formData.get("typeContent");
    const content = formData.get("content");

    // Обновляем содержимое в базе данных
    await db.content.update({
      where: { id: Number(id) },
      data: {
        title,
        typeContent: Number(typeContent),
        content,
      },
    });

    // Редиректим пользователя обратно на страницу после обновления
    throw redirect(303, "/");
  },
};

export async function load() {
  const contents = await db.content.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return {
    contents,
  };
}
