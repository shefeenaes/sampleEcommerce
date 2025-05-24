import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

async function getCategories() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/categories`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function SubCategoryPage({ params }) {
  const { categoryId } = await Promise.resolve(params);

  const categories = await getCategories();
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return <p className="p-6 text-red-600">Category not found</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb />
      <h1 className="text-3xl font-semibold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-2/3 h-full">
        {category.subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/category/${categoryId}/${sub.id}`}
            className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-md transition duration-200 group "
          >
            {/* Fixed image container */}
            <div className="w-full h-5/6 bg-gray-100 overflow-hidden">
              <Image
                src={sub.image || `/categories/${categoryId}/${sub.id}.jpg`}
                width={400}
                height={400}
                alt={sub.name}
                className="object-cover  transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Fixed text container */}
            <div className="flex items-center justify-center p-2 text-center">
              <h2 className="text-lg font-medium text-gray-800 group-hover:text-primary">
                {sub.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}
