import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { ThemeProvider, darkTheme } from "bold-ui";
import PrimeCounter from "./pages/PrimeCounter";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
  );
}

export default App;
