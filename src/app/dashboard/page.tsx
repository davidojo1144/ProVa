import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Dashboard",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Protected route</CardTitle>
          <CardDescription>
            Guarded by src/proxy.ts and a server-side session check.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
