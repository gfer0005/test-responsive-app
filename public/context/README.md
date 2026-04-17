# Data Entry Tool Documentation

## Overview
This project is a data entry tool built with **React 19 + TypeScript** (frontend) and **ASP.NET Core 8 Web API** (backend). It uses **Windows Authentication** for user authentication and integrates with an Oracle database for data storage.

---

## Architecture

### Frontend: React + TypeScript
- **Framework**: React 19, Vite 7, TypeScript 5.9
- **UI**: Tailwind CSS 4, Mantine 7, Belfius GEUI components
- **Routing**: React Router 7
- **State**: React Context (AuthContext)
- **Auth**: Windows Authentication via `withCredentials: true` (Axios)

### Backend: ASP.NET Core 8
- **Authentication**: Windows Authentication (Negotiate)
- **Database**: Oracle via `Oracle.EntityFrameworkCore`
- **Logging**: Serilog

---

## Development

```bash
# Frontend
cd dataentrytoolreact.client
npm install
npm run dev

# Backend - run via Visual Studio or:
dotnet run --project DataEntryToolReact.Server
```

The Vite dev server proxies `/api` requests to the ASP.NET backend automatically.

---

## References
- [Angular Documentation](https://angular.io/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [ASP.NET Web API](https://learn.microsoft.com/en-us/aspnet/web-api/)