import Link from "next/link";
import slugify from "@/lib/utils/slugify";
import Image from "next/image";

export default function CategoryCard({ name }) {
  const slug = slugify(name);
  const imageUrl = `/categories/${slug}.jpg`;

  return (
    <div className="flex flex-col">
      <Link href={`/category/${slug}`}>
        <div className="min-w-[200px] rounded shadow hover:shadow-lg transition-transform transform hover:scale-105 p-2 text-center">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="mx-auto mb-2 rounded object-cover w-full h-64"
          />
          <p className="font-medium">{name}</p>
        </div>
      </Link>
    </div>
  );
}
