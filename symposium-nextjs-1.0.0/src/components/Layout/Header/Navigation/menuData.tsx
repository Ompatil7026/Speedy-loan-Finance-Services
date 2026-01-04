import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Homepage", href: "/" },
  { label: "Plans", href: "/schedules" },
  { label: "Banks coverd", href: "/speakers" },
  {
    label: "Loans",
    href: "/blog",
    submenu: [
      { label: "Loan list", href: "/blog" },
      { label: "Loan details", href: "/blog/blog_1" },
    ],
  },
  { label: "Address", href: "/contact" },
  { label: "Documentation", href: "/documentation" },
];  