"use client";

import { TCategory } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("api/hashtags");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required!");
      return;
    }

    try {
      const res = await fetch("api/posts/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorResponse = await res.json();
        setError(errorResponse.error || "Unknown error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
        <textarea onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>

        <select onChange={e => setSelectedCategory(e.target.value)} className="p-3 rounded-md border appearance-none">
          <option value="">Select a hashtag</option>
          {categories &&
            categories.map(category => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))}
        </select>

        <button className="primary-btn" type="submit">
          Add Post
        </button>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
