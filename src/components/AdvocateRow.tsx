import { useMemo } from "react";
import { Advocate } from "../types/advocate";

interface AdvocateRowProps {
  advocate: Advocate;
}

export default function AdvocateRow({ advocate }: AdvocateRowProps) {
  // Memoize specialty badges since they don't change often
  const specialtyBadges = useMemo(() => (
    <div className="flex flex-wrap gap-1">
      {advocate.specialties.map((s) => (
        <span 
          key={`${advocate.id}-${s}`}
          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
        >
          {s}
        </span>
      ))}
    </div>
  ), [advocate.specialties, advocate.id]);

  return (
    <tr key={advocate.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {advocate.firstName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {advocate.degree}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {specialtyBadges}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.yearsOfExperience} years
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.phoneNumber}
      </td>
    </tr>
  );
}
