// ✅ PaymentsComponent — connected to paymentSlice
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Card,
  Chip,
  CircularProgress,
  Grid2,
} from "@mui/material";
import {
  ArrowBackIos, // If you plan to use paging later
  ArrowForwardIos,
  CurrencyRupee,
} from "@mui/icons-material";

import {
  fetchAllPayments,
  getError,
  getLoading,
  getPayments,
} from "../../../store/paymentSlice";
/* ───────────────────────── helpers ───────────────────────── */
const statusColor = (s) =>
  s === "Success" ? "success" : s === "Pending" ? "warning" : "error"; // treat everything else (e.g. "Failed") as error

const dateFmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/* ─────────────────────── component ──────────────────────── */
function PaymentsComponent() {
  const dispatch = useDispatch();

  // pull what we need from the slice
  const payments = useSelector(getPayments);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  // kick off the fetch once
  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", py: 6 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: `calc(100vh - 170px)`,
        }}
      >
        {/* heading */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
            Payments
          </Typography>
          <Typography sx={{ color: "#999" }}>
            Overview of all client transactions
          </Typography>
        </Box>

        {/* content */}
        {loading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 10 }}
            data-testid="payments-loading"
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 4 }} data-testid="payments-error">
            {typeof error === "string" ? error : "Something went wrong"}
          </Typography>
        )}

        {!loading && !error && (
          <Grid2 container spacing={4}>
            {payments?.map((p) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={p._id}>
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
                        maxHeight: "1.4em",
                        overflowX: "auto",
                        overflowY: "hidden",
                        scrollbarWidth: "none",
                      }}
                    >
                      {p.clientId?.name ?? "—"}
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
        )}
      </Container>
    </Box>
  );
}

export default PaymentsComponent;
