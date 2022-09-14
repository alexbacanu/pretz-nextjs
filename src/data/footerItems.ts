import { FooterItem } from "src/lib/types/footer";

export const FOOTER_ITEMS: Array<FooterItem> = [
  {
    header: "Products",
    children: [
      {
        label: "Popular",
        href: "/search?type=products",
      },
      {
        label: "Deals",
        href: "/search?type=deals",
      },
      {
        label: "Tracking",
        href: "/user/tracking",
      },
    ],
  },
  {
    header: "Follow Us",
    children: [
      {
        label: "Facebook",
        href: "https://www.facebook.com",
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
      },
      {
        label: "Twitter",
        href: "https://twitter.com",
      },
    ],
  },
  {
    header: "Support",
    children: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Terms & Conditions",
        href: "/terms",
      },
      {
        label: "Privacy Policy",
        href: "/privacy",
      },
    ],
  },
];
