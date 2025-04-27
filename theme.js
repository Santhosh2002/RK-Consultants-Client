import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    common: {
      white: "#FFF",
      black: "#000",
    },
    primary: {
      main: "#1A64FF", // Primary Purple
      light: "#FF9533", // Lighter Purple
      dark: "#FF7A00", // Dark Purple
    },
    secondary: {
      main: "#39ab62", // Supporting secondary color
      light: "#4ade80", // Lighter Purple
      dark: "#1f5e36", // Dark Purple
    },
    background: {
      default: "#1A1A1A", // Dark Background
      paper: "#262626", // Slightly lighter dark background
    },
    text: {
      primary: "#FFF",
      secondary: "#E4E4E7", // Light grey for readability
    },
    grey: {
      50: "#E4E4E7",
      100: "#F1F1F3",
      200: "#F7F7F8",
      300: "#FCFCFD",
      400: "#4D4D4D",
      500: "#666666",
      600: "#808080",
      700: "#999999",
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small devices
      sm: 600, // Small devices
      md: 960, // Medium devices
      lg: 1280, // Large devices
      xl: 1920, // Extra large devices
    },
  },
  typography: {
    fontFamily: "'Urbanist', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
  spacing: 8, // Base spacing unit
  components: {
    MuiSvgIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        sizeSmall: {
          width: 16,
          height: 16,
        },
        sizeMedium: {
          width: 20,
          height: 20,
        },
        sizeLarge: {
          width: 24,
          height: 24,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          zIndex: 99999,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiIconButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiBadge: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
    MuiAvatar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          width: 36,
          height: 36,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          // lineHeight: 1,
        },
        sizeMedium: {
          borderRadius: 8,
          height: 36,
          minHeight: 36,
          maxHeight: 36,
        },
        sizeSmall: {
          borderRadius: 8,
          height: 32,
          minHeight: 32,
          maxHeight: 32,
        },
        sizeLarge: {
          height: 40,
          minHeight: 40,
          maxHeight: 40,
          borderRadius: 8,
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        contained: {
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {},
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {},
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "#ffffff",
      },
      styleOverrides: {
        root: {
          "& > .MuiFormHelperText-root": {
            marginLeft: 11,
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "#ffffff",
      },
      styleOverrides: {
        shrink: {
          transform: "translate(11px, -7px) scale(0.8)",
        },
        root: {
          transform: "translate(11px, 8px) scale(1)",
          "&.Mui-focused": {},
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        color: "#ffffff",
      },
      styleOverrides: {
        select: {
          minHeight: 0,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // height: 36,
          minHeight: 36,
          borderRadius: 8,
          lineHeight: 1,
        },
        legend: {
          fontSize: "0.75em",
        },
        input: {
          padding: "5px 11px",
        },
        adornedStart: {
          paddingLeft: `11px!important`,
        },
        sizeSmall: {
          height: 32,
          minHeight: 32,
          borderRadius: 8,
        },
        sizeMedium: {
          height: 36,
          minHeight: 36,
          borderRadius: 8,
        },
        sizeLarge: {
          height: 40,
          minHeight: 40,
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "#ffffff",
      },
      styleOverrides: {
        root: {
          // paddingLeft: 11
        },
        input: {
          padding: "5px 11px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:before, &:after": {
            display: "none",
          },
        },

        input: {
          padding: "5px 11px",
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { color: "text.secondary" },
          style: {
            color: "text.secondary",
          },
        },
      ],
    },
  },
});

export default theme;
