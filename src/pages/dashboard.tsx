import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import useTitle from "../hooks/useTitle";

function Dashboard() {
  useTitle("Dashboard");
  return (
    <div className="bg-gray-200">
      <Header />
      <Sidebar />
      <Timeline />
    </div>
  );
}

export default Dashboard;
