import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Chart from "@/components/Chart/Chart";
import Header from "@/components/Header/Header";

export default async function Quote() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    redirect("/");
  }

  return (
    <main className="h-screen flex flex-col">
      <Header />
      <Chart />
    </main>
  );
}
