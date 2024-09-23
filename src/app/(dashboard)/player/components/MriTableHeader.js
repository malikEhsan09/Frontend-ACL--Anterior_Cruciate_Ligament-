import PropTypes from "prop-types";

const MriTableHeader = ({ className = "" }) => {
  return (
    <div
      className={`w-full flex items-center justify-between py-2 px-[0.937rem] box-border max-w-full text-left text-[0.875rem] text-gray-400 font-xs-medium ${className}`}
    >
      <div className="w-[15%] min-w-[100px]">Invoice ID</div>
      <div className="w-[30%] min-w-[150px]">File Name</div>
      <div className="w-[10%] min-w-[80px]">Format</div>
      <div className="w-[15%] min-w-[120px]">Date of Report</div>
      <div className="w-[10%] min-w-[100px]">Status</div>
      <div className="w-[10%] min-w-[100px]">PDF Report</div>
    </div>
  );
};

MriTableHeader.propTypes = {
  className: PropTypes.string,
};

export default MriTableHeader;
