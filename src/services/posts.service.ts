import { apiClient } from "@/services/api-client";
import type { Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  const { data } = await apiClient.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return data;
}
