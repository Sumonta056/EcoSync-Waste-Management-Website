import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  transportData,
  onClose,
  onAddNextInvoice,
  associatedVehicleNo,
  associatedCompanyName,
  associatedWastePerDay,
  associatedWastePayment,
}) => {
  
  function closeModal() {
    setIsOpen(false);
  }
  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
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
          pdf.save(`invoice-Bill.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };
  console.log("c", transportData);
  //console.log("d"selectedContractor);
  
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
            <div className="inline-block my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="p-4" id="print">
                <h1 className="flex justify-center gap-2 p-2 text-2xl font-semibold text-gray-900 ">
                  <FaMoneyBillTrendUp size={25} /> ECOSYNC BILLING DETAILS
                </h1>
                <hr className="border-2 border-black mx-7" />
                <div className="mt-6 border-black">
                {transportData && (
                    <div className="flex flex-col justify-between gap-1 mb-4">
                      <div className="flex justify-between gap-2 mb-2 border-2 border-gray-100">
                        <div className="flex gap-2">
                          <span className="p-2 bg-gray-200">Collection Date:</span>
                          <span className="p-2">{transportData.collectiondate}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="p-2 bg-gray-200">Collection Time:</span>
                          <span className="p-2">{transportData.collectiontime}</span>
                        </div>
                        <div className="flex gap-2">
                    <span className="p-2 bg-gray-200">Contractor:</span>
                    <span className="p-2">{associatedCompanyName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="p-2 bg-gray-200">Waste Per Day (Wr):</span>
                    <span className="p-2">{associatedWastePerDay}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="p-2 bg-gray-200">Payment Per Ton:</span>
                    <span className="p-2">{associatedWastePayment}</span>
                  </div>
                        <div className="flex gap-2">
                          <span className="p-2 bg-gray-200">Waste Volume (Wc):</span>
                          <span className="p-2">{transportData.wasteamount}</span>
                        </div>
                        <div className="flex gap-2">
                        <span className="p-2 bg-gray-200">Vehicle Reg No:</span>
                        <span className="p-2">{associatedVehicleNo}</span> 
                      </div>
                        <div className="flex gap-2">
                          <span className="p-2 bg-gray-200">Waste Type:</span>
                          <span className="p-2">{transportData.wastetype}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="p-2 bg-gray-200">Ward No:</span>
                          <span className="p-2">{transportData.wardno}</span>
                        </div>
                        <div className="flex gap-2">
                        <span className="p-2 bg-gray-200">Basic Pay:</span>
                        <span className="p-2">
                          {/* Calculate basic pay (Wc * payment per ton) */}
                          {parseFloat(transportData.wasteamount) * parseFloat(associatedWastePayment)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                      <span className="p-2 bg-gray-200">Deficit:</span>
                      <span className="p-2">
                        {/* Calculate deficit (max(0, Wr - Wc)) */}
                        {Math.max(0, parseFloat(associatedWastePerDay) - parseFloat(transportData.wasteamount))}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="p-2 bg-gray-200">F:</span>
                      <span className="p-2">
                        500 tk
                      </span>
                    </div>
                    <div className="flex gap-2">
                    <span className="p-2 bg-gray-200">Fine:</span>
                    <span className="p-2">
                      {/* Calculate fine (deficit * 500) */}
                      {Math.max(0, parseFloat(associatedWastePerDay) - parseFloat(transportData.wasteamount)) * 500}
                    </span>
                  </div>
                  <div className="flex gap-2">
                  <span className="p-2 bg-gray-200">Total Bill:</span>
                  <span className="p-2">
                    {/* Calculate total bill (Basic Pay - Fine) */}
                    {parseFloat(transportData.wasteamount) * parseFloat(associatedWastePayment) - (Math.max(0, parseFloat(associatedWastePerDay) - parseFloat(transportData.wasteamount)) * 500)}
                  </span>
                </div>
                      </div>
                    </div>
                  )}
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
