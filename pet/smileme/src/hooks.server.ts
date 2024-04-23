import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/database";

export const handle: Handle = async ({ event, resolve }) => {
  // get cookie
  const session = event.cookies.get("session");

  if (!session) {
    return await resolve(event);
  }

  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  });

  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.name,
    };
  }

  // load page as normal
  return await resolve(event);
};
