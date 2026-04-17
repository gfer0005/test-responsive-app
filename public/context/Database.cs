using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Data.Common;
using System.Linq;
using WebApplication1.Controllers;
using System.Web.Security;
using System.Globalization;
using Oracle.ManagedDataAccess.Client;
using WebApplication1;
using WebApplication1.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Runtime.DesignerServices;

public class Database
{
   
    private const string ProviderName = "System.Data.Odbc";
    private const string ConnectionStringODHP = "Data Source = DB_ODHP; User ID =caqswbpusr ; Password=g6SuwRLbrewIrI99;";
   // private const string ConnectionStringODHG = "Data Source = DB_ODHG; User ID =caqswbgusr ; Password=wItHipu6ri2rAP99;";
    private const string ConnectionStringODHG = "Data Source = DB_ODHP; User ID =caqswbpusr ; Password=g6SuwRLbrewIrI99;";
    private const string ListeKPI = "SELECT distinct objid, kpi FROM QSWB.V_8670_KPI @(conditions) ORDER BY KPI";
    private const string SelectUserStatement = "SELECT * FROM QSWB.V_8670_USR_DETAILS WHERE USERID = @(user)";
    private const string SelectKPIInputDetails = "SELECT distinct objid, kpi, kpi_year, grpid, objmth, objmthvalue, objcumvalue, objmthmastervalue,grplabel, mesure_unit, mesure_label, auto_run, comments, objmthvalue_1, objmthvalue_y_1, manco FROM QSWB.V_8670_KPI_INPUT_DETAILS @(conditions) order by kpi, objmth, grplabel";
    private const string StatStatement = "INSERT INTO QSIG.T_6320_REPORTS_LOGGING(reportid,reportlocation,reporturl,loguser) values(4521,'https://mktpwb.belwired.net/uspb8610/api/api/SPA/','https://mktpwb.belwired.net/uspb8610/api/api/SPA/',@(UserId))";
    private const string UpdateObjmthValue = @"
                            UPDATE qsig.t_2500_obj_data_entry
                            SET objmthvalue = @(objmthvalue)
                              , user_update_value=@(user)
                              , comments=@(comments)
                            WHERE objid=@(objid) and objyear=@(kpi_year) and objmth=@(objmth) and grpid=@(groupeid)
                                ";
    private const string UpdateObjmthmasterValue = @"
                            UPDATE qsig.t_2500_obj_data_entry
                            SET objmthmastervalue = @(objmthmastervalue)
                              , user_update_master_value=@(user)
                              , comments=@(comments)
                            WHERE objid=@(objid) and objyear=@(kpi_year) and objmth=@(objmth) and grpid=@(groupeid)
                                ";
    private const string ProcUpdateCumuls = "QSWB.P_8670_CALC_CUMVALUE";

    public static List<User> GetUser()
    {
      string user = HttpContext.Current.User.Identity.NameWithoutDomain();
        return GetMultiple<User>(
            ConnectionStringODHG,
            SelectUserStatement.Replace("@(user)", $"'{user}'"),
            reader => new User(
                reader.GetString(1),
                reader.GetString(2),
                LanguageHelper.Parse(reader.GetInt32(3)),
                reader.GetString(5),
                reader.GetString(4)
            )
            );
    }

    public static void InsertStat()
    {
        string user = HttpContext.Current.User.Identity.NameWithoutDomain();
        string InsertSQL;
        InsertSQL = StatStatement.Replace("@(UserId)", $"'{user}'");

        ExecuteUniqueNonQuery(
     ConnectionStringODHG, InsertSQL
    );
    }


    public static void UpdateCumuls()
    {
        ExecuteStoredProcedure(
            ConnectionStringODHG,
           ProcUpdateCumuls
        );
    }


    public static List<KPIInputs> GetKPIInputs(string ObjmthParam)
    {
        List<User> users = GetUser();
       
        var user = users.First();
        string userid = HttpContext.Current.User.Identity.NameWithoutDomain();
        string filters;
        string oSQL;


        oSQL = SelectKPIInputDetails.Replace("@(UserId)", $"'{userid}'");
        filters = " where (orgcode='" + user.Organigramme + "' or QSWB.F_8670_GET_ADMIN('" + user.Organigramme + "')=1) "; //order by objid, objmth 
              
        return GetMultiple<KPIInputs>(
            ConnectionStringODHG,
            oSQL.Replace("@(conditions)",filters),
            reader => new KPIInputs(
                reader.GetStringOrNull(0),       //objid
                reader.GetStringOrNull(1),       //kpi
                reader.GetIntOrNull(2) ?? 0,     //kpi year
                reader.GetStringOrNull(3),       //grpid
                reader.GetIntOrNull(4) ?? 0,     //objmth
                reader.GetDoubleOrNull(5) ?? 0,  //objmthvalue
                reader.GetDoubleOrNull(6) ?? 0,  //objcumvalue
                reader.GetDoubleOrNull(7) ?? 0,  //objmthmastervalue
                reader.GetStringOrNull(8),       // grp label
                reader.GetStringOrNull(9),       //mesure unit
                reader.GetStringOrNull(10),      //mesure label
                reader.GetStringOrNull(11),      // auto run
                reader.GetStringOrNull(12),      // comments
                reader.GetDoubleOrNull(13) ?? 0,  // objmthvalue_1
                reader.GetDoubleOrNull(14) ?? 0,   // objmthvalue_1
                reader.GetStringOrNull(15)
                )
        );

    }

