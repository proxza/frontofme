"use client";

import { TCategory, TPost } from "@/app/types";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostForm({ post }: { post: TPost }) {
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
      const res = await fetch("/api/hashtags");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();

    const initValues = () => {
      setTitle(post.title);
      setContent(post.content);
      setImageUrl(post.imageUrl || "");
      setPublicId(post.publicId || "");
      setSelectedCategory(post.catName || "");
    };

    initValues();
  }, [post.title, post.content, post.imageUrl, post.publicId, post.catName]);

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log("[ERROR] ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required!");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
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
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" value={title} />
        <textarea onChange={(e) => setContent(e.target.value)} placeholder="Content" value={content}></textarea>

        <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${imageUrl && "pointer-events-none"}`} onUpload={handleImageUpload}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>

          {imageUrl && <Image src={imageUrl} fill alt="img" className="absolute object-cover inset-0" />}
        </CldUploadButton>

        {publicId && (
          <button onClick={removeImage} className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4">
            Remove Image
          </button>
        )}

        <select onChange={(e) => setSelectedCategory(e.target.value)} className="p-3 rounded-md border appearance-none" value={selectedCategory}>
          <option value="">Select a hashtag</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))}
        </select>

        <button className="primary-btn" type="submit">
          SAVE
        </button>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
