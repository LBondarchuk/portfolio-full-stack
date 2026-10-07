import { useId } from "react";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import type { SideBarNavItemConfig } from "./sidebar.constants";

type Props = {
  item: SideBarNavItemConfig;
  isExpanded: boolean;
  onClose: () => void;
  onExpand: () => void;
  onToggle: () => void;
};

const SideBarNavItem = ({ item, isExpanded, onClose, onExpand, onToggle }: Props) => {
  const submenuId = useId();
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="grid gap-1">
      <div className="flex items-center gap-1">
        <NavLink
          to={item.link}
          end={item.end}
          onClick={() => {
            onClose();
            if (hasChildren) onExpand();
          }}
          className={({ isActive }) =>
            `group flex min-h-10 flex-1 items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-primary-hover shadow-md ring-1 ring-white/40"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="truncate">{item.linkName}</span>
              {isActive && (
                <motion.span
                  layoutId="active-nav"
                  className="ml-auto size-1.5 rounded-full bg-primary"
                />
              )}
            </>
          )}
        </NavLink>

        {hasChildren && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={submenuId}
            aria-label={`${isExpanded ? "Menü einklappen" : "Menü ausklappen"}: ${item.linkName}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-primary-hover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 dark:hover:bg-slate-800"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              ▾
            </motion.span>
          </button>
        )}
      </div>

      {hasChildren && (
        <motion.div
          id={submenuId}
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="ml-4 border-l border-white/15 pl-2">
            {item.children?.map((child) => (
              <NavLink
                key={child.link}
                to={child.link}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex min-h-9 items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {child.linkName}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SideBarNavItem;
