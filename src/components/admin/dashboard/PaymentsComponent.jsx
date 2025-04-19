import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Card,
  Chip,
  IconButton,
  Button,
  Grid2,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CurrencyRupee,
} from "@mui/icons-material";

// ▸ Replace this with the selector / API call you already have.
const PAYMENTS_DATA = [
  {
    _id: "68039353a673fcc5849abe55",
    clientId: { name: "santhosh", email: "saisanthoshgadde2002@gmail.com" },
    amount: 10000,
    currency: "INR",
    orderId: "order_QKubQWhdz3SJVR",
    status: "Success",
    createdAt: "2025-04-19T12:13:07.064Z",
    paymentId: "pay_QKug4jP5DUwRJP",
  },
  {
    _id: "6803a34ea673fcc5849ac285",
    clientId: { name: "santhosh", email: "saisanthoshgadde2002@gmail.com" },
    amount: 10000,
    currency: "INR",
    orderId: "order_QKvlSUKFyRgFoY",
    status: "Pending",
    createdAt: "2025-04-19T13:21:18.513Z",
  },
  {
    _id: "6803a3c1a673fcc5849ac28a",
    clientId: { name: "sai santhosh", email: "saisanthoshgadde2002@gmail.com" },
    amount: 10000,
    currency: "INR",
    orderId: "order_QKvnUVX5Gub5l6",
    status: "Success",
    createdAt: "2025-04-19T13:23:13.955Z",
    paymentId: "pay_QKvnbE6zkzBHSe",
  },
  {
    _id: "6803aa22a673fcc5849ac3f6",
    clientId: { name: "saisanthosh", email: "gadde2002@gmail.com" },
    amount: 10000,
    currency: "INR",
    orderId: "order_QKwGEjnPHV2yLv",
    status: "Success",
    createdAt: "2025-04-19T13:50:26.814Z",
    paymentId: "pay_QKwGMVcqapCoUC",
  },
];

const statusColor = (s) =>
  s === "Success" ? "success" : s === "Pending" ? "warning" : "error";

const dateFmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function PaymentsComponent() {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState(PAYMENTS_DATA);

  useEffect(() => {
    // 🔄  replace this with your actual redux selector or API call
    setPayments(PAYMENTS_DATA);
  }, []);

  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", py: 6 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(100vh - 170px)`,
        }}
      >
        <Box display={"flex"} flexDirection="column" gap={4}>
          {/* heading */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
              Payments
            </Typography>
            <Typography sx={{ color: "#999" }}>
              Overview of all client transactions
            </Typography>
          </Box>

          {/* grid */}
          <Grid2 container spacing={4}>
            {payments.map((p) => (
              <Grid2 xs={12} sm={6} md={4} key={p._id}>
                <Card
                  sx={{
                    p: 3,
                    bgcolor: "#111",
                    border: "1px solid #444",
                    borderRadius: 2,
                    minHeight: 200,
                    color: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        maxHeight: "1.4em", // single‑line cap + auto scroll
                        overflowX: "auto",
                        overflowY: "hidden",
                        scrollbarWidth: "none",
                      }}
                    >
                      {p.clientId.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={p.status}
                      color={statusColor(p.status)}
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
                    Order&nbsp;ID:&nbsp;{p.orderId}
                  </Typography>

                  {p.paymentId && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Payment&nbsp;ID:&nbsp;{p.paymentId}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <CurrencyRupee fontSize="small" />
                    <Typography variant="h6" fontWeight="bold">
                      {p.amount.toLocaleString("en-IN")}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ color: "grey.600" }}>
                    {dateFmt(p.createdAt)}
                  </Typography>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
        {/* pagination stub */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            pt: 3,
            borderTop: "1px solid #262626",
          }}
        >
          <Typography variant="body2" sx={{ color: "#888" }}>
            01 of 05
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PaymentsComponent;
