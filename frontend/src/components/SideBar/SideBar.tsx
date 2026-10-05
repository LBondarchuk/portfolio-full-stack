import { useEffect, useId, useState } from "react";
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
  onClose: () => void;
};

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
  {
    linkName: "Events",
    link: "/dashboard/events",
  },
];

const SideBar = ({ isOpen, onClose }: Props) => {
  const location = useLocation();
  const submenuId = useId();

  const isTodoRoute = location.pathname.startsWith("/dashboard/todo");

const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
  Todo: isTodoRoute,
});



  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);



// useEffect(() => {
//   if (isTodoRoute) {
//     setOpenMenus((prev) => ({
//       ...prev,
//       Todo: true,
//     }));
//   }
// }, [isTodoRoute]);

 
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const isMenuOpen = (item: NavItem) => {
    return Boolean(openMenus[item.linkName]);
  };

  return (
    <>
      {/* Mobile overlay */}
      <motion.button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
      />

      <aside
        
        aria-label="Main navigation"
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          bg-primary
          shadow-xl
          transition-transform duration-300 ease-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:static
          lg:z-auto
          lg:w-64
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        <div className="flex h-full flex-col pt-20 lg:pt-6">
          {/* Brand / section label */}
          <div className="px-5 pb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Workspace
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Developer Dashboard
            </p>
          </div>

          <motion.nav
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.08,
                },
              },
              closed: {
                transition: {
                  staggerChildren: 0.03,
                  staggerDirection: -1,
                },
              },
            }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            className="flex flex-1 flex-col gap-1 px-3"
          >
            {navLinks.map((item) => {
              const hasChildren = Boolean(item.children);
              const expanded = hasChildren && isMenuOpen(item);

              return (
                <motion.div
                  key={item.link}
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                    },
                    closed: {
                      opacity: 0,
                      x: -12,
                    },
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="lg:!translate-x-0 lg:!opacity-100"
                >
                  <div className="grid gap-1">
                    {/* Main navigation item */}
                    <div className="flex items-center gap-1">
                      <NavLink
                        to={item.link}
                        end={item.end}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `
                            group flex min-h-10 flex-1
                            items-center rounded-xl
                            px-3.5 py-2.5
                            text-sm font-medium
                            transition-all duration-200
                            ${
                              isActive
                                ? "bg-primary-hover text-white shadow-sm"
                                : "text-white/80 hover:bg-primary-hover/80 hover:text-white"
                            }
                          `
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="truncate">
                              {item.linkName}
                            </span>

                            {isActive && (
                              <motion.span
                                layoutId="active-nav"
                                className="ml-auto size-1.5 rounded-full bg-white"
                              />
                            )}
                          </>
                        )}
                      </NavLink>

                      {/* Submenu toggle */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleMenu(item.linkName)
                          }
                          aria-expanded={expanded}
                          aria-controls={submenuId}
                          aria-label={
                            expanded
                              ? `Collapse ${item.linkName} menu`
                              : `Expand ${item.linkName} menu`
                          }
                          className="
                            flex size-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            text-white/70
                            transition-colors
                            hover:bg-primary-hover
                            hover:text-white
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white/60
                          "
                        >
                          <motion.span
                            animate={{
                              rotate: expanded ? 180 : 0,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="text-sm"
                          >
                            ▾
                          </motion.span>
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    {hasChildren && (
                      <motion.div
                        id={submenuId}
                        initial={false}
                        animate={{
                          height: expanded ? "auto" : 0,
                          opacity: expanded ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.22,
                          ease: "easeOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 border-l border-white/15 pl-2">
                          {item.children!.map((child) => (
                            <NavLink
                              key={child.link}
                              to={child.link}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `
                                  flex min-h-9
                                  items-center
                                  rounded-lg
                                  px-3 py-2
                                  text-xs font-medium
                                  transition-colors
                                  ${
                                    isActive
                                      ? "bg-primary-hover text-white"
                                      : "text-white/60 hover:bg-primary-hover/70 hover:text-white"
                                  }
                                `
                              }
                            >
                              {child.linkName}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Bottom hint */}
          <div className="border-t border-white/10 px-5 py-5">
            <p className="text-[10px] leading-4 text-white/40">
              React · TypeScript · Full Stack
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;