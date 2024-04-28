import { db } from "$lib/database";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const limit = 5; // Можно изменять количество элементов на страницу
  const skip = (page - 1) * limit;

  const [contents, total] = await Promise.all([
    db.content.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        id: "desc",
      },
    }),
    db.content.count(),
  ]);

  return {
    contents,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};
