import { useEffect } from "react";
import Routes from "./routes";
import { useTranslation } from "react-i18next";
import "./i18n/config.ts";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Set language and direction explicitly

  return (
    <div
      className={`cairoFont`}
      style={{ direction: i18n.dir() === "ltr" ? "ltr" : "rtl" }}
    >
      <Routes />
    </div>
  );
}

export default App;
