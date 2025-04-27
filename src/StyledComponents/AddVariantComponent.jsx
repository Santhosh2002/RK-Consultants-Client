// ✅ VariantForm — useFieldArray + controller
import React from "react";
import { Typography, Button, IconButton, Box, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";

import StyledTextField from "./StyledTextField";
import FileUploadField from "./FileUploadField";

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
  video: "",
};

function getGridSize(field) {
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
}
const createVariant = () => ({
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
  images: [], // new array every time
  video: "", // empty string (single file field)
});

const VariantForm = () => {
  const { control, setValue } = useFormContext();

  // RHF-friendly array helpers
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddVariant = () => {
    const last = fields[fields.length - 1];
    const isLastFilled = last
      ? Object.values(last).every((v) => v !== "" && v !== null)
      : true;

    if (!isLastFilled) {
      alert("Please finish the previous variant before adding a new one.");
      return;
    }
    append(createVariant());
  };

  return (
    <Grid2 container direction="column" spacing={2}>
      {/* header row */}
      <Grid2
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
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
      {fields.map((item, index) => (
        <Grid2
          container
          key={item.id}
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
            onClick={() => remove(index)}
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

          {/* every property in the variant */}
          {Object.keys(emptyVariant).map((field) => (
            <Grid2
              item
              size={{ xs: 12, sm: getGridSize(field) }}
              key={`${index}-${field}`} // unique across rows
            >
              {field === "images" ? (
                <FileUploadField
                  control={control}
                  setValue={setValue}
                  fieldName={`variants.${index}.images`}
                  label="Variant Images"
                  accept="image/*"
                  multiple
                  defaultUrls={item.images} // Pass initial files for edit
                />
              ) : field === "video" ? (
                <FileUploadField
                  control={control}
                  setValue={setValue}
                  fieldName={`variants.${index}.video`}
                  label="Variant Video"
                  accept="video/*"
                  multiple={false}
                  defaultUrls={item.video ? [item.video] : []} // Pass initial files for edit
                />
              ) : (
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
