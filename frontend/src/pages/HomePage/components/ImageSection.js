// Author: Anuj Dev (B00900887)

import * as React from "react";
import { Button, Typography } from "@mui/material";
import ImageSectionLayout from "../components/ImageSectionLayout";
import MainScreen from "../../../assets/images/Homepage.jpg";
import { ROUTES } from "../../../common/constants";
import { useNavigate } from "react-router";

export default function ProductHero() {
  const navigate = useNavigate();

  return (
    <ImageSectionLayout
      sxBackground={{
        backgroundImage: `url(${MainScreen})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      <img
        style={{ display: "none" }}
        src={MainScreen}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        SAVE FOOD HELP THE PLANET
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component="a"
        onClick={(event) => navigate(ROUTES.FOOD_LISTING)}
        sx={{ minWidth: 200, mt: 15 }}
      >
        View All Food Postings
      </Button>
    </ImageSectionLayout>
  );
}
