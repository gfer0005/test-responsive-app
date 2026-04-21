import React, { useState, useMemo } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
  scrollable?: boolean;
  maxHeight?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  onRowClick,
  scrollable = false,
  maxHeight = "500px",
}: Readonly<TableProps<T>>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortKey(null);
      } else setSortDirection("asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;

      const compareResult = aVal > bVal ? 1 : -1;
      return sortDirection === "asc" ? compareResult : -compareResult;
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPaginationBlocks = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="w-8 h-8 flex items-center justify-center text-sm rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="dots1"
            className="w-8 h-8 flex items-center justify-center text-sm text-slate-700"
          >
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors ${
            currentPage === i
              ? "border border-[#e81e62] text-[#e81e62] bg-[#fdf2f6] font-medium"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="dots2"
            className="w-8 h-8 flex items-center justify-center text-sm text-slate-700"
          >
            ...
          </span>,
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="w-8 h-8 flex items-center justify-center text-sm rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-md backdrop-blur-2xl flex flex-col font-sans transition-all overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        className={`w-full flex-1 hide-scrollbar ${scrollable ? "overflow-y-auto overflow-x-auto" : "overflow-x-auto"}`}
        style={{
          maxHeight: scrollable ? maxHeight : "auto",
          overflowX: "auto",
        }}
      >
        <table
          className="w-full text-left border-collapse table-auto wrap-break-word"
          style={{ fontFamily: "Belfius21, sans-serif" }}
        >
          <thead className="sticky top-0 bg-[#c30045] z-10 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`py-2 px-2 text-xs leading-tight lg:py-3 lg:px-4 lg:text-sm font-semibold text-white tracking-wide ${
                    col.sortable
                      ? "cursor-pointer hover:bg-[#a00038] transition-colors select-none group"
                      : ""
                  } ${col.headerClassName || ""}`}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    {col.title}
                    {col.sortable && (
                      <span className="flex items-center text-white shrink-0">
                        {sortKey === col.key ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="text-white w-3 h-3 lg:w-4 lg:h-4" />
                          ) : (
                            <ArrowDown className="text-white w-3 h-3 lg:w-4 lg:h-4" />
                          )
                        ) : (
                          <ArrowDown className="text-white w-3 h-3 lg:w-4 lg:h-4 opacity-80 group-hover:opacity-100 group-hover:text-slate-300 transition-all" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`h-[72px] transition-colors ${onRowClick ? "cursor-pointer hover:bg-gray-200 active:bg-slate-200/50" : "hover:bg-slate-50/50"}`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`h-[72px] py-2 px-2 text-[11px] font-semibold leading-[14px] lg:px-4 lg:text-sm lg:leading-normal text-slate-700 wrap-break-word whitespace-normal align-middle ${col.cellClassName || ""}`}
                      onClick={(e: React.MouseEvent) => {
                        if (col.key === "actions" || col.key === "comments") {
                          e.stopPropagation();
                        }
                      }}
                    >
                      <div className="line-clamp-3 overflow-hidden text-ellipsis">
                        {col.render ? col.render(row) : row[col.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-4 px-5 text-center text-slate-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            {renderPaginationBlocks()}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="text-sm text-slate-800">
          {startIndex} - {endIndex} of {totalItems}
        </div>
      </div>
    </div>
  );
}
