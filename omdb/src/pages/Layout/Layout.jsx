import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="container">
            <nav>
                <h4>OMDB</h4>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                </ul>
            </nav>
            <main><Outlet /></main>
            <footer>2025</footer>
        </div>
    );
};

export default Layout;