import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    "900": "#181b23"
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto"
  },

  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50"
      },
      a: {
        cursor: "pointer"
      },
    }
  }
})
