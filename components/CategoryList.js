import CategoryCard from "@/components/CategoryCard";

export default async function CategoryList() {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  const categories = await res.json();
  console.log("categories");
  console.dir(categories);
  return (
    <div className="flex overflow-x-auto gap-4 p-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} name={category.name} />
      ))}
    </div>
  );
}
