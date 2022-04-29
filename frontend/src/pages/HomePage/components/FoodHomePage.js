// Author: Anuj Dev (B00900887)

import * as React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function FoodHomePage() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Featured Food Advertisements
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}></Box>
    </Container>
  );
}
