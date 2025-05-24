export async function POST(request) {
  try {
    const body = await request.json();
    return new Response(
      JSON.stringify({ message: "Cart updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Cart API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to update cart" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
