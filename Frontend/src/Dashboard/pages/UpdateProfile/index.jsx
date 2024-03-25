import Vehicle from "./profile.jsx";
import History from "./update.jsx";

export default function Index() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4">
        <History />
        <Vehicle />
      </div>
    </div>
  );
}