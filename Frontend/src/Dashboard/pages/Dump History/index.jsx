import LandfillHistory from "./history.jsx";
export default function index() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4 mx-auto">
        <LandfillHistory />
      </div>
    </div>
  );
}
