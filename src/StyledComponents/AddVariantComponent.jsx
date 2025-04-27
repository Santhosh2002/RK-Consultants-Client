// ✅ VariantForm — controller-ised version
import React from "react";
import { Typography, Button, IconButton, Box, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext, Controller } from "react-hook-form";

import StyledTextField from "./StyledTextField";
import FileUploadField from "./FileUploadField";

// ▶︎ Default empty record for a new variant row
const emptyVariant = {
  bhk: "",
  floor: "",
  totalFloors: "",
  balcony: 0,
  carpetArea: "",
  builtUpArea: "",
  price: "",
  currency: "INR",
  bedrooms: 0,
  bathrooms: 0,
  facing: "",
  availability: true,
  images: [],
  video: "", // ✅ single URL string
};

const VariantForm = ({ variants, setVariants }) => {
  /* -------------------------------------------------------------------- */
  /* react-hook-form helpers                                              */
  /* -------------------------------------------------------------------- */
  const { control, setValue } = useFormContext();

  /* -------------------------------------------------------------------- */
  /* handlers                                                             */
  /* -------------------------------------------------------------------- */
  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    const isLastFilled = last
      ? Object.values(last).every((val) => val !== "" && val !== null)
      : true;

    if (isLastFilled) {
      setVariants([...variants, { ...emptyVariant }]);
    } else {
      alert(
        "Please fill the previous variant completely before adding a new one."
      );
    }
  };

  const handleRemove = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  /* -------------------------------------------------------------------- */
  /* layout helpers                                                       */
  /* -------------------------------------------------------------------- */
  const getGridSize = (field) => {
    switch (field) {
      case "price":
      case "carpetArea":
      case "builtUpArea":
      case "currency":
        return 6;
      case "bhk":
      case "floor":
      case "totalFloors":
      case "balcony":
        return 3;
      case "facing":
      case "availability":
        return 4;
      case "images":
      case "video":
        return 12;
      default:
        return 4;
    }
  };

  /* -------------------------------------------------------------------- */
  /* render                                                               */
  /* -------------------------------------------------------------------- */
  return (
    <Grid2 container direction="column" spacing={2}>
      {/* header row */}
      <Grid2
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Typography variant="h6">Variants</Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{ color: "#7C4DFF" }}
          onClick={handleAddVariant}
        >
          Add Variant
        </Button>
      </Grid2>

      {/* dynamic rows */}
      {variants?.map((variant, index) => (
        <Grid2
          container
          key={index}
          spacing={2}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            position: "relative",
            mt: 2,
          }}
        >
          {/* delete badge */}
          <IconButton
            onClick={() => handleRemove(index)}
            sx={{
              position: "absolute",
              top: -15,
              right: -15,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          {/* fields */}
          {Object.keys(emptyVariant).map((field) => (
            <Grid2 item size={{ xs: 12, sm: getGridSize(field) }} key={field}>
              {/* upload fields */}
              {field === "images" ? (
                <FileUploadField
                  control={control}
                  setValue={setValue}
                  fieldName={`variants.${index}.images`}
                  label="Variant Images"
                  accept="image/*"
                  multiple
                  defaultUrls={variant.images}
                />
              ) : field === "video" ? (
                <FileUploadField
                  control={control}
                  setValue={setValue}
                  fieldName={`variants.${index}.video`}
                  label="Variant Video"
                  accept="video/*"
                  multiple={false}
                  defaultUrls={variant.video ? [variant.video] : []}
                />
              ) : (
                /* text / numeric fields */
                <Controller
                  name={`variants.${index}.${field}`}
                  control={control}
                  render={({ field: c }) => (
                    <StyledTextField {...c} placeholder={`Enter ${field}`} />
                  )}
                />
              )}
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default VariantForm;
