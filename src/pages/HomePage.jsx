import React from "react";
import { Grid, Typography } from "@mui/material";
import WeatherWidget from "../component/WeatherWidget";

const HomePage = () => {
  // using mui grid concept for responsiveness
  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: 4,
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Weather App
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <WeatherWidget latitude={52.52} longitude={13.41} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <WeatherWidget latitude={40.71} longitude={-74.01} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <WeatherWidget latitude={35.68} longitude={139.69} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
