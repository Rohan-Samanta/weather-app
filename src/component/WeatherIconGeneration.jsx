import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const WeatherIcon = ({ weatherCode }) => {
  switch (weatherCode) {
    case 0:
      return <WbSunnyIcon fontSize="large" color="warning" />; // Clear sky
    case 1:
    case 2:
    case 3:
      return <CloudIcon fontSize="large" color="action" />; // Cloudy
    case 45:
    case 48:
      return <GrainIcon fontSize="large" color="primary" />; // Fog
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return <GrainIcon fontSize="large" color="primary" />; // Rain
    case 71:
    case 73:
    case 75:
      return <AcUnitIcon fontSize="large" color="info" />; // Snow
    default:
      return <CloudIcon fontSize="large" color="disabled" />; // Default icon
  }
};

export default WeatherIcon;
