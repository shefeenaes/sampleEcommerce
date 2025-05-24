import { categoryData } from "@/data/categoryData";
export async function GET() {
  return Response.json(categoryData);
}
