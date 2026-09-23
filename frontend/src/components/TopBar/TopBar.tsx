import MenuButton from "./MenuButton/MenuButton";

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
         z-6 flex h-16 
        items-center justify-end px-4
        transition-colors duration-200
         lg:bg-surface
      
        ${
          isSidebarOpen
            ? "border-transparent bg-transparent"
            : "border-b border-border bg-white"
        }
      `}
    >
      <div className="z-50 rounded-xl border border-border bg-background/10 p-1 backdrop-blur-sm lg:hidden">
        <MenuButton isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </header>
  );
};

export default TopBar;
