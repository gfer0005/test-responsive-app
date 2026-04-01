import React, { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;

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
  scrollable = false,
  maxHeight = '500px',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      } else setSortDirection('asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;

      const compareResult = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
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
        <button key={1} onClick={() => onPageChange(1)} className="w-8 h-8 flex items-center justify-center text-sm rounded-md text-slate-700 hover:bg-slate-100 transition-colors">1</button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="w-8 h-8 flex items-center justify-center text-sm text-slate-700">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors ${
            currentPage === i
              ? 'border border-[#e81e62] text-[#e81e62] bg-[#fdf2f6] font-medium'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="w-8 h-8 flex items-center justify-center text-sm text-slate-700">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="w-8 h-8 flex items-center justify-center text-sm rounded-md text-slate-700 hover:bg-slate-100 transition-colors">{totalPages}</button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full h-full bg-white rounded-4xl border border-gray-200 shadow-lg backdrop-blur-2xl flex flex-col overflow-hidden font-sans">
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
        style={scrollable ? { maxHeight } : undefined}
      >
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 bg-[#c30045] z-10 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`py-3 px-5 text-sm font-semibold text-white tracking-wide ${
                    col.sortable
                      ? "cursor-pointer hover:bg-[#c30045] transition-colors select-none group"
                      : ""
                  } ${col.headerClassName || ""}`}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-2">
                    {col.title}
                    {col.sortable && (
                      <span className="flex items-center text-white">
                        {sortKey === col.key ? (
                          sortDirection === "asc" ? (
                            <ArrowUp size={16} className="text-white" />
                          ) : (
                            <ArrowDown size={16} className="text-white" />
                          )
                        ) : (
                          <ArrowDown
                            size={16}
                            className="text-white opacity-80 group-hover:opacity-100 group-hover:text-slate-600 transition-all"
                          />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`py-4 px-5 text-sm text-slate-700 ${col.cellClassName || ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
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
