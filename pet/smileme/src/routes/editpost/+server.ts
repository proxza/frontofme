import type { RequestHandler } from "./$types";
import { db } from "$lib/database";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const { id, title, content } = data;
  await db.content.update({
    where: { id: parseInt(id, 10) },
    data: { title, content },
  });
  return new Response(null, { status: 204 });
};
