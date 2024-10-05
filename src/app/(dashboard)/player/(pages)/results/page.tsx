"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Results = () => {
  const dataPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [mriFiles, setMriFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        // Fetch MRI files for the logged-in player
        const mriFilesResponse = await axios.get(
          "http://localhost:8800/api/mriFile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Fetch the assessment results
        const assessmentResultsResponse = await axios.get(
          "http://localhost:8800/api/aclAssessmentResult",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const fetchedMriFiles = mriFilesResponse.data;
        const fetchedAssessmentResults = assessmentResultsResponse.data;

        console.log("Fetched MRI files:", fetchedMriFiles);
        console.log("Fetched assessment results:", fetchedAssessmentResults);

        // Merge MRI files and assessment results based on mriFileId
        const mergedData = fetchedMriFiles.map((mriFile) => {
          const assessmentResult = fetchedAssessmentResults.find(
            (result) => result.mriFileId === mriFile._id
          );
          return {
            ...mriFile,
            assessmentResult: assessmentResult || {},
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

    fetchData();
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
    "Results",
    "Format",
    "Date of Report",
    "Status",
    "View & Download Report",
  ];

  if (isLoading) {
    return <div>Loading MRI files...</div>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-start mb-3 bg-[#F4F4F2] p-2 rounded-t-lg">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Uploaded MRI</h2>
          </div>
          <p className="text-md  text-lightBlue -mt-2 ml-7">Results</p>
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
              <td className="py-3 px-6">
                {(() => {
                  const status =
                    row.assessmentResult.assessmentResult || "Pending";
                  let statusClass = "";
                  let statusColor = "";
                  let displayStatus = status; // New variable for simplified status

                  if (status === "Healthy") {
                    statusClass = "bg-green-100 text-green-800";
                    statusColor = "border-green-500";
                  } else if (
                    status === "ACL Tear" ||
                    status === "Complete ACL Tear OR Completely Ruptured"
                  ) {
                    statusClass = "bg-red-100 text-red-800";
                    statusColor = "border-red-500";
                  } else if (
                    status === "Partial ACL Tear OR Partially Injured"
                  ) {
                    statusClass = "bg-yellow-100 text-yellow-800";
                    statusColor = "border-yellow-500";
                    displayStatus = "Partially Injured"; // Simplified text
                  } else {
                    statusClass = "bg-gray-100 text-gray-800"; // Default color for pending or unknown statuses
                  }

                  return (
                    <span
                      className={`${statusClass} ${statusColor} px-2 py-1 rounded-md text-sm font-medium border whitespace-nowrap`}
                    >
                      {displayStatus}
                    </span>
                  );
                })()}
              </td>
              <td className="py-3 px-6">{row.fileType}</td>
              <td className="py-3 px-6">
                {new Date(row.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                {(() => {
                  const isAssigned = row.assessmentResult.doctorId
                    ? "Assigned"
                    : "Pending";
                  const status =
                    row.assessmentResult.assessmentResult || "Pending";
                  let statusClass = "";
                  let statusColor = "";

                  if (status === "Healthy") {
                    statusClass = "bg-green-100 text-green-800";
                    statusColor = "border-green-500";
                  } else if (
                    status === "ACL Tear" ||
                    status === "Complete ACL Tear OR Completely Ruptured"
                  ) {
                    statusClass = "bg-red-100 text-red-800";
                    statusColor = "border-red-500";
                  } else if (
                    status === "Partial ACL Tear OR Partially Injured"
                  ) {
                    statusClass = "bg-yellow-100 text-yellow-800";
                    statusColor = "border-yellow-500";
                  } else {
                    statusClass = "bg-gray-100 text-gray-800"; // Default color for pending or unknown statuses
                  }

                  return (
                    <span
                      className={`${statusClass} ${statusColor} px-2 py-1 rounded-md text-sm font-medium border whitespace-nowrap`}
                    >
                      {isAssigned === "Assigned" ? "Assigned" : "Pending"}
                    </span>
                  );
                })()}
              </td>

              <td className="py-3 px-6 flex items-center justify-end">
                {row.assessmentResult.reportPath ? (
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
