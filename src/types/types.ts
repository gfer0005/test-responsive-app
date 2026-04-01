export interface V8670Kpi {
    objid: string;
    kpi: string | null;
}

export interface V8670KpiInputDetail {
    roleid: string;
    orgcode: string;
    objid: string;
    kpi: string | null;
    kpiYear: number;
    grpid: string;
    objmth: number;
    objmthvalue: number | null;
    objcumvalue: number | null;
    objmthmastervalue: number | null;
    dateUpdateValue: string | null;
    userUpdateValue: string | null;
    grplabel: string | null;
    mesureUnit: string | null;
    mesureLabel: string | null;
    autoRun: string | null;
    comments: string | null;
    objmthvalue1: number | null;
    objmthvalueY1: number | null;
    manco: string | null;
}