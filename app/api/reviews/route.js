import { reviewData } from "@/data/reviewData";
export async function GET(request) {
  return Response.json(reviewData);
}
