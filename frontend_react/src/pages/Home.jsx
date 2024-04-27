import {
  Alert, Box, Button, Container, FormControl, Grid, InputLabel,
  MenuItem,
  Select,
  Snackbar, Stack, Typography, useMediaQuery
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBackgroundImage from "../assets/images/HeroImage.jpg";
import PromoPhoto from "../assets/images/PromoPhoto.jpg";
import WeightRack from "../assets/images/WeightRack.jpg";

const FilteredExercises = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const [FilteredExercises, setFilteredExercises] = useState(null);

  const [WorkoutTitle, setWorkoutTitle] = useState("");

  const [exercises, setExercises] = useState([]);

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };
  const handleMuscleChange = (event) => {
    setSelectedMuscle(event.target.value);
  };
  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  const RecieveFilteredExercises = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/filter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level: selectedDifficulty,
        equipment: selectedEquipment,
        primaryMuscles: [selectedMuscle],
      }),
    });
    const data = await response.json();
    // setExercises(data);
    console.log("Sent!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/exercises/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExercises(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <FormControl
          style={{ width: "200px", marginTop: "10px", paddingTop: "10px" }}
        >
          {/* Option 1 */}
          <InputLabel id="dropdown-label">Difficulty</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          style={{ width: "200px", marginTop: "10px", paddingTop: "10px" }}
        >
          {/* Option 2 */}
          <InputLabel id="dropdown-label">Muscle group</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedMuscle}
            onChange={handleMuscleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="abdominals">Abdominals</MenuItem>
            <MenuItem value="abductors">Abductors</MenuItem>
            <MenuItem value="adductors">Adductors</MenuItem>
            <MenuItem value="biceps">Biceps</MenuItem>
            <MenuItem value="calves">Calves</MenuItem>
            <MenuItem value="chest">Chest</MenuItem>
            <MenuItem value="forearms">Forearms</MenuItem>
            <MenuItem value="glutes">Glutes</MenuItem>
            <MenuItem value="hamstrings">Hamstrings</MenuItem>
            <MenuItem value="lats">Lats</MenuItem>
            <MenuItem value="lower back">Lower Back</MenuItem>
            <MenuItem value="middle back">Middle Back</MenuItem>
            <MenuItem value="neck">Neck</MenuItem>
            <MenuItem value="quadriceps">Quadriceps</MenuItem>
            <MenuItem value="shoulders">Shoulders</MenuItem>
            <MenuItem value="traps">Traps</MenuItem>
            <MenuItem value="triceps">Triceps</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          style={{ width: "200px", marginTop: "10px", paddingTop: "10px" }}
        >
          {/* Option 3 */}
          <InputLabel id="dropdown-label">Equipment</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedEquipment}
            onChange={handleEquipmentChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="bands">Bands</MenuItem>
            <MenuItem value="barbell">Barbell</MenuItem>
            <MenuItem value="body only">Body Only</MenuItem>
            <MenuItem value="cable">Cable</MenuItem>
            <MenuItem value="dumbbell">Dumbbell</MenuItem>
            <MenuItem value="e-z curl bar">E-Z curl bar</MenuItem>
            <MenuItem value="exercise ball">Exercise Ball</MenuItem>
            <MenuItem value="foam roll">Foam Roll</MenuItem>
            <MenuItem value="kettlebells">Kettlebells</MenuItem>
            <MenuItem value="machine">Machine</MenuItem>
            <MenuItem value="medicine ball">Medicine Ball</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{ marginTop: "20px", paddingTop: "10px" }}
          onClick={RecieveFilteredExercises}
        >
          Filter
        </Button>
      </Stack>
      <h1>List below should be filled if backend is working correctly</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}, {exercise.images}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={() => navigate("/signin")} sx={{ "&:hover": {backgroundColor: "maroon"}}}>
            Log in
          </Button>
          <Button variant="contained" onClick={() => navigate("/signup")} sx={{ "&:hover": {backgroundColor: "maroon"}}}>
            Sign Up
          </Button>
        </Stack>
      </Box>
      {/* Marketing Section with Two Columns */}
      <Grid container spacing={0} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: { xs: 233, md: 1 }, // Restrict height on smaller screens
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
      <FilteredExercises />
    </Container>
  );
};

export default Home;
