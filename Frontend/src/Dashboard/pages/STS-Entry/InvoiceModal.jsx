import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  vehicleData,
  distance,
  total,
  correspondingWard,
  correspondingSite,
}) => {
  function closeModal() {
    setIsOpen(false);
  }
  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };
  const calculateActionValue = (loadedCost, unloadedCost) => {
    return unloadedCost + (3 / 5) * (loadedCost - unloadedCost);
  };
  

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4.5, 6.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };
  //console.log(items, vehicleData);
  //console.log(selectedTransfer);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="p-4" id="print">
                <h1 className="flex justify-center gap-2 p-2 text-2xl font-semibold text-gray-900 ">
                  <FaMoneyBillTrendUp size={25} /> ECOSYNC BILLING DETAILS
                </h1>
                <hr className="border-2 border-black mx-7" />
                <div className="mt-6 border-black ">
                  <div className="flex flex-col justify-between gap-1 mb-4 ">
                    <div>
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between gap-2 mb-2 border-2 border-gray-100"
                        >
                          <div className="flex gap-2">
                            <span className="p-2 bg-gray-200">Date:</span>
                            <span className="p-2">{item.currentdate}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="p-2 bg-gray-200">
                              Arrival Time:
                            </span>
                            <span className="p-2">{item.arrivaltime}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="p-2 bg-gray-200">
                              Departure Time:
                            </span>
                            <span className="p-2">{item.departuretime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-10 font-semibold border-2 border-gray-300">
                      <div className="flex gap-3">
                        <span className="p-2">STS Ward No:</span>
                        <span className="p-2">{correspondingWard}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="p-2">Landfill Site No:</span>
                        <span className="p-2">{correspondingSite}</span>
                      </div>
                    </div>
                  </div>

                  <table className="text-center">
                    <thead>
                      <tr className="text-sm text-center bg-gray-200 border-2 border-gray-400 md:text-base">
                        <th className="px-2">Vehicle</th>
                        <th className="px-2">Type</th>
                        <th className="px-2k">Capacity</th>
                        <th className="px-">Loaded Fuel Cost</th>
                        <th className="px-3">Unloaded Fuel Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-2 border-gray-400">
                          {/* <td>{item.selectedVehicle}</td> */}
                          {vehicleData.map((vehicle) => {
                            if (vehicle._id === item.vehicleregno) {
                              console.log("yes");
                              return (
                                <Fragment key={vehicle._id}>
                                  <td>{vehicle.regnumber}</td>
                                  <td>{vehicle.type}</td>
                                  <td>{vehicle.capacity}</td>
                                  <td>{vehicle.loadedfuelcost}</td>
                                  <td>{vehicle.unloadedfuelcost}</td>
                                </Fragment>
                              );
                            }
                            return null;
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex flex-col items-end m-2 space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between w-full gap-32 px-2 pt-2 border-t border-black/10"
                      >
                        <span className="flex gap-1 font-bold">
                          {" "}
                          <MdOutlinePendingActions size={20} /> Cost per kilometre:
                        </span>
                        {vehicleData.map((vehicle) => {
                          if (vehicle._id === item.vehicleregno) {
                            //console.log("bigyes");
                            const loadedCost = parseFloat(
                              vehicle.loadedfuelcost
                            );
                            const unloadedCost = parseFloat(
                              vehicle.unloadedfuelcost
                            );
                            const actionValue = calculateActionValue(
                              loadedCost,
                              unloadedCost
                            );
                            return <span key={vehicle._id}>৳{actionValue.toFixed(2)}</span>;
                          }
                          return null;
                        })}
                      </div>
                    ))}

                    {/* Display Distance */}
                    <div className="flex justify-between w-full gap-32 px-2 pt-2 border-t border-black/10">
                      <span className="flex gap-2 font-bold">
                        {" "}
                        <GiPathDistance size={20} />
                        Distance:
                      </span>
                      <span>{distance} KM</span>
                    </div>

                    {/* Display Total */}
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between w-full gap-32 px-2 pt-2 border-t border-black/10"
                      >
                        <span className="flex gap-1 font-bold">
                          {" "}
                          <RiMoneyDollarBoxFill size={20} /> Total Cost:
                        </span>
                        {vehicleData.map((vehicle) => {
                          if (vehicle._id === item.vehicleregno) {
                            //console.log("bigyes");
                            const loadedCost = parseFloat(
                              vehicle.loadedfuelcost
                            );
                            const unloadedCost = parseFloat(
                              vehicle.unloadedfuelcost
                            );
                            const actionValue = calculateActionValue(
                              loadedCost,
                              unloadedCost
                            );
                            const totalValue = (actionValue*distance).toFixed(2);
                            return <span key={vehicle._id}>৳{totalValue}</span>;
                          }
                          return null;
                        })}
                      </div>
                    ))}

                  </div>
                </div>
              </div>
              <div className="flex px-4 pb-6 space-x-2">
                <button
                  className="flex items-center justify-center w-full py-2 space-x-1 text-sm text-blue-500 border border-blue-500 rounded-md shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className="flex items-center justify-center w-full py-2 space-x-1 text-sm text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
