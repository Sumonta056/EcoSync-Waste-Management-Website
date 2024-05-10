import Contractor from "./contractor.jsx";
import ContractorHistory from "./history.jsx";
export default function index() {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full gap-2 mx-auto">
        <ContractorHistory />
        <Contractor />
        </div>
      </div>
    );
  }