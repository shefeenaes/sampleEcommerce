import CategoryCard from "@/components/CategoryCard";
import Breadcrumb from "./Breadcrumb";

export default async function CategoryList() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/categories`,
    {
      cache: "no-store",
    }
  );

  const categories = await res.json();

  return (
    <div className="flex flex-col">
      <Breadcrumb />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full max-w-6xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.id} name={category.name} />
        ))}
      </div>
    </div>
  );
}
