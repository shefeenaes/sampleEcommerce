// app/category/[categoryId]/[subCategoryId]/page.js

import Image from "next/image";
import Link from "next/link";

export default async function SubcategoryPage({ params }) {
  const { categoryId, subCategoryId } = params;

  async function getProducts() {
    const res = await fetch(
      `http://localhost:3000/api/products?categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Products in {categoryId} → {subCategoryId}
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition duration-300"
            >
              <div>
                <Image
                  src={product.image || "/featured/menshirt1.PNG"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={300}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
