import { Link, NavLink } from "react-router-dom";
import { useFavoris } from "../context/FavorisContext";

export default function Navbar() {
    const { favoris } = useFavoris();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🎬</span>
                    <span className="brand-name">
                        serie <span className="brand-sn">SN</span>
                    </span>
                    <span className="brand-tagline">Explorer</span>
                </Link>

                <div className="navbar-links">
                    <NavLink to="/" end className={({ isActive }) =>
                        "nav-link" + (isActive ? "nav-link--active" : "")}>
                            Accueil
                    </NavLink>
                    <NavLink to="/favoris" className={({isActive}) =>
                    "nav-link" + (isActive ? "nav-link--active" : "")}>
                        Favoris {favoris.length > 0 && (
                            <span className="badge">{favoris.length}</span>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}