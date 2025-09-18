import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import './Login.css'
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Grid,
  Link,
  Alert,
  CircularProgress
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login(form.email, form.password);
    
    if (result.success) {
      toast.success('Login successful!', {
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
          <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
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
              Welcome back
            </Typography>
            <Typography variant="body1" sx={{ color: "gray", mb: 5 }}>
              Sign in to your payment account to continue.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
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

            <TextField
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter password"
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <ToastContainer />

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Don't have an account?&nbsp;
              <Link component={RouterLink} to="/" underline="hover" sx={{ color: "white" }}>
                Sign up
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
