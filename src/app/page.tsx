import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";
import "../../node_modules/daisyui/dist/full.css";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row bg-slate-200">
        <div className="w-full md:w-3/5 relative flex justify-center items-center h-64 sm:h-96 md:h-screen">
          <Image
            src="/studyingChart.jpg"
            alt="Descrição da imagem"
            className="object-cover"
            layout="fill"
            priority
          />
        </div>

        <div className="w-full sm:w-4/5 md:w-2/5 flex justify-center items-center px-5 py-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
