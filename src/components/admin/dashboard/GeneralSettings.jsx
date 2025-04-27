// ✅ GeneralSettings – RHF + FileUploadField refactor (drop-in)
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  Container,
  Collapse,
  Grid2,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchGeneralSettings,
  updateGeneralSettings,
  getGeneralSettings,
  getSettingsLoader,
  getSettingsUpdater,
} from "../../../store/generalSettingsSlice";

import StyledTextField from "../../../StyledComponents/StyledTextField"; // adjust import path if needed
import FileUploadField from "../../../StyledComponents/FileUploadField"; // single-file mode
import { Grid } from "lucide-react";

/* ───────────────────────── prettier helpers ───────────────────────── */
const capitalize = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

/* ───────────────────────── field groupings ───────────────────────── */
const SMALL = ["title", "contact", "email", "phone"]; // 3-column
const MEDIUM = ["address", "facebook", "instagram", "linkedin"]; // 6-column
const LARGE = ["about", "terms", "privacy", "refundPolicy", "shippingPolicy"]; // full-width

export default function GeneralSettings() {
  const dispatch = useDispatch();
  const settings = useSelector(getGeneralSettings);
  const loading = useSelector(getSettingsLoader);
  const updating = useSelector(getSettingsUpdater);

  /* ───── react-hook-form ───── */
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({ defaultValues: {} });

  /* preview for logo instantly */
  const [previewLogo, setPreviewLogo] = useState(null);

  /* fetch once */
  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  /* populate form when redux brings data */
  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const isEditing = watch("__isEditing") ?? false; // hidden flag inside form
  const toggleEdit = (flag) => setValue("__isEditing", flag);

  /* ───── submit handler ───── */
  const onSubmit = async (data) => {
    const payload = { ...data };
    delete payload.__isEditing;

    dispatch(updateGeneralSettings(payload))
      .unwrap()
      .then(() => {
        toast.success("Settings updated successfully!");
        toggleEdit(false);
      })
      .catch(() => toast.error("Error updating settings"));
  };

  /* ───── long-text expand / collapse ───── */
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  /* ───── derived values ───── */

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ background: "#111", minHeight: "100vh", color: "#fff", py: 6 }}>
      <ToastContainer />
      <Container maxWidth="xl">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ background: "#1e1e1e", borderRadius: 3, p: 4 }}
        >
          {/* ───────────────────────── Header ───────────────────────── */}
          <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Grid2 item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={settings?.logo || previewLogo}
                alt="Logo"
                sx={{ width: 80, height: 80, border: "2px solid #7C4DFF" }}
              />
              <Typography variant="h4" fontWeight="bold">
                General Settings
              </Typography>
            </Grid2>

            {isEditing ? (
              <Grid2 item sx={{ display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={updating}
                  sx={{ bgcolor: "#7C4DFF", textTransform: "none" }}
                >
                  {updating ? "Saving…" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Cancel />}
                  onClick={() => {
                    reset(settings); // discard edits
                    toggleEdit(false);
                    setPreviewLogo(null);
                  }}
                  sx={{ bgcolor: "#D32F2F", textTransform: "none" }}
                >
                  Cancel
                </Button>
              </Grid2>
            ) : (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => toggleEdit(true)}
                sx={{ bgcolor: "#7C4DFF", textTransform: "none" }}
              >
                Edit
              </Button>
            )}
            <Grid2 item sx={{ display: "flex", gap: 2, flexGrow: 1 }} size={12}>
              {isEditing && (
                <FileUploadField
                  key={"logo"}
                  label="Logo"
                  accept="image/*"
                  control={control}
                  setValue={setValue}
                  fieldName="logo"
                  multiple={false}
                  defaultUrls={settings ? [settings.logo] : []}
                />
              )}
            </Grid2>
          </Grid2>

          {/* ───────────────────────── Small (3-col) fields ───────────────────────── */}
          <Grid2 container spacing={3}>
            {SMALL.map(
              (k) =>
                watch(k) !== undefined && (
                  <Grid2
                    key={k}
                    size={{
                      xs: 12,
                      sm: 3,
                    }}
                  >
                    <FieldBlock
                      label={capitalize(k)}
                      name={k}
                      control={control}
                      editable={isEditing}
                    />
                  </Grid2>
                )
            )}

            {/* ───────────────────────── Medium (6-col) fields ───────────────────────── */}
            {MEDIUM.map(
              (k) =>
                watch(k) !== undefined && (
                  <Grid2
                    key={k}
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <FieldBlock
                      label={capitalize(k)}
                      name={k}
                      control={control}
                      editable={isEditing}
                    />
                  </Grid2>
                )
            )}

            {/* ───────────────────────── Large (12-col) multi-line fields ───────────────────────── */}
            {LARGE.map(
              (k) =>
                watch(k) !== undefined && (
                  <Grid2 key={k} size={{ xs: 12 }}>
                    <Typography variant="h6" mb={1}>
                      {capitalize(k.replace(/([A-Z])/g, " $1").trim())}
                    </Typography>

                    {isEditing ? (
                      <Controller
                        name={k}
                        control={control}
                        render={({ field }) => (
                          <StyledTextField
                            {...field}
                            multiline
                            rows={8}
                            placeholder={capitalize(k)}
                          />
                        )}
                      />
                    ) : (
                      <>
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                          {expanded[k] || watch(k)?.length <= 180
                            ? watch(k) || "—"
                            : `${watch(k).slice(0, 180)}…`}
                        </Typography>
                        {watch(k) && watch(k).length > 180 && (
                          <Button
                            onClick={() => toggleExpand(k)}
                            sx={{ color: "#7C4DFF", textTransform: "none" }}
                            endIcon={
                              expanded[k] ? <ExpandLess /> : <ExpandMore />
                            }
                          >
                            {expanded[k] ? "Show less" : "Show more"}
                          </Button>
                        )}
                      </>
                    )}
                  </Grid2>
                )
            )}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
}

/* ───────────────────────── Re-usable small / medium field block ───────────────────────── */
function FieldBlock({ label, name, control, editable }) {
  return (
    <Box>
      <Typography variant="h6" mb={1}>
        {label.replace(/([A-Z])/g, " $1").trim()}
      </Typography>
      {editable ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => <StyledTextField {...field} />}
        />
      ) : (
        <Typography>{control._formValues?.[name] || "—"}</Typography>
      )}
    </Box>
  );
}
