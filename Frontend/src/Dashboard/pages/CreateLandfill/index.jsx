import Landfill from "./landfill.jsx";
import LandfillHistory from "./history.jsx";
export default function index() {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full gap-2 mx-auto">
        <LandfillHistory />
        <Landfill />
        </div>
      </div>
    );
  }