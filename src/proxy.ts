export { auth as proxy } from "@/lib/auth";

// Add protected route prefixes here; unmatched routes stay public.
export const config = {
  matcher: ["/dashboard/:path*"],
};
