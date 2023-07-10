import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "@/components/ui/Chat";
import Sidebar from "@/components/ui/Sidebar";
import { Poppins } from "next/font/google";
import WholeScreen from "@/components/ui/WholeScreen";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`${poppins.className}`}>
      <div className="h-screen w-screen flex">
      {/* <Sidebar />
        <Chat /> */}
      {/* <WholeScreen /> */}
      <Chat/>
      </div>
    </main>
  );
}
