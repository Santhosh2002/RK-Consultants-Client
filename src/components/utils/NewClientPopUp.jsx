import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
  Box,
  Grid2,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createClient } from "../../store/clientSlice";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "../../StyledComponents/ImageUploadComponent";

/* ──────────────────────────────────────────────────
   ▸ Static options
   ────────────────────────────────────────────────── */
const industries = [
  "Construction",
  "Interior Design",
  "Real Estate",
  "Legal",
  "IT",
  "Other",
];
const clientTypes = ["Business", "Individual"];

/* ──────────────────────────────────────────────────
   ▸ Yup validation
   ────────────────────────────────────────────────── */
const validationSchema = Yup.object({
  name: Yup.string().required("Client name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  companyName: Yup.string().required("Company name is required"),
  website: Yup.string().url("Invalid URL"),
  industry: Yup.string().oneOf(industries),
  clientType: Yup.string().oneOf(clientTypes),
  image: Yup.string().url(),
  location: Yup.object().shape({
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  }),
  socialLinks: Yup.object().shape({
    linkedin: Yup.string().url("Invalid URL"),
    twitter: Yup.string().url("Invalid URL"),
    facebook: Yup.string().url("Invalid URL"),
  }),
});

/* ──────────────────────────────────────────────────
   ▸ Component
   ────────────────────────────────────────────────── */
export default function NewClientPopup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      website: "",
      industry: "",
      clientType: "Business",
      image: "",
      location: { city: "", state: "", country: "" },
      socialLinks: { linkedin: "", twitter: "", facebook: "" },
    },
  });

  const onSubmit = (data) => {
    dispatch(createClient(data))
      .unwrap()
      .then(() => {
        reset();
        onClose();
      })
      .catch(console.error);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        Add New Client
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#141414" }}>
        <Grid2 container spacing={2} component="form">
          {[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email" },
            { name: "phone", label: "Phone" },
            { name: "companyName", label: "Company Name" },
            { name: "website", label: "Website" },
          ].map(({ name, label }) => (
            <Grid2 item size={{ xs: 12, sm: 6 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder={label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Dropdowns */}
          {[
            {
              name: "industry",
              options: industries,
              placeholder: "Industry",
            },
            {
              name: "clientType",
              options: clientTypes,
              placeholder: "Client Type",
            },
          ].map(({ name, options, placeholder }) => (
            <Grid2 item size={{ xs: 12, sm: 6 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    select
                    options={options.map((o) => ({ value: o, label: o }))}
                    placeholder={placeholder}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Location */}
          {["city", "state", "country"].map((fieldKey) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={fieldKey}>
              <Controller
                name={`location.${fieldKey}`}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder={
                      fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)
                    }
                    error={!!errors.location?.[fieldKey]}
                    helperText={errors.location?.[fieldKey]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Social Links */}
          {["linkedin", "twitter", "facebook"].map((fieldKey) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={fieldKey}>
              <Controller
                name={`socialLinks.${fieldKey}`}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder={`Social - ${fieldKey}`}
                    error={!!errors.socialLinks?.[fieldKey]}
                    helperText={errors.socialLinks?.[fieldKey]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Image Upload */}
          <ImageUploadComponent
            images={watch("image") ? [watch("image")] : []}
            setImages={(files) => {
              const url = files[0];
              setValue("image", url);
            }}
            single
          />
        </Grid2>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF", color: "white" }}
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
