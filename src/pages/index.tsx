import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "@/components/ui/Chat";
import Sidebar from "@/components/ui/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
          <Chat />
          <Sidebar />
      </div>
    </main>
  );
}
