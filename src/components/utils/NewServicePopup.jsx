// ✅ Refactored NewServicePopup using MUI + StyledTextField
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { Close, Add, Delete } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createService } from "../../store/servicesSlice";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "../../StyledComponents/ImageUploadComponent";

/* ──────────────────────────────────────────────────
   ▸ Static option lists
   ────────────────────────────────────────────────── */
const categories = [
  "Construction",
  "Interior Design",
  "Real Estate Consulting",
  "Legal Services",
  "Business",
  "Other",
];
const serviceTypes = ["Standard", "Premium", "Basic", "Custom"];
const statusOptions = ["Available", "Temporarily Unavailable", "Discontinued"];

/* ──────────────────────────────────────────────────
   ▸ Yup validation
   ────────────────────────────────────────────────── */
const validationSchema = Yup.object({
  name: Yup.string().required("Service name is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().oneOf(categories).required("Category is required"),
  serviceType: Yup.string()
    .oneOf(serviceTypes)
    .required("Service type is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Must be positive")
    .required("Price is required"),
  status: Yup.string().oneOf(statusOptions),
  subServices: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string(),
        price: Yup.number()
          .typeError("Price must be a number")
          .positive("Must be positive")
          .required("Price is required"),
      })
    )
    .min(1, "At least one sub‑service"),
});

/* ──────────────────────────────────────────────────
   ▸ Component
   ────────────────────────────────────────────────── */
export default function NewServicePopup({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category: "",
      serviceType: "Standard",
      price: "",
      currency: "INR",
      images: [],
      status: "Available",
      subServices: [{ name: "", description: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subServices",
  });

  /* ----- Submit handler ------------------------------------------- */
  const onSubmit = (data) => {
    dispatch(createService(data))
      .unwrap()
      .then(() => {
        reset();
        onClose();
      })
      .catch(console.error);
  };

  /* ────────────────────────────────────────────────── */
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        Add New Service
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#141414" }}>
        {/* ------------- Main form ------------- */}
        <Grid2 container spacing={2} component="form">
          {/* Left/Right column fields */}
          {[
            { name: "name", label: "Service Name" },
            { name: "slug", label: "Slug (URL‑friendly)" },
            { name: "price", label: "Price", type: "number" },
          ].map(({ name, label, type }) => (
            <Grid2 item size={{ xs: 12, sm: 6 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    type={type || "text"}
                    placeholder={label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Description (full width) */}
          <Grid2 item size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  multiline
                  rows={3}
                  placeholder="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Selects */}
          {[
            {
              name: "category",
              options: categories,
              placeholder: "Category",
            },
            {
              name: "serviceType",
              options: serviceTypes,
              placeholder: "Service Type",
            },
            {
              name: "status",
              options: statusOptions,
              placeholder: "Status",
            },
          ].map(({ name, options, placeholder }) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={name}>
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

          {/* Image upload */}
          <ImageUploadComponent
            images={watch("images")}
            setImages={(files) => control.setValue("images", files)}
          />
        </Grid2>

        {/* -------- Sub‑services section -------- */}
        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Sub‑Services</Typography>
          <Button
            startIcon={<Add />}
            onClick={() => append({ name: "", description: "", price: "" })}
          >
            Add Sub‑Service
          </Button>
        </Box>

        {fields.map((item, idx) => (
          <Grid2 container spacing={2} key={item.id} mt={1}>
            {["name", "description", "price"].map((fieldKey) => (
              <Grid2
                item
                size={{ xs: 12 }}
                sm={fieldKey === "description" ? 5 : 3}
                key={fieldKey}
              >
                <Controller
                  name={`subServices.${idx}.${fieldKey}`}
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      type={fieldKey === "price" ? "number" : "text"}
                      placeholder={
                        fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)
                      }
                    />
                  )}
                />
              </Grid2>
            ))}
            <Grid2
              item
              size={{ xs: 12, sm: 1 }}
              display="flex"
              alignItems="center"
            >
              <IconButton onClick={() => remove(idx)}>
                <Delete />
              </IconButton>
            </Grid2>
          </Grid2>
        ))}
      </DialogContent>

      {/* ------------- Actions ------------- */}
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