    public static List<ListeKPI> GetListeKPI()
    {
        List<User> users = GetUser();      
        var user = users.First();
        string userid = HttpContext.Current.User.Identity.NameWithoutDomain();
        string filters;

        filters = " where userid='" + userid + "' or QSWB.F_8670_GET_ADMIN('" + user.Organigramme + "')=1 ";//order by objid, objmth 
      
        return GetMultiple<ListeKPI>(
             ConnectionStringODHG,
            ListeKPI.Replace("@(conditions)", filters),
            reader => new ListeKPI(
                reader.GetStringOrNull(0), //objid
                reader.GetStringOrNull(1) //kpi label                                
                )
        );
    }

    public static void ExecuteStoredProcedure(string connectionString, string name, params (string, string, object)[] parameters)
    {
        OracleConnection connection = new OracleConnection(connectionString);

        connection.Open();

        OracleCommand command = new OracleCommand
        {
            CommandText = name,
            Connection = connection,
            CommandType = CommandType.StoredProcedure
        };

        foreach (var parameter in parameters)
            command
                .Parameters
                .Add(parameter.Item1, parameter.Item2)
                .Value = parameter.Item3;

        command.ExecuteNonQuery();

        command.Dispose();

        connection.Close();

        connection.Dispose();
    }

    public static List<T> GetMultiple<T>(string connectionString, string statement, Func<OracleDataReader, T> callback)
    {
        OracleConnection connection = new OracleConnection(connectionString);

        connection.Open();

        OracleCommand command = new OracleCommand(statement, connection);

        var reader = command.ExecuteReader();

        var items = new List<T>();

        while (reader.Read())
        {
            items.Add(callback.Invoke(reader));
        }

        reader.Close();

        reader.Dispose();

        command.Dispose();

        connection.Close();

        connection.Dispose();

        return items;
    }

    public static T GetScalar<T>(string connectionString, string statement)
    {
        OracleConnection connection = new OracleConnection(connectionString);

        connection.Open();

        OracleCommand command = new OracleCommand(statement, connection);

        var value = command.ExecuteScalar();

        var scalar = (T)Convert.ChangeType(value, typeof(T));

        command.Dispose();

        connection.Close();

        connection.Dispose();

        return scalar;
    }

    public static int ExecuteNonQuery(string connectionString, string statement)
    {
        OracleConnection connection = new OracleConnection(connectionString);

        connection.Open();

        OracleCommand command = new OracleCommand(statement, connection);

        var affectedRowsCount = command.ExecuteNonQuery();

        command.Dispose();

        connection.Close();

        connection.Dispose();

        return affectedRowsCount;
    }

    public static void ExecuteUniqueNonQuery(string connectionString, string statement)
    {
        var affectedRowsCount = ExecuteNonQuery(connectionString, statement);

        if (affectedRowsCount != 1)
            throw new Exception();
    }


    public static void UpdateRequestObjtmhvalue(UpdateRequestObjmthvalueCommand command)
    {
        string user = HttpContext.Current.User.Identity.NameWithoutDomain();

        ExecuteUniqueNonQuery(
            ConnectionStringODHG,
            UpdateObjmthValue
                .Replace("@(objid)", $"'{command.Objid}'")
                .Replace("@(kpi_year)", $"'{command.Objyear}'")
                .Replace("@(objmth)", $"'{command.Objmth}'")
                .Replace("@(objmthvalue)", $"'{command.Objmthvalue}'")
                .Replace("@(groupeid)", $"'{command.Groupeid}'")
                .Replace("@(user)", $"'{user}'")
                .Replace("@(comments)", $"'{command.Comments}'")
            );
    }

    public static void UpdateRequestObjtmhmastervalue(UpdateRequestObjmthmastervalueCommand command)
    {
        string user = HttpContext.Current.User.Identity.NameWithoutDomain();

        ExecuteUniqueNonQuery(
            ConnectionStringODHG,
            UpdateObjmthmasterValue
                .Replace("@(objid)", $"'{command.Objid}'")
                .Replace("@(kpi_year)", $"'{command.Objyear}'")
                .Replace("@(objmth)", $"'{command.Objmth}'")
                .Replace("@(objmthmastervalue)", $"'{command.Objmthmastervalue}'")
                .Replace("@(groupeid)", $"'{command.Groupeid}'")
                .Replace("@(user)", $"'{user}'")
                .Replace("@(comments)", $"'{command.Comments}'")
            );
    }
}

public enum Language
{
    French,
    Dutch
}

public static class LanguageHelper
{
    public static Language Parse(int i)
    {

        if (i.Equals(1))
            return Language.French;

        if (i.Equals(2))
            return Language.Dutch;

        throw new Exception($"Unknown notification type: {i}");
    }
}

public static class DbReaderExtension
{
    public static string? GetStringOrNull(this DbDataReader reader, int ordinal)
    {
        return reader.IsDBNull(ordinal) ? null : reader.GetString(ordinal);
    }

    public static int? GetIntOrNull(this DbDataReader reader, int ordinal)
    {
        return reader.IsDBNull(ordinal) ? default(int?) : reader.GetInt32(ordinal);
    }

    public static double? GetDoubleOrNull(this IDataReader reader, int ordinal)
    {
        return reader.IsDBNull(ordinal) ? (double?)null : reader.GetDouble(ordinal);
    }
}
