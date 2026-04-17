import { AuthProvider } from "./Contexts/AuthContext";
import { MantineProvider} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@mantine/notifications/styles.css";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./Views/HomePage";
import NoAccessPage from "./components/NoAccessPage";
import useWindowSize from "./hooks/useWindowSize";
import { useEffect } from "react";
import './index.css';


const RootApp = () => {
  const { isSmallResolution } = useWindowSize();

  useEffect(() => {
    if (isSmallResolution) {
      document.body.classList.add('small-resolution');
      document.body.classList.remove('normal-resolution');
    } else {
      document.body.classList.add('normal-resolution');
      document.body.classList.remove('small-resolution');
    }
  }, [isSmallResolution]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <MantineProvider>
          <Notifications position="bottom-right" zIndex={9999} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/no-access" element={<NoAccessPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RootApp;
