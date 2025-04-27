// ✅ NewListingPopup — fully “controller-ised” version
import React, { useEffect } from "react";
import { Box, Typography, Button, Modal, Grid2 } from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import StyledTextField from "../../StyledComponents/StyledTextField";
import VariantForm from "../../StyledComponents/AddVariantComponent";
import FileUploadField from "../../StyledComponents/FileUploadField";
import { createListing, updateListing } from "../../store/listingsSlice";
import { isUploading } from "../../store/fileUploadSlice";

// ───────────────────────────────────────── constants ──────────────────────────────────────────
const propertyTypes = [
  "Residential",
  "Commercial",
  "MAHA RERA",
  "Land",
  "Shop",
  "Other",
];
const transactionTypes = ["Lease", "Sale", "Both", "Other"];
const furnishingStatuses = ["Unfurnished", "Semi-Furnished", "Fully-Furnished"];
const statusOptions = ["Available", "Sold", "Rented", "Not Disclosed"];
const parkingOptions = [
  "Covered Stilt",
  "Covered Garage",
  "Open Fixed",
  "Open Not Fixed",
  "Mechanical",
  "None",
];
const elevatorAvailable = ["Yes", "No"];
const approvalOptions = ["Pending", "Approved", "Rejected"];
const occupationCertificateOptions = [
  "Yes",
  "No",
  "Yes - But up to some floors",
];
const buildingAgeOptions = [
  "Under Construction",
  "Less than 5 years",
  "5 years - 10 years",
  "More than 10 years",
];

// ───────────────────────────────────────── helpers ────────────────────────────────────────────
const emptyListing = {
  title: "",
  slug: "",
  description: "",
  contact: { phone: "", email: "" },
  images: [],
  video: [],
  virtualTour: [],
  brochure: [],
  visible: true,
  propertyType: "Residential",
  transactionType: "Sale",
  furnishingStatus: "Unfurnished",
  status: "Available",
  ownership: { name: "", email: "", number: "" },
  landmark: "",
  nearby: [],
  amenities: [],
  parking: "",
  elevator: false,
  location: {
    street: "",
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
  },
  approval: "Pending",
  occupationCertificate: "No",
  buildingAge: "Under Construction",
  commissionAgreement: "",
  finance: { approvedBy: [] },
  baseRate: { amountPerSqFt: "", currency: "INR" },
  parkingCharges: { suv: "", normal: "", currency: "INR" },
  variants: [
    {
      bhk: "",
      carpetArea: "",
      builtUpArea: "",
      facing: "",
      price: "",
      currency: "INR",
      bedrooms: 0,
      bathrooms: 0,
      images: [],
      video: [],
      balcony: 0,
      floor: "",
      totalFloors: "",
      availability: true,
    },
  ],
};

