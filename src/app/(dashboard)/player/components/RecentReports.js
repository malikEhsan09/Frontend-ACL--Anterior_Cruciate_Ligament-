import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

const RecentReports = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch rounded-t-3xl rounded-b-none bg-whitesmoke-100 flex flex-row items-start justify-between py-[1.25rem] px-[1.5rem] gap-[1.25rem] text-left text-[1.25rem] text-black font-xs-medium ${className} mq450:flex-wrap sm:flex-wrap sm:text-[1rem] sm:py-[1rem] sm:px-[1rem]`}
    >
      {/* Title Section */}
      <div className="flex flex-col items-start justify-start">
        <h3 className="m-0 relative text-inherit tracking-[-0.01em] font-semibold font-[inherit] inline-block min-w-[7.875rem] sm:text-[1rem] sm:min-w-[unset]">
          Recent MRI’s
        </h3>
        <div className="relative text-[1rem] tracking-[-0.01em] font-medium text-action-button-color inline-block min-w-[3.563rem] sm:text-[0.875rem]">
          Results
        </div>
      </div>

      {/* Sort By Section */}
      <div className="flex flex-col items-start justify-start pt-[0.5rem] text-[0.75rem] text-gray-300">
        <div className="rounded-3xs bg-text-primary-text flex flex-row items-center justify-between py-[0.625rem] pl-[0.937rem] pr-[0.75rem] gap-[0.437rem] whitespace-nowrap w-full">
          <div className="relative tracking-[-0.01em] inline-block text-black z-[1]">
            <span>{`Sort by : `}</span>
            <span className="font-semibold text-darkslategray-200">Newest</span>
          </div>
          <ChevronDown className="h-[1.125rem] w-[1.125rem] text-black z-[1]" />
        </div>
      </div>
    </div>
  );
};

RecentReports.propTypes = {
  className: PropTypes.string,
};

export default RecentReports;
