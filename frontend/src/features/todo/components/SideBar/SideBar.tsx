import { NavLink } from "react-router";

const SideBar = () => {
  const navLinks = [
    { linkName: "Home", link: "/dashboard", end: true },
    { linkName: "Todo", link: "/dashboard/todo" },
    { linkName: "Game 2048", link: "/dashboard/2048" },
  ];

  return (
    <aside className="bg-primary">
      <nav className="flex flex-col gap-2 p-4">
        {navLinks.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            end={item.end}
            className={({ isActive }) =>
              `rounded-md px-4 py-2 text-white transition-colors ${
                isActive
                  ? "bg-primary-hover"
                  : "hover:bg-primary-hover"
              }`
            }
          >
            {item.linkName}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;