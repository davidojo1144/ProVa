"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePosts } from "@/hooks/use-posts";

export function PostsDemo() {
  const { data, isLoading, isError } = usePosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>TanStack Query + Axios</CardTitle>
        <CardDescription>
          Server state via the centralized API client.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Loading posts…</p>
        )}
        {isError && (
          <p className="text-destructive text-sm">Failed to load posts.</p>
        )}
        {data?.map((post) => (
          <p key={post.id} className="truncate text-sm">
            {post.title}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
