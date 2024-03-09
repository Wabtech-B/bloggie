import { auth } from "@/auth";
import AppWrapper from "@/components/app-wrapper";
import Breadcrumbs from "@/components/breadcrumbs";
import { notFound } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const dashboardRoles = ["ADMIN", "AUTHOR"];
  const user = await auth();

  if (!dashboardRoles.includes(user?.user.role as string)) notFound();

  return (
    <AppWrapper>
      <div className="w-full">
        <Sidebar />
      </div>
      <div className="p-2 lg:p-4">
        <Navbar />
        <div className="min-h-[75vh] sm:min-h-[70vh]">
          <div className="flex justify-end mb-2 -mt-4">
            <Breadcrumbs
              separator={
                <FiChevronRight className="inline-flex text-gray-400" />
              }
            />
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </AppWrapper>
  );
};

export default DashboardLayout;
