import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid2,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import StyledTextField from "../../StyledComponents/StyledTextField";
import FileUploadField from "../../StyledComponents/FileUploadField";
import { useSelector } from "react-redux";
import { isUploading } from "../../store/fileUploadSlice";

const ratingOptions = [1, 2, 3, 4, 4.5, 5];

const validationSchema = Yup.object({
  rating: Yup.number().required("Rating is required"),
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
  showMoreLink: Yup.string().url("Must be a valid URL"),
  author: Yup.object({
    name: Yup.string().required("Author Name is required"),
    avatarUrl: Yup.string().required("Avatar is required"),
    location: Yup.object({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
    }),
  }),
});

export default function TestimonialPopup({
  isOpen,
  onClose,
  onSubmit,
  existingTestimonial,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      rating: "",
      title: "",
      message: "",
      showMoreLink: "",
      author: {
        name: "",
        avatarUrl: "",
        location: { country: "", state: "" },
      },
    },
  });
  const isImageUploading = useSelector(isUploading);

  useEffect(() => {
    if (existingTestimonial) {
      reset(existingTestimonial); // fill form if updating
    } else {
      reset({
        rating: "",
        title: "",
        message: "",
        showMoreLink: "",
        author: {
          name: "",
          avatarUrl: "",
          location: { country: "", state: "" },
        },
      }); // clear form if adding new
    }
  }, [existingTestimonial, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        {existingTestimonial ? "Update Testimonial" : "Add Testimonial"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#141414" }}>
        <Grid2 container spacing={2} component="form">
          {/* Rating */}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  select
                  placeholder="Rating"
                  options={ratingOptions.map((r) => ({
                    value: r,
                    label: r.toString(),
                  }))}
                  error={!!errors.rating}
                  helperText={errors.rating?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Title */}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Message */}
          <Grid2 item size={{ xs: 12 }}>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  multiline
                  minRows={3}
                  placeholder="Message"
                  error={!!errors.message}
                  helperText={errors.message?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Show More Link */}
          <Grid2 item size={{ xs: 12 }}>
            <Controller
              name="showMoreLink"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Show More Link (optional)"
                  error={!!errors.showMoreLink}
                  helperText={errors.showMoreLink?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Author Name */}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <Controller
              name="author.name"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Author Name"
                  error={!!errors.author?.name}
                  helperText={errors.author?.name?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Location - Country */}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <Controller
              name="author.location.country"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Country"
                  error={!!errors.author?.location?.country}
                  helperText={errors.author?.location?.country?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Location - State */}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <Controller
              name="author.location.state"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="State"
                  error={!!errors.author?.location?.state}
                  helperText={errors.author?.location?.state?.message || ""}
                />
              )}
            />
          </Grid2>

          {/* Avatar Upload */}
          <FileUploadField
            control={control}
            setValue={setValue}
            fieldName="author.avatarUrl"
            label="Author Avatar"
            accept="image/*"
            multiple={false}
            defaultUrls={
              existingTestimonial ? [existingTestimonial.author.avatarUrl] : []
            }
          />
        </Grid2>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF", color: "white" }}
          disabled={!isValid || isImageUploading}
          onClick={handleSubmit(handleFormSubmit)}
        >
          {existingTestimonial ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
