import MenuButton from "./MenuButton/MenuButton";
import CalendarCount from "./CalendarCount/CalendarCount";
import TodoToComlate from "./TodoToComlate/TodoToComlate";

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
        z-20 flex h-16 items-center justify-between px-4
        transition-colors duration-200
        lg:bg-surface
        ${
          isSidebarOpen ? "bg-transparent" : "border-b border-border bg-surface"
        }
      `}
    >
      <div className="z-1000 rounded-xl border border-border bg-surface/80 p-1 backdrop-blur-sm lg:hidden">
        <MenuButton isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <CalendarCount />

        <div className="h-6 w-px bg-border" />

        <TodoToComlate />
      </div>
    </header>
  );
};

export default TopBar;
