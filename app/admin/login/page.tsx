import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const AdminLogin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7EBE7] px-6 py-12">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-extrabold tracking-tight text-black">
            PHOENIX SALON
          </span>
          <span className="text-sm font-light text-[#423F3F]">Admin</span>
        </Link>

        <h1 className="mt-6 text-xl font-bold text-black">Sign in</h1>
        <p className="mb-6 mt-1 text-sm font-light text-[#6B6560]">
          Manage your products and images.
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
