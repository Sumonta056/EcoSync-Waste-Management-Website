import { useEffect, useState } from "react";
import { FaLandmark } from "react-icons/fa6";

function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [stsData, setStsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/landfill")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/sts")
      .then((response) => response.json())
      .then((data) => setStsData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="w-[21rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex gap-2 p-2 font-medium text-gray-900">
        <FaLandmark size={20} /> Available STS-Landfill Sites
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        {popularProducts.map((product, index) => (
          <div
            key={product._id}
            to={`/landfill/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="object-cover w-full h-full rounded-sm"
                src={`https://source.unsplash.com/100x100?landfill-${index}`}
                alt={`Landfill No: ${product.siteno}`}
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="text-sm font-medium text-gray-800">{`Landfill No: ${product.siteno}`}</p>
              <span className="text-xs text-green-600">
                {product.gpscoords}
              </span>
            </div>
            <div className="text-xs text-rose-700 pl-1.5">
            Capacity: {product.capacity} Ton
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-4">
        {stsData.map((sts, index) => (
          <div
            key={sts._id}
            to={`/sts/${sts._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="object-cover w-full h-full rounded-sm"
                src={`https://source.unsplash.com/100x100?ward-${index}`}
                alt={`STS No: ${sts.wardno}`}
              />
            </div>
            <div className="flex-1 ml-4">
            <p className="text-sm font-medium text-gray-800">{`Ward No: ${sts.wardno}`}</p>
          <span className="text-xs text-green-600">{sts.gpscoords}</span>

            </div>
            <div className="text-xs text-rose-700 pl-1.5">
            Capacity: {sts.capacity} Ton
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
