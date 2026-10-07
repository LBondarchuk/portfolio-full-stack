import { useState } from "react";
import { useLocation } from "react-router";
import SideBarNavItem from "./SideBarNavItem";
import { sideBarNavItems } from "./sidebar.constants";

type Props = {
  onClose: () => void;
};

const SideBarNavigation = ({ onClose }: Props) => {
  const { pathname } = useLocation();
  const isTodoRoute = pathname.startsWith("/dashboard/todo");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Todo: isTodoRoute,
  });

  const toggleMenu = (menuName: string) => {
    setOpenMenus((previous) => ({
      ...previous,
      [menuName]: !previous[menuName],
    }));
  };

  const expandMenu = (menuName: string) => {
    setOpenMenus((previous) => ({ ...previous, [menuName]: true }));
  };

  return (
    <nav
      aria-label="Dashboard-Seiten"
      className="flex flex-1 flex-col gap-1 px-3"
    >
      {sideBarNavItems.map((item) => (
        <SideBarNavItem
          key={item.link}
          item={item}
          isExpanded={Boolean(openMenus[item.linkName])}
          onClose={onClose}
          onExpand={() => expandMenu(item.linkName)}
          onToggle={() => toggleMenu(item.linkName)}
        />
      ))}
    </nav>
  );
};

export default SideBarNavigation;
