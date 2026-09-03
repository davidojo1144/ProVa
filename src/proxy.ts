export { auth as proxy } from "@/lib/auth";

// Replace with the route prefixes you want to protect; unmatched routes stay public.
export const config = {
  matcher: ["/protected/:path*"],
};
