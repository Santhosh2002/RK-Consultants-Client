import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import StyledTextField from "../../StyledComponents/StyledTextField";

export default function UpdateStatPopup({
  isOpen,
  onClose,
  onSubmit,
  statKey,
  defaultValue,
}) {
  const validationSchema = Yup.object({
    newValue: Yup.number()
      .typeError("Must be a number")
      .required("Value is required")
      .positive("Must be positive"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      newValue: defaultValue ?? 0,
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data.newValue); // Send back only the newValue
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ pr: 6 }}>
        Update {statKey.replace(/([A-Z])/g, " $1").trim()}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#141414" }}>
        <Controller
          name="newValue"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              type="number"
              placeholder="Enter new value"
              error={!!errors.newValue}
              helperText={errors.newValue?.message || ""}
              fullWidth
            />
          )}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF", color: "white" }}
          disabled={!isValid}
          onClick={handleSubmit(handleFormSubmit)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
