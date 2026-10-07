import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const useSideBar = ({ isOpen, onClose }: Props) => {
  const location = useLocation();
  const previousPathname = useRef(location.pathname);
  const [isDesktop, setIsDesktop] = useState(() =>
    window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateIsDesktop);
    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  useEffect(() => {
    if (previousPathname.current !== location.pathname && isOpen) onClose();
    previousPathname.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || isDesktop) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDesktop, isOpen]);

  useEffect(() => {
    if (!isOpen || isDesktop) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktop, isOpen, onClose]);

  return { isMobileClosed: !isDesktop && !isOpen };
};

export default useSideBar;