// ───────────────────────────────────────── component ──────────────────────────────────────────
function NewListingPopup({ isOpen, onClose, editingData = null }) {
  const dispatch = useDispatch();
  const isFilesUploading = useSelector(isUploading);

  const methods = useForm({
    defaultValues: emptyListing,
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = methods;

  // reset form when popup opens / closes or when editingData changes
  useEffect(() => {
    if (isOpen) {
      reset(editingData || emptyListing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editingData]);

  // ─────────────── onSubmit ───────────────
  const onSubmit = async (formData) => {
    // pre-process files for backend
    const payload = {
      ...formData,
      images: formData.images.map((f) => (f?.name ? f.name : f)),
      video: formData.video.map((f) => (f?.name ? f.name : f)),
      virtualTour: formData.virtualTour.map((f) => (f?.name ? f.name : f)),
      brochure: formData.brochure.map((f) => (f?.name ? f.name : f)),
      variants: formData.variants.map((v) => ({
        ...v,
        images: Array.isArray(v.images)
          ? v.images.map((f) => (f?.name ? f.name : f))
          : [],
        video: v.video ? (v.video?.name ? v.video.name : v.video) : "",
      })),
    };

    try {
      if (editingData) {
        await dispatch(
          updateListing({ id: editingData._id, ListingData: payload })
        ).unwrap();
      } else {
        await dispatch(createListing(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error("Error submitting listing:", err);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <FormProvider {...methods}>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          maxWidth: "50%",
          margin: "auto",
          overflowY: "auto",
          scrollbarWidth: "none",
          maxHeight: "90vh",
          backgroundColor: "#141414",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            borderRadius: "8px",
            padding: { xs: 3, md: 5 },
            border: "5px solid #262626",
            width: "100%",
          }}
        >
          <Grid2 container spacing={2}>
            {/* ─────────────── Title ─────────────── */}
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12 }}
            >
              <Typography>Title</Typography>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder="Enter title"
                    required
                  />
                )}
              />
            </Grid2>

            {/* ─────────────── Email ─────────────── */}
            <Grid2
              item
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Email</Typography>
              <Controller
                name="contact.email"
                control={control}
                render={({ field }) => (
                  <StyledTextField {...field} placeholder="Enter your email" />
                )}
              />
            </Grid2>

            {/* ─────────────── Phone ─────────────── */}
            <Grid2
              item
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Phone</Typography>
              <Controller
                name="contact.phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder="Enter your phone number"
                    required
                  />
                )}
              />
            </Grid2>

            {/* ─────────────── Description ─────────────── */}
            <Grid2
              item
              size={{ xs: 12 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Description</Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder="Description"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid2>

            {/* ─────────────── Property / Transaction / Furnishing / Status ─────────────── */}
            {[
              {
                name: "propertyType",
                label: "Property Type",
                options: propertyTypes,
              },
              {
                name: "transactionType",
                label: "Transaction Type",
                options: transactionTypes,
              },
              {
                name: "furnishingStatus",
                label: "Furnishing Status",
                options: furnishingStatuses,
              },
              {
                name: "status",
                label: "Status",
                options: statusOptions,
              },
            ].map(({ name, label, options }) => (
              <Grid2
                key={name}
                item
                size={{ xs: 12, sm: 6 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography>{label}</Typography>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      select
                      options={options.map((v) => ({ value: v, label: v }))}
                    />
                  )}
                />
              </Grid2>
            ))}

            {/* ─────────────── Landmark / Nearby / Amenities ─────────────── */}
            {[
              {
                name: "landmark",
                label: "Landmark",
                placeholder: "Enter landmark",
              },
              {
                name: "nearby",
                label: "Nearby Places",
                transform: (v) => v.split(",").map((x) => x.trim()),
              },
              {
                name: "amenities",
                label: "Amenities",
                transform: (v) => v.split(",").map((x) => x.trim()),
              },
            ].map(({ name, label, transform, placeholder }) => (
              <Grid2
                key={name}
                item
                size={{ xs: 12 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography>{label}</Typography>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      placeholder={
                        placeholder || `Enter ${label.toLowerCase()}`
                      }
                      onChange={(e) =>
                        field.onChange(
                          transform ? transform(e.target.value) : e.target.value
                        )
                      }
                    />
                  )}
                />
              </Grid2>
            ))}

            {/* ─────────────── File Uploads ─────────────── */}
            {[
              {
                name: "images",
                label: "Listing Images",
                accept: "image/*",
                multiple: true,
              },
              {
                name: "video",
                label: "Listing Videos",
                accept: "video/*",
                multiple: true,
              },
              {
                name: "virtualTour",
                label: "Virtual Tours",
                accept: "video/*",
                multiple: true,
              },
              {
                name: "brochure",
                label: "Brochures",
                accept: "application/pdf",
                multiple: true,
              },
            ].map(({ name, label, accept, multiple }) => (
              <FileUploadField
                key={name}
                control={control}
                setValue={setValue}
                fieldName={name}
                label={label}
                accept={accept}
                multiple={multiple}
                defaultUrls={watch(name)}
              />
            ))}

            {/* ─────────────── Parking / Elevator ─────────────── */}
            <Grid2
              item
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Parking</Typography>
              <Controller
                name="parking"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    select
                    options={parkingOptions.map((v) => ({
                      value: v,
                      label: v,
                    }))}
                  />
                )}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Elevator Available</Typography>
              <Controller
                name="elevator"
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    select
                    value={field.value ? "Yes" : "No"}
                    onChange={(e) => field.onChange(e.target.value === "Yes")}
                    options={elevatorAvailable.map((v) => ({
                      value: v,
                      label: v,
                    }))}
                  />
                )}
              />
            </Grid2>

            {/* ─────────────── Location ─────────────── */}
            <Grid2
              item
              size={{ xs: 12 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography>Location</Typography>
              <Grid2 container spacing={2}>
                {[
                  "street",
                  "city",
                  "state",
                  "country",
                  "latitude",
                  "longitude",
                ].map((part) => (
                  <Grid2 key={part} item size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name={`location.${part}`}
                      control={control}
                      render={({ field }) => (
                        <StyledTextField
                          {...field}
                          placeholder={
                            part.charAt(0).toUpperCase() + part.slice(1)
                          }
                        />
                      )}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>

            {/* ─────────────── Building info numbers ─────────────── */}
            {[
              {
                name: "commissionAgreement",
                placeholder: "Commission Agreement",
              },
              {
                name: "baseRate.amountPerSqFt",
                placeholder: "Base Rate (Amount per SqFt)",
                type: "number",
              },
              {
                name: "parkingCharges.suv",
                placeholder: "SUV Parking Charges",
                type: "number",
              },
              {
                name: "parkingCharges.normal",
                placeholder: "Normal Parking Charges",
                type: "number",
              },
            ].map(({ name, placeholder, type }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder={placeholder}
                    type={type || "text"}
                  />
                )}
              />
            ))}

            {/* ─────────────── Ownership ─────────────── */}
            {["name", "email", "number"].map((k) => (
              <Controller
                key={k}
                name={`ownership.${k}`}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    placeholder={`Ownership ${
                      k.charAt(0).toUpperCase() + k.slice(1)
                    }`}
                  />
                )}
              />
            ))}

            {/* ─────────────── Approval / OC / Age ─────────────── */}
            {[
              { name: "approval", options: approvalOptions },
              {
                name: "occupationCertificate",
                options: occupationCertificateOptions,
              },
              { name: "buildingAge", options: buildingAgeOptions },
            ].map(({ name, options }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    select
                    options={options.map((v) => ({ value: v, label: v }))}
                  />
                )}
              />
            ))}

            {/* ─────────────── Finance Approved By ─────────────── */}
            <Controller
              name="finance.approvedBy"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Finance Approved By (comma separated)"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((x) => x.trim())
                    )
                  }
                  value={field.value.join(", ")}
                />
              )}
            />

            {/* ─────────────── Variants ─────────────── */}
            <Controller
              name="variants"
              control={control}
              render={({ field }) => (
                <VariantForm
                  variants={field.value}
                  setVariants={field.onChange}
                />
              )}
            />

            {/* ─────────────── Submit ─────────────── */}
            <Grid2
              item
              size={{ xs: 12 }}
              mt={2}
              container
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#352d66" }}
                type="submit"
                disabled={isFilesUploading}
              >
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </FormProvider>
  );
}

export default NewListingPopup;
