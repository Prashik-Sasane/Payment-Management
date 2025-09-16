import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HoverPage from '../page/HoverPage'
import RewardsPage from './Reward'
import SpotlightPreview  from "./SpotlightPreview";
const appBackgroundStyle = {
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#050505",
  color: "#fafcff",
  position: "relative",
  fontFamily: '"Poppins",sans-serif'
};

const SloganSection = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 180, 
      left: 0,
      zIndex: 20,
      pointerEvents: "none"
    }}
  >
    {/* <h1
      style={{
        color: "#fff",
        fontWeight: 700,
        fontSize: "2.5rem",
        textAlign: "center",
        marginBottom: 16,
        textShadow: "0 2px 32px #1d51ab77",
        letterSpacing: "1.2px",
        fontFamily: '"Poppins",sans-serif',
        pointerEvents: "auto"
      }}
    >
      Superfast, Secure Payments.<br />
      <span style={{ color: "#42b0fe", fontWeight: 600 }}>
        Money moves in a flash.
      </span>
    </h1> */}
  </div>
);

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <div style={appBackgroundStyle}>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(18,20,29,0.85)",
          color: "#fafcff",
          borderRadius: 24,
          boxShadow: "0 4px 20px rgba(0,0,0,0.24)",
          width: expanded ? "90vw" : 300,
          maxWidth: 900,
          top: scrolled ? 20 : 40,
          display: "flex",
          alignItems: "center",
          padding: "12px 32px",
          transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
          zIndex: 200,
          cursor: "pointer"
        }}
        aria-expanded={expanded}
        role="navigation"
        aria-label="Main Navigation"
        onClick={() => setExpanded(true)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            style={{ height: 24, width: 24, fill: "#6c8cff" }}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M3 5h5l4 5v9H3V5zM18 11h3v7h-3v-7zM12 3h6v3h-6V3z" />
          </svg>
          <span style={{ fontWeight: "600", fontSize: 20, userSelect: "none", color: "#fafcff" }}>
            PayPal.
          </span>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <button
          onClick={e => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          aria-label={expanded ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            color: "#fafcff",
            cursor: "pointer",
            fontSize: 22,
            marginLeft: 12,
          }}
        >
          {expanded ? (
            <svg style={{ width: 24, height: 24 }} fill="none" stroke="#fafcff" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg style={{ width: 24, height: 24 }} fill="none" stroke="#fafcff" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {expanded && (
          <div style={{
            display: "flex", alignItems: "center", gap: 32, fontWeight: 500, color: "#6c8cff",
            marginLeft: 24, fontSize: 18
          }}>
            <a href="#" style={{ textDecoration: "none", color: "#6c8cff" }}>Admin</a>
            <Link to="/Login" style={{ textDecoration: "none", color: "#fafcff" }}>
              <button
                style={{
                  background: "none", border: "none", color: "#fafcff",
                  fontWeight: "bold", cursor: "pointer",
                  fontSize: 18
                }}
              >Log in</button>
            </Link>
            <button
              style={{
                background: "linear-gradient(90deg, #205BE4 40%, #233c7b 90%)",
                color: "#fff", padding: "8px 24px", borderRadius: 24,
                fontWeight: "600", border: "none", cursor: "pointer"
              }}
            >Join for free</button>
          </div>
        )}
      </nav>
      <SloganSection />
      <SpotlightPreview />
    </div>
     <HoverPage />
     <RewardsPage />
     </>
  );
};

export default Navbar;
