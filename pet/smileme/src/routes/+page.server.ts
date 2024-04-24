import { db } from "$lib/database";

export async function load() {
  const contents = await db.content.findMany({
    orderBy: {
      id: "desc", // Используйте 'desc' для сортировки по убыванию
    },
  });
  //console.log(contents);
  return {
    contents,
  };
}
