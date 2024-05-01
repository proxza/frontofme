import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface PostProps {
  id: string;
  author: string;
  date: string;
  thumbnail?: string;
  authorEmail?: string;
  title: string;
  content: string;
  category?: string;
}
export default function Post({ id, author, date, thumbnail, authorEmail, title, content, category }: PostProps) {
  const isEditable = true;
  return (
    <div className="my-4 border-b border-b-300 py-8">
      <h2>{title}</h2>
      <div className="mb-4">
        Posted by:{" "}
        <span className="font-bold">
          {author} on {date}
        </span>
      </div>

      {thumbnail && (
        <div className="w-full h-72 relative">
          <Image src={thumbnail} alt={title} fill className="object-cover rounded-md object-center" />
        </div>
      )}

      <p className="content">{content}</p>

      {category && (
        <Link className="bg-cyan-600 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block" href={`hashtegs/${category}`}>
          #{category}
        </Link>
      )}

      {isEditable && (
        <div className="flex gap-3 font-bold mt-4 py-2 px-4 rounded-md bg-slate-200 w-fit">
          <Link href={`/edit/${id}`}>Edit</Link>
          <DeleteButton />
        </div>
      )}
    </div>
  );
}
