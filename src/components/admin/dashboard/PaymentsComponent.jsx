import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid2,
} from "@mui/material";
import { CurrencyRupee } from "@mui/icons-material";
import {
  fetchAllPayments,
  getError,
  getLoading,
  getPayments,
} from "../../../store/paymentSlice";

/* ───────────────────────── helpers ───────────────────────── */
const statusColor = (s) =>
  s === "Success" ? "#2e7d32" : s === "Pending" ? "#ff9800" : "#d32f2f";

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
  const payments = useSelector(getPayments);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const [expandedPaymentId, setExpandedPaymentId] = useState(null);

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
          minHeight: `calc(100vh - 170px)`,
        }}
      >
        {/* heading */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight="bold" fontSize={48}>
            Payments
          </Typography>
          <Typography sx={{ color: "#999" }}>
            Overview of all client transactions
          </Typography>
        </Box>

        {/* loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        )}

        {/* error */}
        {error && (
          <Typography color="error" sx={{ mt: 4 }}>
            {typeof error === "string" ? error : "Something went wrong"}
          </Typography>
        )}

        {/* cards */}
        {!loading && !error && (
          <Grid2 container spacing={4}>
            {payments?.map((p) => (
              <Grid2 item xs={12} sm={6} md={4} key={p._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #444",
                    backgroundColor: "#111",
                    color: "#fff",
                    boxShadow: 4,
                    padding: 2,
                    transition: "all 0.3s ease-in-out",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {/* Name */}
                      <Typography variant="h6" fontWeight="bold">
                        {p?.name}
                      </Typography>

                      {/* Email */}
                      <Typography variant="body2" color="grey.400">
                        📧 {p?.email}
                      </Typography>

                      {/* Amount */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CurrencyRupee fontSize="small" />
                        <Typography variant="h6" fontWeight="bold">
                          {p?.amount?.toLocaleString("en-IN")} {p?.currency}
                        </Typography>
                      </Box>

                      {/* Status + OrderId */}
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Chip
                          label={p.status}
                          sx={{
                            backgroundColor: statusColor(p.status),
                            color: "#fff",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>

                      {/* Purchased Services */}
                      <Box sx={{ position: "relative", mt: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp:
                              expandedPaymentId === p._id ? "none" : 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p?.purchasedServices?.map((service) => (
                            <span key={service._id}>
                              • {service.name} ({service.amount}{" "}
                              {service.currency})
                              <br />
                            </span>
                          ))}
                        </Typography>

                        {p.purchasedServices?.length > 2 && (
                          <Typography
                            component="span"
                            sx={{
                              color: "#6A5ACD",
                              cursor: "pointer",
                              fontSize: "14px",
                              display: "inline-block",
                              mt: 1,
                            }}
                            onClick={() =>
                              setExpandedPaymentId(
                                expandedPaymentId === p._id ? null : p._id
                              )
                            }
                          >
                            {expandedPaymentId === p._id
                              ? "View Less"
                              : "Read More"}
                          </Typography>
                        )}
                      </Box>

                      {/* Order ID */}
                      <Typography variant="body2" color="grey.400" mt={1}>
                        Order ID: {p?.orderId}
                      </Typography>

                      {/* Payment ID */}
                      {p?.paymentId && (
                        <Typography variant="body2" color="grey.400">
                          Payment ID: {p?.paymentId}
                        </Typography>
                      )}

                      {/* Date */}
                      <Typography variant="body2" color="grey.600" mt={1}>
                        {dateFmt(p.createdAt)}
                      </Typography>
                    </Box>
                  </CardContent>
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
