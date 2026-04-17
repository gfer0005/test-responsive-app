import type { V8670Kpi, V8670KpiInputDetail, MesureUnits, User } from '../types/types';

// ============================================================
// Mock User (simule le retour de /User/auth)
// ============================================================
export const mockCurrentUser: User & { isAuthorized: boolean } = {
  sapnr: '00012345',
  userId: 'GCARUSO',
  name: 'Giuseppe Caruso',
  service: 'WPB Data Entry',
  email: 'giuseppe.caruso@belfius.be',
  isManager: 1,
  language: 1,
  organigramme: 'ORG001',
  roleId: 'ADMIN',
  dateload: new Date('2026-01-15'),
  isAuthorized: true,
};

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    sapnr: '00012346',
    userId: 'JDUPONT',
    name: 'Jean Dupont',
    service: 'WPB Data Entry',
    email: 'jean.dupont@belfius.be',
    isManager: 0,
    language: 1,
    organigramme: 'ORG001',
    roleId: 'USER',
    dateload: new Date('2026-02-10'),
  },
  {
    sapnr: '00012347',
    userId: 'MVANDENB',
    name: 'Marie Vandenberghe',
    service: 'WPB Reporting',
    email: 'marie.vandenberghe@belfius.be',
    isManager: 0,
    language: 2,
    organigramme: 'ORG002',
    roleId: 'USER',
    dateload: new Date('2026-03-05'),
  },
];

// ============================================================
// Mock KPI list (simule le retour de /V8670Kpi)
// ============================================================
export const mockKpiList: V8670Kpi[] = [
  { objid: 'OBJ001', kpi: 'Revenue Growth (%)' },
  { objid: 'OBJ002', kpi: 'Customer Satisfaction Score' },
  { objid: 'OBJ003', kpi: 'Net Promoter Score' },
  { objid: 'OBJ004', kpi: 'Operating Costs (€K)' },
  { objid: 'OBJ005', kpi: 'New Accounts Opened' },
  { objid: 'OBJ006', kpi: 'Digital Adoption Rate (%)' },
  { objid: 'OBJ007', kpi: 'Employee Engagement Index' },
  { objid: 'OBJ008', kpi: 'Loan Default Rate (%)' },
];

// ============================================================
// Mock Mesure Units
// ============================================================
export const mockMesureUnits: MesureUnits[] = [
  { mesureUnit: 'PCT', mesureLabel: '%' },
  { mesureUnit: 'EUR', mesureLabel: '€K' },
  { mesureUnit: 'NB', mesureLabel: 'Number' },
  { mesureUnit: 'IDX', mesureLabel: 'Index' },
];

// ============================================================
// Mock KPI Input Details (simule /V8670Kpi/user-kpis)
// ============================================================
const grpLabels = ['Retail Banking', 'Corporate Banking', 'Insurance', 'Digital Services'];

function generateKpiInputDetails(): V8670KpiInputDetail[] {
  const details: V8670KpiInputDetail[] = [];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [2025, 2026];

  for (const kpi of mockKpiList) {
    for (const year of years) {
      for (const month of months.slice(0, year === 2026 ? 4 : 12)) {
        const grpIndex = Math.floor(Math.random() * grpLabels.length);
        const unitIndex = Math.floor(Math.random() * mockMesureUnits.length);
        const baseValue = Math.round(Math.random() * 1000) / 10;

        details.push({
          roleid: 'ADMIN',
          orgcode: 'ORG001',
          objid: kpi.objid,
          kpi: kpi.kpi,
          kpiYear: year,
          grpid: `GRP00${grpIndex + 1}`,
          objmth: month,
          objmthvalue: baseValue,
          objcumvalue: Math.round(baseValue * month * 10) / 10,
          objmthmastervalue: Math.round(baseValue * 1.1 * 10) / 10,
          dateUpdateValue: `2026-0${Math.min(month, 9)}-15`,
          userUpdateValue: 'GCARUSO',
          grplabel: grpLabels[grpIndex],
          mesureUnit: mockMesureUnits[unitIndex].mesureUnit,
          mesureLabel: mockMesureUnits[unitIndex].mesureLabel,
          autoRun: Math.random() > 0.5 ? '1' : '0',
          comments: Math.random() > 0.7 ? 'Validated by management' : null,
          objmthvalue1: Math.round((baseValue + (Math.random() * 20 - 10)) * 10) / 10,
          objmthvalueY1: Math.round((baseValue * 0.9 + Math.random() * 15) * 10) / 10,
          manco: Math.random() > 0.6 ? '1' : '0',
        });
      }
    }
  }

  return details;
}

export const mockKpiInputDetails: V8670KpiInputDetail[] = generateKpiInputDetails();
