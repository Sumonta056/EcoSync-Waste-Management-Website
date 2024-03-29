import logo from "./logo.jpg";

function index() {
  return (
    <div className="flex items-center justify-center w-full max-h-screen">
      <div className="flex flex-col items-center justify-center w-4/6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <img className="w-full mx-auto" src={logo} alt="logo" />
        <div className="flex flex-col w-full p-3 bg-slate-200">
          <h2 className="w-full text-2xl font-semibold text-center">
            Team Your Worst Nightmare
          </h2>
          <span className="w-full mt-2 text-center">
            Software Engineering , SUST
          </span>
        </div>
      </div>
    </div>
  );
}

export default index;
