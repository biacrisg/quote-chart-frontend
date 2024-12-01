"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/");
  };

  return (
    <header className="bg-white shadow-md p-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-500">
          Histórico de cotações
        </h1>

        <nav className="flex gap-4">
          <Link href="/quote" className="text-blue-500 hover:underline">
            Início
          </Link>
          <button
            onClick={handleLogout}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
