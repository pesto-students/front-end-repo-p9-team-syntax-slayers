import { extendTheme } from "@chakra-ui/react";

export const saloniTheme = extendTheme({
    colors:{
        accent: {
            50: "#F61732",
            100: "#F61732",
            200: "#F61732",
            300: "#F61732",
            400: "#F61732",
            500: "#F61732",
            600: "#F61732",
            700: "#F61732",
            800: "#F61732",
            900: "#F61732",
          },
        secondary:"#f8f6f7",
        primary:"#242C2F"
    },
    components:{
        Button: {
            sizes: {
              '2xl': {
                h: "44px",
                fontSize: "3xl",
                fontWeight:'thin',
                px: "32px",
              },
            },
          },
          
    }

})