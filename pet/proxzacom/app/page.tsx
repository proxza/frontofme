import Hashtegs from "@/components/Hashtegs";
import Post from "@/components/Post";
import { TPost } from "./types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: "no-store" });

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Hashtegs />
      {posts && posts.length > 0 ? posts.map((post) => <Post key={post.id} id={post.id} author={post.author.name} authorEmail={post.authorEmail} date={post.createdAt} thumbnail={post.imageUrl} category={post.catName} title={post.title} content={post.content} />) : <div className="py-6">No content to display :/</div>}
    </>
  );
}
