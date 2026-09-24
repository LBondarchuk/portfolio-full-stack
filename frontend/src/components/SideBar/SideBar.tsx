import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";

type NavItem = {
  linkName: string;
  link: string;
  end?: boolean;
  children?: {
    linkName: string;
    link: string;
  }[];
};

type Props = {
  isOpen: boolean;
};

const SideBar = ({ isOpen }: Props) => {
  const location = useLocation();

  const navLinks: NavItem[] = [
    {
      linkName: "Home",
      link: "/dashboard",
      end: true,
    },
    {
      linkName: "Todo",
      link: "/dashboard/todo",
      children: [
        {
          linkName: "Analytics",
          link: "/dashboard/todo/analytics",
        },
      ],
    },
    {
      linkName: "Game 2048",
      link: "/dashboard/2048",
    },
  ];

  const isTodoRoute = location.pathname.startsWith("/dashboard/todo");

  const navVariants = {
    open: {
      transition: {
        delayChildren: 0.3,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
    },
    closed: {
      opacity: 0,
      x: -20,
    },
  };

  return (
    <aside
      className={`
        fixed inset-0 z-5 bg-primary
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0
        box-border pt-20
      `}
    >
      <motion.nav
        variants={navVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="flex flex-col gap-2 p-4"
      >
        {navLinks.map((item, index) => {
          const hasChildren = Boolean(item.children);

          const isExpanded =
            hasChildren &&
            (isTodoRoute || location.pathname.startsWith(item.link));

          return (
            <motion.div
              key={item.link}
              variants={itemVariants}
              transition={{
                duration: 0.25,
                delay: isOpen ? index * 0.08 : 0,
              }}
              className="lg:!translate-x-0 lg:!opacity-100"
            >
              <div className="grid gap-1">
                <div className="flex items-center">
                  <NavLink
                    to={item.link}
                    end={item.end}
                    className={({ isActive }) =>
                      `block flex-1 rounded-md px-4 py-2 text-white transition-colors ${
                        isActive
                          ? "bg-primary-hover"
                          : "hover:bg-primary-hover"
                      }`
                    }
                  >
                    {item.linkName}
                  </NavLink>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => {
                        // тут поки нічого, якщо хочеш
                        // ручне відкриття/закриття — додамо окремий state
                      }}
                      className="ml-1 rounded-md px-2 py-2 text-white hover:bg-primary-hover"
                      aria-label={
                        isExpanded
                          ? "Collapse Todo menu"
                          : "Expand Todo menu"
                      }
                    >
                      <span
                        className={`block transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  )}
                </div>

                {hasChildren && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, x: -8 }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 overflow-hidden"
                  >
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.link}
                        to={child.link}
                        className={({ isActive }) =>
                          `block rounded-md px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary-hover text-white"
                              : "text-white/80 hover:bg-primary-hover hover:text-white"
                          }`
                        }
                      >
                        {child.linkName}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.nav>
    </aside>
  );
};

export default SideBar;