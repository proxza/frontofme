import { hashtegsData } from "@/data";
import Link from "next/link";

export default function Hashtegs() {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {hashtegsData &&
        hashtegsData.map((category) => (
          <Link className="px-4 py-1 rounded-md bg-cyan-600 text-white cursor-pointer" href={`/hashtegs/${category.name}`}>
            #{category.name}
          </Link>
        ))}
    </div>
  );
}
