import SideBarBackdrop from "./SideBarBackdrop";
import SideBarFooter from "./SideBarFooter";
import SideBarHeader from "./SideBarHeader";
import SideBarNavigation from "./SideBarNavigation";
import useSideBar from "./hooks/useSideBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SideBar = ({ isOpen, onClose }: Props) => {
  const { isMobileClosed } = useSideBar({ isOpen, onClose });

  return (
    <>
      <SideBarBackdrop isOpen={isOpen} onClose={onClose} />

      <aside
        aria-label="Hauptnavigation"
        aria-hidden={isMobileClosed}
        inert={isMobileClosed}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-primary-hover shadow-xl dark:bg-primary-hover
          transition-[transform,visibility] duration-300 ease-out
          ${isOpen ? "visible translate-x-0" : "invisible -translate-x-full"}
          lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:visible lg:z-auto
          lg:w-64 lg:translate-x-0 lg:shadow-none
        `}
      >
        <div className="flex h-full flex-col overflow-y-auto pt-20 lg:pt-6">
          <SideBarHeader />
          <SideBarNavigation onClose={onClose} />
          <SideBarFooter onClose={onClose} />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
