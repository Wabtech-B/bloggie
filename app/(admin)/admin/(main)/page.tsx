import { getDashboardStats } from "@/actions/dashboard-stats";
import { FcBriefcase, FcLineChart, FcManager, FcNews } from "react-icons/fc";
import StatsCard from "./_components/stats-card";
import { auth } from "@/auth";

const Overview = async () => {
  const { numberOfUsers, numberOfPosts, numberOfComments, numberOfViews } =
    await getDashboardStats();
  const session = await auth();

  const userRole = session?.user.role;

  return (
    <div>
      {/* Card Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Posts */}
        <StatsCard title="posts" icon={<FcNews />} value={numberOfPosts} />
        {/* Comments */}
        <StatsCard
          title="comments"
          icon={<FcBriefcase />}
          value={numberOfComments}
        />
        {/* Views */}
        <StatsCard
          title="views"
          icon={<FcLineChart />}
          value={numberOfViews!}
        />
        {/* Users */}
        {userRole === "ADMIN" && (
          <StatsCard title="users" icon={<FcManager />} value={numberOfUsers} />
        )}
      </div>
    </div>
  );
};

export default Overview;
