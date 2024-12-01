import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => (
  <div className="flex justify-between items-center mt-4">
    <p className="text-sm text-gray-600 items-center ml-2">
      Showing {currentPage} of {totalPages} entries
    </p>
    <div className="flex space-x-2 items-center">
      <button
        className="px-3 py-2 text-gray-600 bg-gray-100 rounded-md"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <button
          key={pageIndex + 1}
          className={`px-3 py-2 text-gray-600 bg-gray-100 rounded-md ${
            currentPage === pageIndex + 1 ? "bg-gray-300" : ""
          }`}
          onClick={() => handlePageChange(pageIndex + 1)}
        >
          {pageIndex + 1}
        </button>
      ))}
      <button
        className="px-3 py-2 text-gray-600 bg-gray-100 rounded-md"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default Pagination;
