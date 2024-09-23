import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Mris = ({
  className = "",
  data,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div
      className={`w-full flex flex-col items-start justify-start py-[0rem] px-[0.937rem] box-border text-left text-[0.875rem] text-mediumslateblue font-xs-medium ${className}`}
    >
      {data.map((report, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between py-2 border-b border-gray-200"
        >
          {/* Checkbox and Invoice ID */}
          <div className="flex items-center w-[15%] min-w-[100px]">
            <input className="m-0 h-[1.313rem] w-[1.25rem]" type="checkbox" />
            <div className="ml-2 text-blue-500 cursor-pointer">{report.id}</div>
          </div>

          {/* File Name */}
          <div className="w-[30%] min-w-[150px] text-left">
            {report.fileName}
          </div>

          {/* Format */}
          <div className="w-[10%] min-w-[80px] text-left">{report.format}</div>

          {/* Date of Report */}
          <div className="w-[15%] min-w-[120px] text-left">{report.date}</div>

          {/* Status */}
          <div className="w-[10%] min-w-[100px] text-left">
            <span
              className={`inline-block px-2 py-1 rounded ${
                report.status === "Complete"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {report.status}
            </span>
          </div>

          {/* Download Button */}
          <div className="w-[10%] min-w-[100px] text-left text-blue-500 cursor-pointer">
            Download
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 0}
          className="disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="mx-4">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className="disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

Mris.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
};

export default Mris;
