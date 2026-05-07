import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Animals from "./pages/Animals";
import Vaccinations from "./pages/Vaccinations";
import Diseases from "./pages/Diseases";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>

      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/vaccinations" element={<Vaccinations />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analytics" element={<Analytics />} />

          </Routes>
        </div>

      </div>

    </Router>
  );
}

export default App;