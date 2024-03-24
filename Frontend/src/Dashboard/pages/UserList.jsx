import User from "./components/UserList";

export default function UserList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4 mx-auto">
        <User />
      </div>
    </div>
  );
}
