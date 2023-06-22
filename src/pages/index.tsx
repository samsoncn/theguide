import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1>hi</h1>
        <div className="">
          <Chat />
        </div>
      </div>
    </main>
  );
}
