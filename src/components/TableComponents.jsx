"use client";
import React from "react";
import Badge from "./ui/Badge";
import { Icon } from "@iconify/react";

const TableComponent = ({ title, columns = [], data = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full overflow-x-auto">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      <table className="min-w-full border-collapse">
        <thead >
          <tr className="bg-indigo-50 text-gray-700 text-sm md:text-base">
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-medium border-b border-gray-200"
              >
                <div className="flex items-center gap-2">
                  {col.icon && (
                    <Icon
                      icon={col.icon}
                      className="text-gray-500 text-sm md:text-base"
                    />
                  )}
                  <span>{col.label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {columns.map((col, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-sm md:text-base text-gray-700 border-b border-gray-100"
                  >
                    {col.label === "Status" ? (
                      <Badge status={row[col.label]} />
                    ) : (
                      row[col.label] ?? "-"
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-6"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
