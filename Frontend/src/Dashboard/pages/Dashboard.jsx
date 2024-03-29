import DashboardStatsGrid from "../components/DashboardStatsGrid";
import SITES from "../components/SITES";
import TransportationStatistic from "../components/TransportationStatistic";
import VehicleDistribution from "../components/VehicleDistribution";
import WasteCollectionStatistic from "../components/WasteCollectionStatistic";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row w-full gap-4">
        <WasteCollectionStatistic />
        <VehicleDistribution />
      </div>
      <div className="flex flex-row w-full gap-4">
        <TransportationStatistic />
        <SITES />
      </div>
    </div>
  );
}
