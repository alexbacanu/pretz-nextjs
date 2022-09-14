// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  colors: {
    brand: {
      "50": "#F1EBFA",
      "100": "#D7C7F0",
      "200": "#BDA3E6",
      "300": "#A37EDC",
      "400": "#895AD3",
      "500": "#6F36C9",
      "600": "#592BA1",
      "700": "#432178",
      "800": "#2C1650",
      "900": "#160B28",
    },
    blue: {
      "50": "#ECEFF9",
      "100": "#CAD3ED",
      "200": "#A7B6E2",
      "300": "#859AD6",
      "400": "#627ECA",
      "500": "#4061BF",
      "600": "#334E99",
      "700": "#263A73",
      "800": "#1A274C",
      "900": "#0D1326",
    },
    red: {
      "50": "#FBE9ED",
      "100": "#F5C2CC",
      "200": "#EE9BAC",
      "300": "#E7738B",
      "400": "#E14C6A",
      "500": "#DA254A",
      "600": "#AE1E3B",
      "700": "#83162C",
      "800": "#570F1E",
      "900": "#2C070F",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "6px",
      },
      variants: {
        primary: {
          color: "white",
          bg: "brand.500",
          fontSize: ["sm", "sm", "md", "md"],
          _disabled: {
            opacity: 0.6,
          },
          _hover: {
            _disabled: {
              bg: "brand.500",
              opacity: 0.7,
            },
          },
        },
        secondary: {
          color: "blue.500",
          fontSize: ["sm", "sm", "md", "md"],
          bg: "white",
          borderColor: "none",
        },
        accent: {
          color: "red.500",
          bg: "white",
          border: "2px",
          borderColor: "brand.500",
          fontSize: ["sm", "sm", "md", "md"],
        },
      },
    },
    Link: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      variants: {
        primary: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
  },
  config,
});

export default theme;
