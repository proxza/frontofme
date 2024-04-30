import Hashtegs from "@/components/Hashtegs";
import Post from "@/components/Post";
import { postsData } from "@/data";

export default function Home() {
  return (
    <>
      <Hashtegs />
      {postsData && postsData.length > 0 ? postsData.map((post) => <Post key={post.id} id={post.id} author={post.author} authorEmail={"test@test.com"} date={post.datepublished} thumbnail={post.thumbnail} category={post.category} title={post.title} content={post.content} />) : <div className="py-6">No content to display :/</div>}
    </>
  );
}
