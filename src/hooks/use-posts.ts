import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/services/posts.service";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
