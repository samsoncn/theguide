// pages/dashboard.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  return <div>Welcome to the dashboard!</div>;
};

export default DashboardPage;
