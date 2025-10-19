import { useMemo } from "react";
import { Advocate } from "../types/advocate";
import AdvocateRow from "./AdvocateRow";

interface AdvocatesTableProps {
  advocates: Advocate[];
  loading: boolean;
  showError: boolean;
}

export default function AdvocatesTable({ advocates, loading, showError }: AdvocatesTableProps) {
  // Memoize table headers since they never change
  const tableHeaders = useMemo(() => (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          First Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Last Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          City
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Degree
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Specialties
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Years of Experience
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone Number
        </th>
      </tr>
    </thead>
  ), []);

  // Memoize advocate rows to prevent unnecessary re-renders
  const advocateRows = useMemo(() => {
    if (loading || showError || advocates.length === 0) {
      return null;
    }
    
    return advocates.map((advocate) => (
      <AdvocateRow key={advocate.id} advocate={advocate} />
    ));
  }, [advocates, loading, showError]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {tableHeaders}
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading advocates...</span>
                  </div>
                </td>
              </tr>
            )}
            {showError && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="text-red-600">
                    <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-lg font-medium">Error loading advocates</p>
                    <p className="text-sm text-gray-500 mt-1">Please try refreshing the page</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !showError && advocates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-lg font-medium">No advocates found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            )}
            {advocateRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
