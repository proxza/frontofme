import { db } from "$lib/database";

export async function load() {
  const contents = await db.content.findMany();
  //console.log(contents);
  return {
    contents,
  };
}
