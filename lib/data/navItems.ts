import {
  IconDiscount2,
  IconDownload,
  IconGiftCard,
  IconShoppingCart,
  TablerIcon,
} from "@tabler/icons";

interface HeaderItem {
  label: string;
  arialabel: string;
  href: string;
  icon: TablerIcon;
}

interface FooterItem {
  label: string;
  arialabel: string;
  href: string;
  icon: string;
}

export const HEADER_ITEMS: Array<HeaderItem> = [
  {
    label: "Home",
    arialabel: "Home page",
    href: "/",
    icon: IconShoppingCart,
  },
  {
    label: "Deals",
    arialabel: "Deals page",
    href: "/deals",
    icon: IconDiscount2,
  },
  {
    label: "Vouchers",
    arialabel: "Vouchers page",
    href: "/vouchers",
    icon: IconGiftCard,
  },
  {
    label: "Downloads",
    arialabel: "Downloads page",
    href: "/download",
    icon: IconDownload,
  },
];

export const FOOTER_ITEMS: Array<FooterItem> = [
  {
    label: "Contact us",
    arialabel: "Contact us page",
    href: "/contact",
    icon: "",
  },
  {
    label: "Terms and conditions",
    arialabel: "Terms and conditions page",
    href: "/legal/terms",
    icon: "",
  },
  {
    label: "Privacy policy",
    arialabel: "Privacy policy page",
    href: "/legal/privacy",
    icon: "",
  },
  {
    label: "Cookies",
    arialabel: "Cookies usage page",
    href: "/legal/cookies",
    icon: "",
  },
  {
    label: "GDPR",
    arialabel: "GDPR page",
    href: "/legal/gdpr",
    icon: "",
  },
];
