import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
} from "@mui/material";
import WeatherIcon from "./WeatherIconGeneration";

// Weather component
const WeatherWidget = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // using axios for api call
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast`,
          {
            params: {
              latitude,
              longitude,
              current_weather: true,
              daily: "temperature_2m_max,temperature_2m_min",
              timezone: "auto",
            },
          }
        );
        setWeatherData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (error) {
    return (
      <Card sx={{ padding: 2, borderRadius: 2, backgroundColor: "#ffebee" }}>
        <CardContent>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card sx={{ padding: 2, borderRadius: 2, backgroundColor: "#e3f2fd" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ marginBottom: 2 }} />
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  const currentTemperature = weatherData?.current_weather?.temperature;
  const dailyForecast = weatherData?.daily;

  return (
    <Card
      sx={{
        borderRadius: 4,
        padding: 2,
        backgroundColor: "#f1f5f9",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather ({weatherData?.timezone || "N/A"})
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            {currentTemperature}°C
          </Typography>
          <WeatherIcon
            weatherCode={weatherData?.current_weather?.weathercode}
          />
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {dailyForecast?.time?.map((date, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  padding: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography>Date: {date}</Typography>
                <Typography>
                  Max Temp: {dailyForecast?.temperature_2m_max[index]}°C
                </Typography>
                <Typography>
                  Min Temp: {dailyForecast?.temperature_2m_min[index]}°C
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            backgroundColor: "#6200ea",
            color: "#fff",
            textTransform: "none",
          }}
          onClick={() => {
            window.open(
              "https://open-meteo.com/en/docs#current=temperature_2m&hourly=&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3"
            );
          }}
        >
          See Full Forecast
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
