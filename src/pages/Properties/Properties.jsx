import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid2,
  OutlinedInput,
  FormControl,
  Skeleton,
  Pagination,
  Slider,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import PropertyListing from "../../components/PropertyListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, getProjects, getProjectsLoader } from "../../store/projectsSlice";
import PropertyCard from "../../components/PropertyCard";

const MotionBox = motion(Box);

const SkeletonPropertyCard = () => (
  <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} >
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid #444",
        backgroundColor: "#111",
        boxShadow: 4,
        p: 2,
      }}
    >
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "10px", mb: 2 }} />
      <Skeleton variant="text" height={30} width="80%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="rounded" height={36} width={100} sx={{ mt: 2 }} />
    </Box>
  </Grid2>
);

const propertyTypes = [
  "Residential",
  "Commercial",
  "MAHA RERA",
  "Land",
  "Shop",
  "Other",
];

const Properties = () => {
  const dispatch = useDispatch();
  var properties = useSelector(getProjects);
  const isLoading = useSelector(getProjectsLoader);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [priceRange, setPriceRange] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [buildYear , setBuildYear] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const filters = {
      keyword: searchText || "*",
      location,
      propertyType,
      minPrice: minPrice,
      maxPrice: maxPrice * 100000,
      page: pageNum || 1,
      pageSize,
      propertySize,
      buildYear,
    };
  
    dispatch(fetchProjects(filters));
  }, [dispatch]); 
  
  useEffect(()=>{
    if(properties && properties.length > 0){
      setTotalPages(Math.ceil(properties.length / pageSize));
    }
  },[properties]);
  
  return (
    <Box id="properties" sx={{ backgroundColor: "#191919", width: "100vw" }}>
      <Navbar />
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        sx={{
          background: "linear-gradient(53deg, #262626 0%, #141414 53%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          py: 8,
          px: { xs: 2, md: 5, lg: 10 },
          textAlign: "start",
          gap: "24px",
          paddingBottom: "120px",
          borderBottom: "1px solid #262626",
        }}
      >
        <Typography variant="h3" fontSize={48}>
          Find Your Dream Property
        </Typography>
        <Typography variant="body2" color="#999999" width={"90%"}>
          Welcome to RK's, where your dream property awaits in every corner of
          our beautiful world. Explore our curated selection of properties, each
          offering a unique story and a chance to redefine your life. With
          categories to suit every dreamer, your journey.
        </Typography>
      </MotionBox>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          mt: -10, // Pull up slightly but avoid overlap
          zIndex: 2,
        }}
      >
        <FormControl sx={{ width: "100%", maxWidth: "700px", backgroundColor: "#262626", pt:1, px:1, borderRadius: "10px 10px 0 0", }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            value={searchText}
            onChange={(e)=> setSearchText(e.target.value)}
            sx={{
              padding: "16px",
              border: "1px solid #262626",
              borderRadius: "16px",
              backgroundColor: "#141414",
              color: "white",
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#703BF7", color: "white" }}
                  onClick={()=>{
                    const filters = {
                      keyword: searchText || "*",
                      location,
                      propertyType,
                      minPrice: minPrice,
                      maxPrice: maxPrice * 100000,
                      page: pageNum || 1,
                      pageSize,
                      propertySize,
                      buildYear,
                    }
                    dispatch(fetchProjects(filters));
                  }}
                >
                  Find Property
                </Button>
              </InputAdornment>
            }
            placeholder="Search for a Property"
          />
        </FormControl>

        {/* <Grid2
          container
          spacing={1}
          sx={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#262626",
            borderRadius: "10px",
            p: 1,
          }}
        >
          {["Location", "Property Type", "Pricing Range", "Property Size", "Build Year"].map((label, idx) => (
            <Grid2 item size={{xs:12, sm:6, md:2.4}} key={idx}>
              <TextField
                sx={{ backgroundColor: "#141414", color: "white" }}
                fullWidth
                variant="outlined"
                placeholder={label}
                size="large"
              />
            </Grid2>
          ))}
        </Grid2> */}
      <Grid2
        container
        spacing={1}
        sx={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#262626",
          borderRadius: "10px",
          p: 1,
        }}
      >
        {/* Location */}
        <Grid2 item size={{xs:12, sm:6, md:2.4}}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ backgroundColor: "#141414", input: { color: "#fff" }, label: { color: "#999" } }}
          />
        </Grid2>

        {/* Property Type */}
        <Grid2 item size={{xs:12, sm:6, md:2.4}}>
          <TextField
            label="Property Type"
            select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ backgroundColor: "#141414", color: "white", label: { color: "#999" } }}
          >
            {propertyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid2>

        {/* Max Price */}
        <Grid2 item size={{xs:12, sm:6, md:2.4}}>
          <TextField
            label="Max Price (in Lakhs)"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{
              backgroundColor: "#141414",
              input: { color: "#fff" },
              label: { color: "#999" },
            }}
          />
        </Grid2>

        {/* Property Size */}
        <Grid2 item size={{xs:12, sm:6, md:2.4}}>
          <TextField
            label="Carpet Area (sq ft)"
            type="number"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ backgroundColor: "#141414", input: { color: "#fff" }, label: { color: "#999" } }}
          />
        </Grid2>

        {/* Build Year */}
        <Grid2 item size={{xs:12, sm:6, md:2.4}}>
          <TextField
            label="Build Year"
            type="number"
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            value={buildYear}
            onChange={(e) => setBuildYear(e.target.value)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ backgroundColor: "#141414", input: { color: "#fff" }, label: { color: "#999" } }}
          />
        </Grid2>
      </Grid2>
      </Box>

      <Grid2 container spacing={4} sx={{ px: { xs: 2, sm: 4, md: 8 }, py: 6 }}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPropertyCard key={index} />
            )) : properties.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  color: "#aaa",
                  fontSize: "18px",
                  py: 10,
                }}
              >
                No Properties Available
              </Box>
            )
          : properties.map((property) => (
              <PropertyCard key={property._id || property.id} item={property} />
            ))}
      </Grid2>
      
      {!isLoading && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", pb: 6 }}>
          <Pagination
            count={totalPages}
            page={pageNum}
            onChange={(e, value) => setPageNum(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": { color: "#fff" },
              "& .Mui-selected": { backgroundColor: "#703BF7" },
            }}
          />
        </Box>
      )}

      {/* <RealEstateCTA /> */}
      <FooterComponent />
    </Box>
  );
};

export default Properties;
