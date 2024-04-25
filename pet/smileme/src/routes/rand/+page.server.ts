import { db } from "$lib/database";

export async function load() {
  // Получаем все ID записей
  const ids = await db.content.findMany({
    select: {
      id: true,
    },
  });

  // Если записи есть, выбираем один случайный ID
  if (ids.length > 0) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomId = ids[randomIndex].id;

    // Получаем полные данные для случайной записи
    const contents = await db.content.findMany({
      where: {
        id: randomId,
      },
    });

    return { contents };
  }

  // Если записей нет, возвращаем пустой массив
  return { contents: [] };
}
