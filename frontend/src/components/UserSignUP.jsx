import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
export default function UserSignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!form.username || !form.email || !form.password || !form.full_name) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const result = await register({
      username: form.username,
      email: form.email,
      password: form.password,
      full_name: form.full_name,
      phone: form.phone
    });
    
    if (result.success) {
      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      navigate('/dashboard');
    } else {
      setError(result.error);
      toast.error(result.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
    
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100vh" }}
    >
      <Grid
        item
        xs={12}
        sx={{
          background: "#111",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 4,
          py: 8,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
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

            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create your account
            </Typography>
            <Typography variant="body1" sx={{ color: "gray", mb: 5 }}>
              Join our secure payment platform and start managing your money with ease.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Username"
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
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#333" },
                      "&:hover fieldset": { borderColor: "#555" },
                    },
                    input: { color: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="full_name"
                  value={form.full_name}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Full Name"
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
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#333" },
                      "&:hover fieldset": { borderColor: "#555" },
                    },
                    input: { color: "white" },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Email address"
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
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#555" },
                },
                input: { color: "white" },
              }}
            />

            <TextField
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Phone number (optional)"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: 24,
                  color: "white",
                  background: "#181818",
                },
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#555" },
                },
                input: { color: "white" },
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Password"
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
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#333" },
                      "&:hover fieldset": { borderColor: "#555" },
                    },
                    input: { color: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Confirm Password"
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
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: 6,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 18,
                py: 1.4,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#ededed" },
                "&:disabled": { backgroundColor: "#666", color: "#999" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            <ToastContainer />

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link  to="/login" underline="hover" sx={{ color: "white" }}>
                Sign in
              </Link>
            </Typography>

            <Box sx={{ display: "flex", gap: 4, mt: 6, opacity: 0.6, justifyContent: "center" }}>
              <Typography variant="body2">Secure</Typography>
              <Typography variant="body2">Fast</Typography>
              <Typography variant="body2">Reliable</Typography>
            </Box>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}
