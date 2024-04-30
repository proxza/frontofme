import { hashtegsData } from "@/data";
export default function CreatePostForm() {
  return (
    <div>
      <h2>Create Post</h2>
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Title" />
        <textarea placeholder="Content"></textarea>

        <select>
          <option value="">Select a hashtag</option>
          {hashtegsData &&
            hashtegsData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>

        <button className="primary-btn" type="submit">
          Add Post
        </button>

        <div className="p-2 text-red-500 font-bold">Error: </div>
      </form>
    </div>
  );
}
