import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/database";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const actions = {
  newpost: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const typeContent = parseInt(data.get("typeContent"));
    const content = !data.get("content") ? "null" : data.get("content");
    const file = data.get("file");
    console.log(file);
    const mode = 0;
    const rating = 0;
    const extension = !file.name ? "null" : file.name.split(".").pop();

    if (typeof title !== "string" || typeof content !== "string" || !title || !content) {
      return fail(400, { invalid: true });
    }

    const newPost = await db.content.create({
      data: {
        title,
        typeContent,
        content,
        date: new Date().toISOString(),
        author: "admin",
        mode,
        rating,
        extension,
      },
    });

    if (file instanceof File && file.size > 0) {
      const uploadDir = "static/data";
      fs.mkdirSync(uploadDir, { recursive: true });

      // Получаем расширение файла из его имени
      //const extension = file.name.split(".").pop();
      const filePath = path.join(uploadDir, `${newPost.id}.${extension}`);
      const writable = fs.createWriteStream(filePath);

      try {
        await pipeline(file.stream(), writable);
      } catch (error) {
        console.error("Failed to write file", error);
        // Обработка ошибки записи файла
      }
    }

    throw redirect(303, "/");
  },
};
