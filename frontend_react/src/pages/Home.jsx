import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeroBackgroundImage from "../assets/images/HeroImage.jpg";
import PromoPhoto from "../assets/images/PromoPhoto.jpg";
import WeightRack from "../assets/images/WeightRack.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth={false} disableGutters sx={{ overflowX: "hidden" }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          background: `url(${HeroBackgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          width: "100vw",
          color: "#fff",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Welcome to B.E.A.T.
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Your personal Body Exercise and Activity Tracker
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/signin")}
              sx={{ "&:hover": { backgroundColor: "maroon" } }}
            >
              Log in
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{ "&:hover": { backgroundColor: "maroon" } }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Marketing Section with Two Columns */}
      <Grid container spacing={0} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: { xs: 233, md: 1 },
            }}
            src={PromoPhoto}
            alt="Black and White Gym"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, color: "maroon" }}
            >
              Stay Fit, Stay Ahead with B.E.A.T.
            </Typography>
            <Typography>
              Unlock your full fitness potential with B.E.A.T — Body Exercise
              and Activity Tracker.
              <br />
              <br />
              Our cutting-edge platform is designed to empower you to reach your
              health goals faster and smarter. Whether you're a fitness
              enthusiast or just starting out, B.E.A.T. offers personalized
              tracking, insightful analytics, and motivational support to keep
              you on track every step of the way.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{ my: 4 }}>
        {/* Text on the Left */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            order: { xs: 2, md: 1 },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, color: "maroon" }}
            >
              Your Goals, Our Mission.
            </Typography>
            <Typography>
              At B.E.A.T., your fitness aspirations become our mission. We
              understand that every fitness journey is unique, and that's why
              we've created a solution that adapts to you. From rigorous
              workouts to daily physical activities, B.E.A.T captures all
              aspects of your fitness journey, providing you with a
              comprehensive view of your progress.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "maroon",
                },
              }}
              onClick={() => navigate("/signup")}
            >
              Join Now For Free!
            </Button>
          </Box>
        </Grid>

        {/* Image on the Right */}
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              maxHeight: "60vh",
              display: "block",
              margin: "auto",
            }}
            src={WeightRack}
            alt="Weight Rack Visual"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
