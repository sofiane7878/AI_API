import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/Form">Form</Link>
          </li>
            <li>
                <Link to="/geoquiz">Geoquiz</Link>
            </li>
            <li>
                <Link to="/weather">Weather</Link>
            </li>
            <li>
                <Link to="/geogame">Geogame</Link>
            </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;