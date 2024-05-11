import { useEffect, useState } from "react";
import { FaLandmark } from "react-icons/fa6";

function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [stsData, setStsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/employee")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="w-[21rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex gap-2 p-2 font-medium text-gray-900">
        <FaLandmark size={20} /> Available Employees
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        {popularProducts.map((product, index) => (
          <div
            key={product._id}
            to={`/employee/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="object-cover w-full h-full rounded-sm"
                src={`https://source.unsplash.com/100x100?landfill-${index}`}
                alt={`Name: ${product.fullName}`}
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="text-sm font-medium text-gray-800">{`${product.fullName}`}</p>
              <span className="text-xs text-green-600">
                {product.jobTitle}
              </span>
            </div>
            <div className="text-xs text-rose-700 pl-1.5">
            {product.collectRoute}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default PopularProducts;
