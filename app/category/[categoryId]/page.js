// app/[categoryId]/page.jsx

import Link from "next/link";

async function getCategories() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/categories`,
    {
      // cache: "no-store" // uncomment if you want fresh fetch on every request
    }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function SubCategoryPage({ params }) {
  const { categoryId } = params;
  const categories = await getCategories();

  // Find the category object by id
  const category = categories.find((cat) => cat.id === categoryId);
  console.log("categoryId:" + categoryId);
  if (!category) {
    return <p className="p-6 text-red-600">Category not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category.name} Subcategories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {category.subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/category/${categoryId}/${sub.id}`}
            className="p-4 border rounded-xl shadow hover:bg-gray-100 transition"
          >
            <h2 className="text-lg">{sub.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
