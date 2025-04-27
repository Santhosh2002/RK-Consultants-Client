import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Grid2,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClient } from "../../store/clientSlice";
import StyledTextField from "../../StyledComponents/StyledTextField";
import FileUploadField from "../../StyledComponents/FileUploadField";
import { isUploading } from "../../store/fileUploadSlice";

const industries = [
  "Construction",
  "Interior Design",
  "Real Estate",
  "Legal",
  "IT",
  "Other",
];
const clientTypes = ["Business", "Individual"];

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

export default function ClientPopup({
  isOpen,
  onClose,
  existingClient = null,
}) {
  const dispatch = useDispatch();
  const uploadingImg = useSelector(isUploading);

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

  useEffect(() => {
    if (existingClient) {
      console.log("Existing Client:", existingClient);

      reset({
        name: existingClient.name || "",
        email: existingClient.email || "",
        phone: existingClient.phone || "",
        companyName: existingClient.companyName || "",
        website: existingClient.website || "",
        industry: existingClient.industry || "",
        clientType: existingClient.clientType || "Business",
        image: existingClient.image || "",
        location: {
          city: existingClient.location?.city || "",
          state: existingClient.location?.state || "",
          country: existingClient.location?.country || "",
        },
        socialLinks: {
          linkedin: existingClient.socialLinks?.linkedin || "",
          twitter: existingClient.socialLinks?.twitter || "",
          facebook: existingClient.socialLinks?.facebook || "",
        },
      });
    } else {
      reset();
    }
  }, [existingClient, reset]);

  const onSubmit = (data) => {
    if (existingClient) {
      dispatch(updateClient({ id: existingClient._id, clientData: data }))
        .unwrap()
        .then(() => {
          reset();
          onClose();
        })
        .catch(console.error);
    } else {
      dispatch(createClient(data))
        .unwrap()
        .then(() => {
          reset();
          onClose();
        })
        .catch(console.error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        {existingClient ? "Update Client" : "Add New Client"}
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
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {[
            { name: "industry", options: industries },
            { name: "clientType", options: clientTypes },
          ].map(({ name, options }) => (
            <Grid2 item size={{ xs: 12, sm: 6 }} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    select
                    label={name.charAt(0).toUpperCase() + name.slice(1)}
                    options={options.map((o) => ({ value: o, label: o }))}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {["city", "state", "country"].map((fieldKey) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={fieldKey}>
              <Controller
                name={`location.${fieldKey}`}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label={fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
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

          {["linkedin", "twitter", "facebook"].map((fieldKey) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={fieldKey}>
              <Controller
                name={`socialLinks.${fieldKey}`}
                control={control}
                render={({ field }) => (
                  <StyledTextField
                    {...field}
                    label={`Social - ${fieldKey}`}
                    error={!!errors.socialLinks?.[fieldKey]}
                    helperText={errors.socialLinks?.[fieldKey]?.message || ""}
                  />
                )}
              />
            </Grid2>
          ))}

          {/* Image Upload */}
          <Grid2 item size={{ xs: 12 }}>
            <FileUploadField
              control={control}
              setValue={setValue}
              fieldName="image"
              multiple={false}
              defaultUrls={existingClient ? [existingClient.image] : []} // ✅ pass default image
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF", color: "white" }}
          disabled={!isValid || uploadingImg}
          onClick={handleSubmit(onSubmit)}
        >
          {existingClient ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
