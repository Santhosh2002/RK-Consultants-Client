import { TextField, MenuItem } from "@mui/material";

const StyledTextField = ({ placeholder, required, multiline, minRows, options, select, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      required={required}
      multiline={multiline}
      minRows={minRows}
      select={select} // Enables select dropdown when true
      InputLabelProps={{ style: { color: "#999999" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#1A1A1A",
          "& fieldset": { borderColor: "#262626" },
          "&:hover fieldset": { borderColor: "#262626" },
          "& .MuiInputBase-input": { color: "#666666" },
        },
      }}
      {...props}
    >
      {select &&
        options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default StyledTextField;
