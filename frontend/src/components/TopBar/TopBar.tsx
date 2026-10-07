import MenuButton from "./MenuButton/MenuButton";
import CalendarCount from "./CalendarCount/CalendarCount";
import TodoToComlate from "./TodoToComlate/TodoToComlate";
import ThemeToggle from "../../features/theme/ThemeToggle";

type Props = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBar = ({ isSidebarOpen, setSidebarOpen }: Props) => {
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <header
      className={`
        relative flex h-16 items-center justify-between px-4
        transition-colors duration-200
        lg:bg-surface
        ${
          isSidebarOpen
            ? "pointer-events-none z-50 bg-transparent"
            : "z-20 border-b border-border bg-surface"
        }
      `}
    >
      <div className="pointer-events-auto relative z-10 rounded-xl border border-border bg-surface/80 p-1 backdrop-blur-sm lg:hidden">
        <MenuButton isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div
        aria-hidden={isSidebarOpen}
        className={`ml-auto flex items-center gap-4 ${
          isSidebarOpen ? "invisible pointer-events-none" : ""
        }`}
      >
        <ThemeToggle />
        <CalendarCount />

        <div className="h-6 w-px bg-border" />

        <TodoToComlate />
      </div>
    </header>
  );
};

export default TopBar;
