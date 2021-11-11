import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="#FFFFFF"
      align="center"
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: "auto",
              py: [3],
              minWidth: "100%",
              backgroundColor: "#012a4a"

            }}
          >
            <Copyright sx={{ mt: 5 }} />
          </Container>
  );
}