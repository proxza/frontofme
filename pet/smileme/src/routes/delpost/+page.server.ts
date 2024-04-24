import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";

export const load = async ({ locals }) => {
  // redirect user if not logged in
  if (locals.user.role !== "ADMIN") {
    throw redirect(302, "/");
  }
};

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id"); // Получаем ID из формы

    if (id) {
      await db.content.delete({
        where: { id: Number(id) }, // Убедитесь, что ID преобразуется в нужный тип
      });
    }

    throw redirect(302, "/"); // Перенаправляем пользователя после удаления
  },
};
