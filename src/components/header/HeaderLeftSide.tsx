import { Link, useLocation } from "react-router-dom";
import smoothieLgoo from "../../assets/logo.svg";

function HeaderLeftSide() {
  const location = useLocation();

  const navList: { name: string; url: string }[] = [
    {
      name: "User List",
      url: "/userlist",
    },
    {
      name: "Project List",
      url: "/projectlist",
    },
  ];

  return (
    <div className="flex items-center">
      <h1 className="transition ease duration-300 hover:scale-105">
        <Link to="/">
          <img src={smoothieLgoo} alt="Smoothie Lgoo" />
        </Link>
      </h1>
      <nav className="px-5">
        <ul className="flex">
          {navList.map(list => (
            <li
              key={list.name}
              className={`px-5 text-lg hover:font-bold hover:text-primary ${location.pathname === list.url ? "font-bold text-primary" : ""}`}
            >
              <Link to={list.url}>{list.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderLeftSide;
