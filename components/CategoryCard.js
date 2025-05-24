import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ name }) {
  const slugify = (value) => {
    const str = String(value || ""); // Ensure it's a string, fallback to empty string
    return str
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  console.log(" name: " + name);
  const slug = slugify(name);

  const imageUrl = `/images/categories/${slug}.jpg`; // Image names must match this slug format

  return (
    <Link href={`/category/${slug}`}>
      <div className="min-w-[150px] bg-white rounded shadow hover:shadow-lg transition p-2 text-center">
        <Image
          src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d808becbf7162555033_peep-102.svg"
          alt={name}
          width={100}
          height={100}
          className="mx-auto mb-2 rounded object-cover"
        />
        <p className="font-medium">{name}</p>
      </div>
    </Link>
  );
}
