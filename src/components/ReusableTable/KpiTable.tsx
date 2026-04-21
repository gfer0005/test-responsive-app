import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { DetailModal } from '../DetailModal/DetailModal';
import { Table } from '../ReusableTable/Table';
import type { Column } from '../ReusableTable/Table';
import type { V8670KpiInputDetail } from '../../types/types';
import { useAuth } from '../../Contexts/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import { KpiAPI } from '../../utils/api';
import { showNotification } from '../../utils/notificationUtils';

// Dynamic ITEMS_PER_PAGE instead of fixed
// const ITEMS_PER_PAGE = 12;

interface KpiTableProps {
  kpiInputDetails: V8670KpiInputDetail[]; // Accept KPI data as a prop
  selectedMonth: number | null; // Add selectedMonth as a prop
  selectedYear: number | null; // Add selectedYear as a prop
  selectedObjid: string | null; // Add selectedObjid as a prop
  isMancoActive: boolean; // Ajout de la propriété
  isManualActive: boolean; // Ajout de la propriété
}

function KpiTable({ kpiInputDetails, selectedMonth, selectedYear, selectedObjid, isMancoActive, isManualActive }: Readonly<KpiTableProps>) {
  const { currentUser } = useAuth(); // Get the current user
  const [page, setPage] = useState(1);
  const [selectedKpi, setSelectedKpi] = useState<V8670KpiInputDetail | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { height } = useWindowSize();
  const [localUpdates, setLocalUpdates] = useState<Map<string, Partial<V8670KpiInputDetail>>>(new Map());
  
  // Dynamically calculate table rows
  // ROW Height is strictly forced to 72px in Table.tsx
  const ROW_HEIGHT = 72;
  // Account for Header, Layout spaces, thead (~45px), pagination (~56px), padding etc.
  const NON_TABLE_HEIGHT = 400; 
  const availableTbodyHeight = height ? height - NON_TABLE_HEIGHT : 400; 
  const dynamicItemsPerPage = Math.max(3, Math.floor(availableTbodyHeight / ROW_HEIGHT)); // Ensure at least 3 rows
  const [itemsPerPage, setItemsPerPage] = useState(dynamicItemsPerPage);

  // Filter data based on the selected year, month, objid, MANCO, and MANUAL filters
  // Reset local updates when props change (e.g. full reload)
  useEffect(() => {
    setLocalUpdates(new Map());
  }, [kpiInputDetails]);

  const getKpiKey = (kpi: V8670KpiInputDetail) => `${kpi.objid}_${kpi.kpiYear}_${kpi.objmth}_${kpi.grpid}`;

  const filteredData = useMemo(() => {
    return kpiInputDetails
      .map((kpi) => {
        const key = getKpiKey(kpi);
        const updates = localUpdates.get(key);
        return updates ? { ...kpi, ...updates } : kpi;
      })
      .filter((kpi) => {
        const matchesYear = !selectedYear || kpi.kpiYear === selectedYear;
        const matchesMonth = !selectedMonth || kpi.objmth === selectedMonth;
        const matchesObjid = !selectedObjid || kpi.objid === selectedObjid;
        const matchesManco = !isMancoActive || kpi.manco === "1";
        const matchesManual = !isManualActive || kpi.autoRun === "0";
        return matchesYear && matchesMonth && matchesObjid && matchesManco && matchesManual;
      });
  }, [kpiInputDetails, selectedYear, selectedMonth, selectedObjid, isMancoActive, isManualActive, localUpdates]);

  useEffect(() => {
    setItemsPerPage(dynamicItemsPerPage);
    // Adjust page if it exceeds the new total pages
    const expectedTotalPages = Math.ceil(filteredData.length / dynamicItemsPerPage);
    if (page > expectedTotalPages && expectedTotalPages > 0) {
      setPage(expectedTotalPages);
    }
  }, [dynamicItemsPerPage, filteredData.length, page]);



  const pageData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const columns: Column<V8670KpiInputDetail>[] = [
    { key: 'kpiYear', title: 'KPI Year', sortable: true, cellClassName: 'text-center' },
    { key: 'kpi', title: 'KPI to Process', sortable: true },
    { key: 'grplabel', title: 'Grp Label', sortable: true },
    { key: 'objmth', title: 'KPI Month', sortable: true, cellClassName: 'text-center' },
    {
      key: 'objmthvalue1',
      title: 'Value Month-1',
      sortable: true,
      render: (row : any) => row.objmthvalueY1?.toString() ?? '0',
      cellClassName: 'text-center',
    },
    {
      key: 'objmthvalue',
      title: 'Value Month',
      sortable: true,
      render: (row : any) => (row.objmthvalue ?? 0).toString(),
      cellClassName: 'text-center',
    },
    {
      key: 'objmthvalueY1',
      title: 'Value Year-1',
      sortable: true,
      render: (row : any) => row.objmthvalue1?.toString() ?? '0',
      cellClassName: 'text-center',
    },
    // Conditionally include the "Master Value" column based on the user role
    ...(currentUser?.roleId === 'ADMIN'
      ? [
          {
            key: 'objmthmastervalue',
            title: 'Master Value',
            sortable: true,
            render: (row : any) => (row.objmthmastervalue ?? 0).toString(),
            cellClassName: 'text-center',
          },
        ]
      : []),
    { key: 'mesureLabel', title: 'Units' },
    { key: 'comments', title: 'Comments', render: (row : any) => (row.comments ?? '/').toString(), },
  ];

  const handleRowClick = (item: V8670KpiInputDetail) => {
    setSelectedKpi(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedKpi(null);
  };

   const handleSave = useCallback(async (data: V8670KpiInputDetail) => {
    if (!selectedKpi) return;

    try {
      // Update objmthvalue if changed
      if (data.objmthvalue !== selectedKpi.objmthvalue || data.comments !== selectedKpi.comments) {
        await KpiAPI.updateObjmthvalue({
          objid: data.objid,
          objyear: data.kpiYear,
          objmth: data.objmth,
          objmthvalue: data.objmthvalue ?? 0,
          groupeid: data.grpid,
          comments: data.comments ?? undefined,
        });
      }

      // Update objmthmastervalue if changed (admin only)
      if (data.objmthmastervalue !== selectedKpi.objmthmastervalue) {
        await KpiAPI.updateObjmthmastervalue({
          objid: data.objid,
          objyear: data.kpiYear,
          objmth: data.objmth,
          objmthmastervalue: data.objmthmastervalue ?? 0,
          groupeid: data.grpid,
          comments: data.comments ?? undefined,
        });
      }

      // Recalculate cumuls
      await KpiAPI.updateCumuls();

      // Update local state so the table reflects changes immediately
      const key = getKpiKey(data);
      setLocalUpdates((prev) => {
        const next = new Map(prev);
        next.set(key, {
          objmthvalue: data.objmthvalue,
          objmthmastervalue: data.objmthmastervalue,
          comments: data.comments,
        });
        return next;
      });

      showNotification.success({
        title: 'KPI Updated',
        message: `KPI ${data.kpi} updated successfully.`,
      });

      closeModal();
    } catch (error) {
      console.error('Error updating KPI:', error);
      showNotification.error({
        title: 'Update Failed',
        message: 'An error occurred while updating the KPI. Please try again.',
      });
    }
  }, [selectedKpi]);

  return (
    <div className="w-full">
      <Table<V8670KpiInputDetail>
        data={pageData}
        columns={columns}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
        onRowClick={handleRowClick}
        scrollable={false}
      />
      {selectedKpi && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={selectedKpi}
          title="KPI Details"
        />
      )}
    </div>
  );
}

// Utilisation de React.memo pour éviter les re-rendus inutiles
export default React.memo(KpiTable);
