import { Link } from "react-router-dom";
import logo from "../assets/barabariLogo.png"; // adjust path if needed

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <img className="logo" src={logo} alt="Barabari Logo" />
        <h1 className="brandTitle">Barabari Careers</h1>
      </div>
      <ul>
        <li><Link to="/careers">Careers</Link></li>
      </ul>
    </nav>
  );
}
