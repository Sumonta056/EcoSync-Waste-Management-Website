import ContractorDashboardStatsGrid from "../components/ContractorDashboardStatsGrid";
import ContractorSITES from "../components/ContractorSITES";
import ContractorTransportationStatistic from "../components/ContractorTransportationStatistic";
import ContractorVehicleDistribution from "../components/ContractorVehicleDistribution";
import ContractorWasteCollectionStatistic from "../components/ContractorWasteCollectionStatistic";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <ContractorDashboardStatsGrid />
      <div className="flex flex-row w-full gap-4">
        <ContractorWasteCollectionStatistic />
        <ContractorVehicleDistribution />
      </div>
      <div className="flex flex-row w-full gap-4">
        <ContractorTransportationStatistic />
        <ContractorSITES />
      </div>
    </div>
  );
}
