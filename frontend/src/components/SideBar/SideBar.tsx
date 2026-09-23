import { motion } from "motion/react";
import { NavLink } from "react-router";

type Props = {
  isOpen: boolean;
};

const SideBar = ({ isOpen }: Props) => {
  const navLinks = [
    { linkName: "Home", link: "/dashboard", end: true },
    { linkName: "Todo", link: "/dashboard/todo" },
    { linkName: "Game 2048", link: "/dashboard/2048" },
  ];

  const navVariants = {
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08,
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
        pt-20 box-border
      `}
    >
      <motion.nav
        variants={navVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="flex flex-col gap-2 p-4"
      >
        {navLinks.map((item) => (
          <motion.div key={item.link} variants={itemVariants}   className="lg:translate-x-0! lg:opacity-100!" >
            <NavLink
              to={item.link}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 text-white transition-colors ${
                  isActive
                    ? "bg-primary-hover"
                    : "hover:bg-primary-hover"
                }`
              }
            >
              {item.linkName}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </aside>
  );
};

export default SideBar;