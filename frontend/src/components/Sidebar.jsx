import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#1f2937",
      color: "white",
      padding: "20px"
    }}>

      <h2>Livestock</h2>

      <ul style={{listStyle:"none", padding:0}}>

        <li><Link to="/" style={{color:"white"}}>Dashboard</Link></li>
        <li><Link to="/farmers" style={{color:"white"}}>Farmers</Link></li>
        <li><Link to="/animals" style={{color:"white"}}>Animals</Link></li>
        <li><Link to="/vaccinations" style={{color:"white"}}>Vaccinations</Link></li>
        <li><Link to="/diseases" style={{color:"white"}}>Diseases</Link></li>
        <li><Link to="/alerts" style={{color:"white"}}>Alerts</Link></li>

      </ul>

    </div>
  );
}

export default Sidebar;