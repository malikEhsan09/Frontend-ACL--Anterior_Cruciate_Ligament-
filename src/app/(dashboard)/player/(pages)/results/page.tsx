"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Results() {
  const dataPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [mriFiles, setMriFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [error, setError] = useState<string | null>(null);

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
        const mergedData = fetchedMriFiles.map(
          (mriFile: { _id: string; createdAt: string; fileType: string }) => {
            const assessmentResult = fetchedAssessmentResults.find(
              (result: { mriFileId: string }) =>
                result.mriFileId === mriFile._id
            );
            return {
              ...mriFile,
              assessmentResult: assessmentResult || {},
            };
          }
        );

        // Sort files based on the sort order
        const sortedData =
          sortOrder === "Newest"
            ? mergedData.sort(
                (a: { createdAt: string }, b: { createdAt: string }) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
            : mergedData.sort(
                (a: { createdAt: string }, b: { createdAt: string }) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              );

        setMriFiles(sortedData);
        setTotalPages(Math.ceil(sortedData.length / dataPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching MRI files and assessment results:",
          error
        );
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]);

  const currentData = mriFiles.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSortOrder(e.target.value);
  //   setCurrentPage(1);
  // };

  if (isLoading) {
    return <div>Loading MRI files...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#F4F4F2]">
        <CardTitle className="text-xl font-bold text-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-8 bg-[#152f86b2] rounded-md -mt-3 mr-2" />
            <div>
              <h2>Upload MRI</h2>
              <p className="text-sm font-semibold text-[#152f86b2]">Results</p>
            </div>
          </div>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Sort by:</span>
          <Select
            defaultValue={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Invoice ID </TableHead>
              <TableHead>Results</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Date of Report</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View & Download Report</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map(
              (
                row: {
                  _id: string;
                  assessmentResult: {
                    assessmentResult?: string;
                    doctorId?: string;
                    reportPath?: string;
                  };
                  fileType: string;
                  createdAt: string;
                },
                index: number
              ) => (
                <TableRow key={index}>
                  <TableCell>
                    {(currentPage - 1) * dataPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-blue-600">
                    {row._id}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{row.fileType}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4">
          <p className="text-sm text-gray-600">
            Showing {currentPage * dataPerPage - dataPerPage + 1} to{" "}
            {Math.min(currentPage * dataPerPage, mriFiles.length)} of{" "}
            {mriFiles.length} entries
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "secondary" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
