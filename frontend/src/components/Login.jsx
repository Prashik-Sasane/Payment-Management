import React from "react";
import {useContext , useState} from "react"
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
import { ToastContainer, toast } from 'react-toastify';
import { auth } from "./firebase";


export default function AuthPage() {
  const [form, setform] = useState({ email: ""})
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          toast.success('Login Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
        }
      })
      .catch(() => {
        toast.error('Invalid Email or password!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      });
  }
  const notify = () =>  toast.success('Login Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
  
    
    const sumbit = async(e) => {
      e.preventDefault();
      const res = await fetch('http://localhost:5000/api/user/login' , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json.stringify(form)
      });
      const data = await res.json();
      if(res.ok) login(data);
      else alert(data.msg || "Login failed");
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
      > <form onSubmit={sumbit}>
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

          <Typography sx={{ width: "600px"}} variant="h4" fontWeight="bold" gutterBottom>
            Create your free account
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", mb: 5 }}>
            Create your free account to search or filter through 400,000+ screens.
            No credit card required.
          </Typography>

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
              fontSize: 16,
              py: 1.4,
              mb: 3,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            Continue with Google
          </Button>
          

          <Divider sx={{ borderColor: "white", color: "white", mb: 3 }}>
            or
          </Divider>

          <TextField
            onChange={e =>({...form, email})}
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

          <Button
            onClick={notify}
            variant="contained"
            fullWidth
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
            }}
          >
            Continue
          </Button>
           <ToastContainer />

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

          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account?&nbsp;
            <Link href="#" underline="hover" sx={{ color: "white" }}>
              Log in
            </Link>
          </Typography>

          <Box sx={{ display: "flex", gap: 4, mt: 6, opacity: 0.6 }}>
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
