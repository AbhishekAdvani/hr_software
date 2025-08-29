// src/theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const themeChakra = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      "html, body, #root": {
        bg: mode("white", "gray.900")(props), // light → white, dark → gray.900
        color: mode("gray.800", "whiteAlpha.900")(props), // text adjusts
      },
    }),
  },
});

export default themeChakra;
