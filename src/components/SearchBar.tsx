"use client";

interface SearchBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function SearchBar({ onSearch, onReset }: SearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Advocates</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-end">
        <div className="flex-1">
          <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
            Search Term
          </label>
          <input 
            id="search-input" 
            type="text"
            placeholder="Search by name, city, degree, specialties..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            onChange={onSearch}
          />
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Reset Search
        </button>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          Searching for: <span id="search-term" className="font-medium text-blue-600"></span>
        </p>
      </div>
    </div>
  );
}
