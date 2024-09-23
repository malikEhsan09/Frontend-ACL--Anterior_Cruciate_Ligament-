"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Results = () => {
  const dataPerPage = 7; // Limit to 7 entries per page
  const [currentPage, setCurrentPage] = useState(1);
  const [mriFiles, setMriFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Newest");

  useEffect(() => {
    const fetchMriFilesAndAssessmentResults = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        // Fetch MRI files
        const mriFilesResponse = await axios.get(
          "http://localhost:8800/api/mriFile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const fetchedMriFiles = mriFilesResponse.data;

        // Fetch assessment results
        const assessmentResultsResponse = await axios.get(
          "http://localhost:8800/api/aclAssessmentResult",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const assessmentResults = assessmentResultsResponse.data;

        // Merge MRI files with their corresponding assessment results
        const mergedData = fetchedMriFiles.map((file) => {
          const assessment = assessmentResults.find(
            (result) => result.mriFileId === file._id
          );
          return {
            ...file,
            assessmentResult: assessment || null, // Add the assessment result if available
          };
        });

        // Sort files based on the sort order
        const sortedData =
          sortOrder === "Newest"
            ? mergedData.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              )
            : mergedData.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );

        setMriFiles(sortedData);
        setTotalPages(Math.ceil(sortedData.length / dataPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching MRI files and assessment results:",
          error
        );
        setIsLoading(false);
      }
    };

    fetchMriFilesAndAssessmentResults();
  }, [sortOrder]);

  const currentData = mriFiles.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const headers = [
    "Invoice ID",
    "File Name",
    "Format",
    "Date of Report",
    "Status",
    "View & Download Report",
  ];

  if (isLoading) {
    return <div>Loading MRI files...</div>;
  }

  return (
    <div className="p-2 ">
      <div className="flex justify-between items-start mb-3 bg-[#F4F4F2] p-2 rounded-t-lg">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Uploaded MRI</h2>
          </div>
          <p className="text-sm text-gray-500 -mt-2 ml-7">Results</p>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-600 mr-2">
            Sort by:
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left">
              <input type="checkbox" />
            </th>
            {headers.map((header) => (
              <th
                key={header}
                className="py-3 px-6 text-left font-medium text-gray-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentData.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-6">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-6 text-blue-600 font-bold">{row._id}</td>
              <td className="py-3 px-6">{row.fileName || "MRI Report"}</td>
              <td className="py-3 px-6">{row.fileType}</td>
              <td className="py-3 px-6">
                {new Date(row.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                  {row.status || "Pending"}
                </span>
              </td>
              <td className="py-3 px-6 flex items-center justify-end">
                {row.assessmentResult?.reportPath ? (
                  <a
                    href={`http://localhost:8800/api/mriFile${row.assessmentResult.reportPath}`}
                    className="text-blue-600 bg-gray-200 p-2 rounded-md whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    View & Download
                  </a>
                ) : (
                  <span>No Report Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600 items-center ml-2">
          Showing {currentPage * dataPerPage - dataPerPage + 1} to{" "}
          {Math.min(currentPage * dataPerPage, mriFiles.length)} of{" "}
          {mriFiles.length} entries
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
    </div>
  );
};

export default Results;
