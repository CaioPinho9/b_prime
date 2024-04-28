import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { ThemeProvider } from "bold-ui";
import PrimeCounter from "./pages/PrimeCounter";
import { ThemeContext, useChangeTheme } from "./store/theme/ThemeStore";

function App() {
  const [currentTheme, changeTheme] = useChangeTheme();

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      <ThemeProvider theme={currentTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/prime" element={<PrimeCounter />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
