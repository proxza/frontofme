"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (res.ok) {
          console.log("[DEBUG] Post deleted.");
          router.refresh(); // Reload our page
        }
      } catch (error) {
        console.log("[ERROR] ", error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
