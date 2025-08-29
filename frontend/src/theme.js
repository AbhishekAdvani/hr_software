// src/theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const themeChakra = extendTheme({
  config: {
    initialColorMode: "dark", // default
    useSystemColorMode: false, // don’t let OS override
  },
  styles: {
    global: (props) => ({
      "html, body, #root": {
        bg: mode("white", "gray.900")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
    }),
  },
});

export default themeChakra;
