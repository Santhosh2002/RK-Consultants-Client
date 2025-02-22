import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
  Grid2,
} from "@mui/material";
import { Add, Delete, Close, UploadFile } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createService } from "../../store/servicesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Service Name is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  serviceType: Yup.string().required("Service Type is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});

const NewServicePopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category: "",
      serviceType: "",
      price: "",
      images: [],
      subServices: [{ name: "", description: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subServices",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setValue("images", files);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    setValue("images", newFiles);
  };

  const onSubmit = (data) => {
    dispatch(createService({ ...data, images: selectedFiles }))
      .unwrap()
      .then(() => {
        reset();
        onClose();
      })
      .catch((error) => console.error("Error creating service:", error));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Add New Service
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {[
              "name",
              "slug",
              "description",
              "category",
              "serviceType",
              "price",
            ].map((field) => (
              <Grid2 item size={{ xs: 12, sm: 6 }} key={field}>
                <Controller
                  name={field}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={
                        field.name.charAt(0).toUpperCase() + field.name.slice(1)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "1px solid white",
                          },
                          "&:hover fieldset": {
                            border: "1px solid #805ad5",
                          },
                          "&.Mui-focused fieldset": {
                            border: "1px solid #6A5ACD", // Optional: Add focus border color
                          },
                        },
                      }}
                      fullWidth
                      variant="outlined"
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message || ""}
                    />
                  )}
                />
              </Grid2>
            ))}
            <Grid2 item size={{ xs: 12 }}>
              <Box
                sx={{
                  padding: "30px",
                  border: "2px dashed grey",
                  textAlign: "center",
                }}
              >
                <input
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
                <UploadFile sx={{ fontSize: 50, color: "primary.main" }} />
                <Typography>Drag & drop or click to upload images</Typography>
              </Box>
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton onClick={() => handleRemoveFile(index)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Grid2>
          </Grid2>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0 0 20px 0",
            }}
          >
            <Typography variant="h6">Sub Services</Typography>
            <Button
              onClick={() => append({ name: "", description: "", price: "" })}
              startIcon={<Add />}
            >
              Add Sub Service
            </Button>
          </Box>
          {fields.map((subService, index) => (
            <Grid2 container spacing={2} key={subService.id}>
              {["name", "description", "price"].map((subField) => (
                <Grid2 item xs={4} key={subField} flexGrow={1}>
                  <Controller
                    name={`subServices.${index}.${subField}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={
                          subField.charAt(0).toUpperCase() + subField.slice(1)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "1px solid white",
                            },
                            "&:hover fieldset": {
                              border: "1px solid #805ad5",
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #6A5ACD", // Optional: Add focus border color
                            },
                          },
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid2>
              ))}
              <Grid2 item size={{ xs: 1 }}>
                <IconButton onClick={() => remove(index)}>
                  <Delete />
                </IconButton>
              </Grid2>
            </Grid2>
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={!isValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewServicePopup;
