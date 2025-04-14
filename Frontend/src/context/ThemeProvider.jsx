// theme.js or wherever you create your MUI theme
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            // Add custom 4K breakpoint
            '4k': 2560,
        },
    },
});

export default theme;
