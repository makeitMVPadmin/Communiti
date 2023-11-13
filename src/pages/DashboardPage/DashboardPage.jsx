import "./DashboardPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import DashboardHome from "./DashboardHome/DashboardHome";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <DashboardHome />
    </div>
  );
}

export default DashboardPage;
