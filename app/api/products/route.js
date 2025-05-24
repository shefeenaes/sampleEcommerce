import { productData } from "@/data/productData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const productId = searchParams.get("productId");
  const tag = searchParams.get("tag"); // ✅ Add this line

  // Case 1: Specific product by productId
  if (productId) {
    const product = productData.find(
      (product) => product.id.toString() === productId
    );

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(product);
  }

  // Case 2: List of products based on categoryId, subCategoryId, or tag
  const filtered = productData.filter((product) => {
    const matchesCategory = categoryId
      ? product.categoryId?.toLowerCase() === categoryId.toLowerCase()
      : true;

    const matchesSubCategory = subCategoryId
      ? product.subCategoryId?.toLowerCase() === subCategoryId.toLowerCase()
      : true;

    const matchesTag = tag
      ? product.tag?.toLowerCase() === tag.toLowerCase()
      : true;

    return matchesCategory && matchesSubCategory && matchesTag;
  });

  return Response.json(filtered);
}
