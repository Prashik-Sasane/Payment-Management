import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Grid,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./firebase";

export default function Login() {
  const [form, setForm] = useState({ email: "" });

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          toast.success("Login Successfully!", {
            position: "top-center",
            autoClose: 5000,
            theme: "light",
          });
        }
      })
      .catch(() => {
        toast.error("Invalid Email or password!", {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
        });
      });
  }

  const notify = () =>
    toast.success("Login Successfully!", {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
    });

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) console.log("Login success:", data);
    else alert(data.msg || "Login failed");
  };

  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        sx={{
          background: "#111",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 8 },
        }}
      >
        <form onSubmit={submit}>
          <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
            {/* Logo */}
            <Box sx={{ mb: 6 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "white",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
                  PP
                </Typography>
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                width: { xs: "100%", sm: "90%", md: "600px" },
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
              }}
            >
              Create your free account
            </Typography>

            <Typography variant="body1" sx={{ color: "gray", mb: 5 }}>
              Create your free account to search or filter through 400,000+ screens.
              No credit card required.
            </Typography>

            {/* Google login */}
            <Button
              onClick={googleLogin}
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: "#1f1f1f",
                color: "white",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: 14, sm: 16 },
                py: { xs: 1, sm: 1.4 },
                mb: 3,
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              Continue with Google
            </Button>

            <Divider sx={{ borderColor: "white", color: "white", mb: 3 }}>or</Divider>

            {/* Email input */}
            <TextField
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              variant="outlined"
              placeholder="Enter email address"
              fullWidth
              required
              InputProps={{
                style: {
                  borderRadius: 24,
                  color: "white",
                  background: "#181818",
                },
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#555" },
                },
                input: { color: "white" },
              }}
            />

            {/* Continue button */}
            <Button
              onClick={notify}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: 6,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: { xs: 14, sm: 16, md: 18 },
                py: { xs: 1, sm: 1.4 },
                "&:hover": { backgroundColor: "#ededed" },
              }}
            >
              Continue
            </Button>

            <ToastContainer />

            {/* Terms */}
            <Typography
              variant="caption"
              sx={{ color: "gray", mt: 2, mb: 0.5, lineHeight: 1.5 }}
            >
              By continuing, you agree to our&nbsp;
              <Link href="#" underline="hover" sx={{ color: "gray" }}>
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link href="#" underline="hover" sx={{ color: "gray" }}>
                Privacy Policy
              </Link>
              .
            </Typography>

            {/* Already have account */}
            <Typography variant="body2" sx={{ mt: 3 }}>
              Already have an account?&nbsp;
              <Link href="#" underline="hover" sx={{ color: "white" }}>
                Log in
              </Link>
            </Typography>

            {/* Footer logos */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 6,
                opacity: 0.6,
              }}
            >
              <Typography variant="body2">headspace</Typography>
              <Typography variant="body2">airbnb</Typography>
              <Typography variant="body2">Revolut</Typography>
              <Typography variant="body2">duolingo</Typography>
            </Box>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}
