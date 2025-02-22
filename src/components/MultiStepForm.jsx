import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const steps = ["Client Details", "Confirm Details", "Payment"];

const MultiStepForm = ({ amount }) => {
  const dispatch = useDispatch();
  const clientData = useSelector(getClientDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // ✅ Load Razorpay Script Dynamically
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

  // ✅ Handle client details submission
  const onSubmitClientDetails = (data) => {
    dispatch(setClientData(data));
    setActiveStep(1);
  };

  // ✅ Handle payment process
  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      alert("Razorpay failed to load. Please check your internet connection.");
      return;
    }

    dispatch(createOrder({ clientData, amount })).then((res) => {
      if (res.payload) {
        console.log("payment", res.payload);
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ Ensure this is correct
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
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Service Payment
      </Typography>

      {/* ✅ Stepper Navigation */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* ✅ Step 1: Client Details Form */}
      {activeStep === 0 && (
        <form onSubmit={handleSubmit(onSubmitClientDetails)}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Phone"
            {...register("phone", { required: "Phone is required" })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            margin="normal"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Box>
        </form>
      )}

      {/* ✅ Step 2: Confirm Details */}
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6">Confirm Details</Typography>
          <Typography>Name: {clientData?.name}</Typography>
          <Typography>Email: {clientData?.email}</Typography>
          <Typography>Phone: {clientData?.phone}</Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" onClick={() => setActiveStep(0)}>
              Back
            </Button>
            <Button variant="contained" onClick={() => setActiveStep(2)}>
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      )}

      {/* ✅ Step 3: Payment */}
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
            <Button variant="outlined" onClick={() => setActiveStep(1)}>
              Back
            </Button>
          </Box>
        </Box>
      )}

      {/* ✅ Step 4: Payment Successful */}
      {activeStep === 3 && (
        <Box textAlign="center">
          <Typography variant="h5" color="success.main">
            Payment Successful! 🎉
          </Typography>
          <Typography>Thank you for your payment.</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MultiStepForm;
