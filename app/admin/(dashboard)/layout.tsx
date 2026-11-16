import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { logout } from "../actions";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F7F5F4]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tight text-black">
              PHOENIX SALON
            </span>
            <span className="text-sm font-light text-[#6B6560]">admin</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#423F3F] transition-colors hover:bg-black/5"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#423F3F] transition-colors hover:bg-black/5"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
