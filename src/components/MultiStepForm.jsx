import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  setClientData,
  createOrder,
  verifyPayment,
  getClientDetails,
} from "../store/paymentSlice";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import StyledTextField from "../StyledComponents/StyledTextField";

const steps = ["Select Services", "Client Details", "Confirm & Pay"];

const MultiStepForm = ({ amount = 0, subServices = [], serviceName }) => {
  const dispatch = useDispatch();
  const clientData = useSelector(getClientDetails);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [activeStep, setActiveStep] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(amount);

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setIsRazorpayLoaded(true);
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handleSubServiceToggle = (subService) => {
    const exists = selectedSubServices.some((s) => s._id === subService._id);
    const updated = exists
      ? selectedSubServices.filter((s) => s._id !== subService._id)
      : [...selectedSubServices, subService];

    setSelectedSubServices(updated);

    const newTotal =
      updated.length > 0
        ? updated.reduce((sum, item) => sum + (item.price || 0), 0)
        : amount;

    setTotalAmount(newTotal);
  };

  const onSubmitClientDetails = (data) => {
    dispatch(setClientData(data));
    setActiveStep(2);
  };

  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      alert("Razorpay failed to load.");
      return;
    }

    dispatch(createOrder({ clientData, amount: totalAmount })).then((res) => {
      if (res.payload) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: res.payload.amount,
          currency: res.payload.currency,
          name: "RK Services",
          description: serviceName,
          order_id: res.payload.id,
          handler: (response) => {
            dispatch(verifyPayment(response));
            setActiveStep(3);
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    });
  };

  return (
    <Box
      sx={{
        background: "#111",
        color: "#fff",
        borderRadius: 3,
        p: 4,
        height: "auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {serviceName}
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel sx={{ color: "#fff !important" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0 - Sub-service selection */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Select required services:
          </Typography>
          <Box sx={{ overflowY: "auto", maxHeight: "calc(80vh - 280px)", pr: 1 }}>
            {subServices.map((sub) => (
              <Box
                key={sub._id}
                sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!selectedSubServices.find((s) => s._id === sub._id)}
                      onChange={() => handleSubServiceToggle(sub)}
                      sx={{ color: "#6A5ACD" }}
                    />
                  }
                  label={<Typography color="#fff">{sub.name}</Typography>}
                />
                <Typography variant="body2">₹{sub.price}</Typography>
              </Box>
            ))}
          </Box>
          <Divider sx={{ my: 2, borderColor: "#333" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Total: ₹{totalAmount}</Typography>
            <Button
              variant="contained"
              onClick={() => setActiveStep(1)}
              sx={{ backgroundColor: "#6A5ACD" }}
              disabled={subServices.length > 0 && selectedSubServices.length === 0}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 1 - Client details */}
      {activeStep === 1 && (
        <form onSubmit={handleSubmit(onSubmitClientDetails)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Full Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Email (optional)"
                type="email"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Phone Number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => setActiveStep(0)} color="error">
              Back
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#6A5ACD" }}>
              Next
            </Button>
          </Box>
        </form>
      )}

      {/* Step 2 - Confirm + Payment */}
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Confirm & Pay
          </Typography>

          <Typography>Name: {clientData?.name}</Typography>
          <Typography>Email: {clientData?.email}</Typography>
          <Typography>Phone: {clientData?.phone}</Typography>

          <Divider sx={{ my: 2, borderColor: "#333" }} />

          <Typography variant="subtitle1">Selected Services:</Typography>
          {selectedSubServices.length > 0 ? (
            <ul style={{ marginLeft: 16 }}>
              {selectedSubServices.map((s) => (
                <li key={s._id}>
                  {s.name} — ₹{s.price}
                </li>
              ))}
            </ul>
          ) : (
            <Typography>Base Service Only — ₹{totalAmount}</Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{totalAmount}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setActiveStep(1)} color="error">
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handlePayment}
              disabled={!isRazorpayLoaded}
            >
              {isRazorpayLoaded ? "Pay Now" : "Loading..."}
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 3 - Success */}
      {activeStep === 3 && (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main">
            Payment Successful! 🎉
          </Typography>
          <Typography>Thank you for your payment.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MultiStepForm;
