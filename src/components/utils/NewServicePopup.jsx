import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { createService, updateService } from "../../store/servicesSlice"; // (optional future updateService if needed)
import StyledTextField from "../../StyledComponents/StyledTextField";
import FileUploadField from "../../StyledComponents/FileUploadField";
import { isUploading, resetUploadState } from "../../store/fileUploadSlice";

/* ──────────────────────────────────────────────────
   ▸ Static options
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
export default function NewServicePopup({
  isOpen,
  onClose,
  existingService = null,
}) {
  const dispatch = useDispatch();
  const isImgUploading = useSelector(isUploading);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
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

  /* ----- Handle Create or Update ------------------------------------------- */
  const onSubmit = async (data) => {
    try {
      if (existingService) {
        await dispatch(
          updateService({ id: existingService._id, ServiceData: data })
        ).unwrap();
      } else {
        await dispatch(createService(data)).unwrap();
      }
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
    dispatch(resetUploadState());
  };

  /* ----- Pre-populate when editing ------------------------------------------- */
  useEffect(() => {
    if (existingService && isOpen) {
      const cleanData = { ...existingService };
      if (!Array.isArray(cleanData.images)) {
        cleanData.images = []; // fallback if missing
      }
      reset(cleanData);
    } else if (!isOpen) {
      reset();
    }
  }, [existingService, isOpen, reset]);

  /* ────────────────────────────────────────────────── */
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        {existingService ? "Update Service" : "Add New Service"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#141414" }}>
        {/* Main Form */}
        <Grid2 container spacing={2} component="form">
          {/* Basic Fields */}
          {[
            { name: "name", label: "Service Name" },
            { name: "slug", label: "Slug (URL‑friendly)" },
            { name: "price", label: "Price (INR)", type: "number" },
          ].map(({ name, label, type }) => (
            <Grid2 item size={{ xs: 12, sm: 6 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    type={type || "text"}
                    label={label}
                    placeholder={label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Description */}
          <Grid2 item size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  multiline
                  rows={3}
                  label="Service Description"
                  placeholder="Detailed service description..."
                  error={!!errors.description}
                  helperText={errors.description?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Dropdown Fields */}
          {[
            { name: "category", options: categories, label: "Category" },
            {
              name: "serviceType",
              options: serviceTypes,
              label: "Service Type",
            },
            { name: "status", options: statusOptions, label: "Status" },
          ].map(({ name, options, label }) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    select
                    label={label}
                    placeholder={label}
                    options={options.map((o) => ({ value: o, label: o }))}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* File Upload Field */}
          <Grid2 item size={{ xs: 12 }}>
            <FileUploadField
              control={control}
              setValue={setValue}
              fieldName="images"
              label="Service Images"
              accept="image/*"
              multiple
              defaultUrls={existingService ? existingService.images : []} // Pass initial files for edit
            />
          </Grid2>
        </Grid2>

        {/* Sub-Services Section */}
        <Box
          mt={6}
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
            {[
              { name: "name", label: "Sub‑Service Name" },
              { name: "description", label: "Sub‑Service Description" },
              {
                name: "price",
                label: "Sub‑Service Price (INR)",
                type: "number",
              },
            ].map(({ name, label, type }) => (
              <Grid2
                item
                size={{ xs: 12 }}
                sm={name === "description" ? 5 : 3}
                key={name}
              >
                <Controller
                  name={`subServices.${idx}.${name}`}
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      type={type || "text"}
                      label={label}
                      placeholder={label}
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

      {/* Footer Actions */}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF", color: "white" }}
          disabled={!isValid || isImgUploading}
          onClick={handleSubmit(onSubmit)}
        >
          {existingService ? "Update Service" : "Create Service"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
