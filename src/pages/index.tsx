import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "@/components/ui/Chat";
import Sidebar from "@/components/ui/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <div className="h-screen w-screen flex">
        <Sidebar />
        <Chat />
      </div>
    </main>
  );
}
