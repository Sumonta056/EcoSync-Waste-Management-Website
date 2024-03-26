import logo from "./logo.png";
import { useState, useEffect } from 'react';

function index() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="text-center">
      <img className="mx-auto w-50" src={logo} alt="logo" />
      <h2 className="pb-1 mt-10 mb-12 text-4xl font-semibold">
        You don&apos;t have access to this service !!
      </h2>
    </div>
  );
}

export default index;
