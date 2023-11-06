import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NoMatchPage = () => {


  return (
    <Box  sx={{ padding: "2rem 1rem" }}>
      <Link to='/project'>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        className="back-btn"
      >
        Back To Homepage
      </Button>
      </Link>
      <Typography
        variant="h5"
        className="page-not-found-heading"
        sx={{ textAlign: "center", lineHeight: "2", padding: "2rem 1rem" }}
      >
        "Sorry, the page you're looking for cannot be found.
        <br />
        Please check the URL or navigate back to the homepage."
      </Typography>
    </Box>
  );
};

export default NoMatchPage;
