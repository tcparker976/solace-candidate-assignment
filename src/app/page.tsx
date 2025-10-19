"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Advocate } from "../types/advocate";
import SearchBar from "../components/SearchBar";
import AdvocatesTable from "../components/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("fetching advocates...");
    setShowError(false);
    setLoading(true);
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Error fetching advocates:", error);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

<<<<<<< HEAD
  // Memoized filtered advocates - only recalculates when advocates or searchTerm changes
=======
>>>>>>> 654950cc8dd845d021a0674694533c9fd8c019a8
  const filteredAdvocates = useMemo(() => {
    if (!searchTerm.trim()) {
      return advocates;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return advocates.filter((advocate) => {
<<<<<<< HEAD
      console.log('cHECK HERE!!', `${advocate.yearsOfExperience.toString().includes(searchTerm)} years`);
=======
>>>>>>> 654950cc8dd845d021a0674694533c9fd8c019a8
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some(specialty => 
          specialty.toLowerCase().includes(lowerSearchTerm)
        ) ||
        `${advocate.yearsOfExperience.toString()} years`.includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm) ||
        `${advocate.firstName} ${advocate.lastName}`.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [advocates, searchTerm]);

<<<<<<< HEAD
  // Memoized event handlers to prevent unnecessary re-renders
=======
>>>>>>> 654950cc8dd845d021a0674694533c9fd8c019a8
  const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = newSearchTerm;
    }
  }, []);

  const onClickReset = useCallback(() => {
    setSearchTerm("");
    
    const searchInputElement: HTMLInputElement | null = document.getElementById("search-input") as HTMLInputElement;
    if (searchInputElement?.value) {
      searchInputElement.value = '';
    }
    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = '';
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Solace Advocates</h1>
        
        <SearchBar onSearch={onChangeSearch} onReset={onClickReset} />
        
        <AdvocatesTable 
          advocates={filteredAdvocates}
          loading={loading}
          showError={showError}
        />
      </div>
    </main>
  );
}
