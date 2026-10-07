export type SideBarNavItemConfig = {
  linkName: string;
  link: string;
  end?: boolean;
  children?: {
    linkName: string;
    link: string;
  }[];
};

export const sideBarNavItems: SideBarNavItemConfig[] = [
  { linkName: "Übersicht", link: "/dashboard", end: true },
  {
    linkName: "FokusFlow",
    link: "/dashboard/todo",
    children: [{ linkName: "Einblicke", link: "/dashboard/todo/analytics" }],
  },
  { linkName: "Zahlenrausch", link: "/dashboard/2048" },
  { linkName: "Zeitblick", link: "/dashboard/events" },
];
