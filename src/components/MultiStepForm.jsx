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
  Paper,
} from "@mui/material";
import StyledTextField from "../StyledComponents/StyledTextField";

const steps = ["Client Details", "Confirm Details", "Payment"];

const MultiStepForm = ({ amount }) => {
  const dispatch = useDispatch();
  const clientData = useSelector(getClientDetails);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          setIsRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
    loadRazorpay();
  }, []);

  const onSubmitClientDetails = (data) => {
    dispatch(setClientData(data));
    setActiveStep(1);
  };

  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      alert("Razorpay failed to load. Please check your internet connection.");
      return;
    }

    dispatch(createOrder({ clientData, amount })).then((res) => {
      if (res.payload) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: res.payload.amount,
          currency: res.payload.currency,
          name: "RK Services",
          description: "Payment for services",
          order_id: res.payload.id,
          handler: async function (response) {
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
    // <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Service Payment
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <form onSubmit={handleSubmit(onSubmitClientDetails)} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <StyledTextField 
                {...field}
                placeholder="Name"
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
                placeholder="Email"
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
                placeholder="Phone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#7C4DFF", color: "white" }}>
              Next
            </Button>
          </Box>
        </form>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography variant="h6">Confirm Details</Typography>
          <Typography>Name: {clientData?.name}</Typography>
          <Typography>Email: {clientData?.email}</Typography>
          <Typography>Phone: {clientData?.phone}</Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" onClick={() => setActiveStep(0)} color="error">
              Back
            </Button>
            <Button variant="contained" onClick={() => setActiveStep(2)} sx={{ backgroundColor: "#7C4DFF", color: "white" }}>
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Box textAlign="center">
          <Typography variant="h6">Total Amount: ₹{amount}</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handlePayment}
            sx={{ mt: 3 }}
          >
            {isRazorpayLoaded ? "Pay Now" : "Loading Payment..."}
          </Button>
          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={() => setActiveStep(1)} color="error">
              Back
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 3 && (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main">
            Payment Successful! 🎉
          </Typography>
          <Typography>Thank you for your payment.</Typography>
        </Box>
      )}
    {/* // </Paper> */}
    </Box>
  );
};

export default MultiStepForm;
