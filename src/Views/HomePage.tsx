import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type SetStateAction,
} from "react";
import { Layout } from "../components/Layout";
import { Dropdown, type DropdownOption } from "../components/Dropdown";
import { LoadingPage } from "../components/LoadingPage";
import { Combobox, type ComboboxOption } from "../components/Combobox";
import { KpiAPI } from "../utils/api";
import type { V8670Kpi, V8670KpiInputDetail } from "../types/types";
import KpiTable from "../components/ReusableTable/KpiTable";
import { DetailModal } from "../components/DetailModal/DetailModal";
import { YEARS, MONTHS } from "../types/filters";
import { showNotification } from "../utils/notificationUtils";
import { Switch } from "@mantine/core";
import { Navigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { useAuth } from "../Contexts/AuthContext";

function HomePage() {
  const { currentUser, isAuthorized } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<ComboboxOption | null>(null);
  const [kpiList, setKpiList] = useState<V8670Kpi[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<DropdownOption | null>(
    () => {
      const currentMonth = new Date().getMonth() + 1;
      return MONTHS.find((m) => m.id === currentMonth) ?? null;
    },
  );
  const [selectedYear, setSelectedYear] = useState<DropdownOption | null>(
    () => {
      const currentYear = new Date().getFullYear();
      return YEARS.find((y) => y.id === currentYear) ?? null;
    },
  );
  const [kpiInputDetails, setKpiInputDetails] = useState<V8670KpiInputDetail[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMancoActive, setIsMancoActive] = useState(false); // Par défaut activé
  const [isManualActive, setIsManualActive] = useState(false); // Par défaut désactivé

  const filterRowStyle = useMemo(
    () => ({
      display: "flex" as const,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: "8px",
    }),
    [],
  );

  const kpiOptions = useMemo(() => {
    return kpiList
      .filter((kpi) => kpi.kpi != null)
      .map((kpi, index) => ({
        id: `${kpi.objid}-${index}`,
        title: kpi.kpi!,
        objid: kpi.objid,
      }));
  }, [kpiList]);

  const handleMonthSelect = useCallback(
    (option: SetStateAction<DropdownOption | null>) => {
      setSelectedMonth(option);
    },
    [],
  );

  const handleYearSelect = useCallback(
    (option: SetStateAction<DropdownOption | null>) => {
      setSelectedYear(option);
    },
    [],
  );
  
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthorized || !currentUser) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("[DEBUG] App - Fetching user and KPI data...");

        const kpis = await KpiAPI.getAllAsync();
        setKpiList(kpis);

        if (currentUser.userId && currentUser.organigramme) {
          const kpiInputs = await KpiAPI.getKpiInputsByUser(
            currentUser.userId,
            currentUser.organigramme,
          );
          setKpiInputDetails(kpiInputs);
        }
      } catch (error) {
        console.error("[DEBUG] App - Error fetching data:", error);
        setError("Une erreur est survenue lors du chargement des données.");
        showNotification.error({
          title: "Error while fetching data",
          message:
            "Impossible to load user or KPI data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, isAuthorized]);

  if (!currentUser) {
    return <LoadingPage title="WPB Data Entry Tool" />;
  }

  if (!isAuthorized) {
    return <Navigate to="/no-access" replace />;
  }

  if (isLoading) {
    return <LoadingPage title="WPB Data Entry Tool" />;
  }

  if (error) {
    return (
      <ErrorPage
        title="Error while loading data"
        subTitle="WPB - Error"
        description="An error occurred while loading data. Please try again or contact support."
      />
    );
  }

  return (
    <Layout
      title="Data Entry Tool"
      rightTitle={
        currentUser
          ? `${currentUser.name} - ${currentUser.roleId}`
          : "Loading..."
      }
      logoSrc="/img/logo_belfius.png"
      backgroundSrc="/img/bg.svg"
    >
      <div className="w-full h-full flex flex-col gap-2 overflow-visible text-base">
        {/* Filters */}
        <div className="w-full flex flex-row gap-2 justify-between mb-6">
          <Combobox
            options={kpiOptions}
            selected={selectedKpi}
            onSelect={setSelectedKpi}
            placeholder="KPI Selection"
            maxWidth="max-w-lg"
          />

          <div style={filterRowStyle}>
            <geui-title-text size="small">MONTH</geui-title-text>
            <Dropdown
              options={MONTHS}
              placeholder="Choose a month"
              selected={selectedMonth}
              onSelect={handleMonthSelect}
            />
          </div>
          <div style={filterRowStyle}>
            <geui-title-text size="small">YEAR</geui-title-text>
            <Dropdown
              options={YEARS}
              placeholder="Choose a year"
              selected={selectedYear}
              onSelect={handleYearSelect}
            />
          </div>
          <div style={filterRowStyle}>
            <geui-title-text size="small">MANCO</geui-title-text>
            <Switch
              checked={isMancoActive}
              onChange={(event: { currentTarget: { checked: boolean | ((prevState: boolean) => boolean); }; }) =>
                setIsMancoActive(event.currentTarget.checked)
              }
              color="var(--color-belfius)"
              labelPosition="left"
              size="lg"
            />
          </div>
          <div style={filterRowStyle}>
            <geui-title-text size="small">MANUAL</geui-title-text>
            <Switch
              checked={isManualActive}
              onChange={(event: { currentTarget: { checked: boolean | ((prevState: boolean) => boolean); }; }) =>
                setIsManualActive(event.currentTarget.checked)
              }
              color="var(--color-belfius)"
              labelPosition="left"
              size="lg"
            />
          </div>
        </div>
      </div>
      <KpiTable
        kpiInputDetails={kpiInputDetails}
        selectedMonth={selectedMonth?.id as number | null}
        selectedYear={selectedYear?.id as number | null}
        selectedObjid={selectedKpi?.objid || null}
        isMancoActive={isMancoActive}
        isManualActive={isManualActive}
      />
      {isOpen && (
        <DetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="KPI Details"
        />
      )}
    </Layout>
  );
}

export default HomePage;
