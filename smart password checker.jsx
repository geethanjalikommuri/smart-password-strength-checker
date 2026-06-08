import React, { useState } from "react";

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const generateSuggestion = () => "Acharya_0399#Secure";

  const analyzePassword = (pwd) => {
    let score = 0;
    let issues = [];

    if (pwd.length >= 8) score++;
    else issues.push("At least 8 characters");

    if (/[A-Z]/.test(pwd)) score++;
    else issues.push("Add uppercase letter");

    if (/[a-z]/.test(pwd)) score++;
    else issues.push("Add lowercase letter");

    if (/[0-9]/.test(pwd)) score++;
    else issues.push("Add number");

    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    else issues.push("Add special character");

    let strength = "Weak";
    let color = "#ef4444";

    if (score >= 3 && score < 5) {
      strength = "Medium";
      color = "#f59e0b";
    }
    if (score === 5) {
      strength = "Strong";
      color = "#22c55e";
    }

    return {
      strength,
      color,
      issues,
      securityScore: score * 20,
    };
  };

  const result = analyzePassword(password);

  const clearPassword = () => setPassword("");
  const resetAll = () => {
    setPassword("");
    setShowPassword(false);
  };

  // 🔥 BAR FUNCTION (NEW)
  const getBar = (value) => ({
    height: "15px",
    width: `${value}%`,
    background:
      value < 40 ? "#ef4444" : value < 70 ? "#f59e0b" : "#22c55e",
    borderRadius: "20px",
    transition: "0.3s",
  });

  const containerBar = {
    width: "100%",
    background: "#e5e7eb",
    borderRadius: "20px",
    marginTop: "5px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode ? "#0f172a" : "#f1f5f9",
        fontFamily: "sans-serif",
      }}
    >
      {/* DARK MODE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          background: darkMode ? "#f59e0b" : "#111827",
          color: "#fff",
        }}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* CARD */}
      <div
        style={{
          width: "430px",
          padding: "25px",
          borderRadius: "15px",
          background: darkMode ? "#111827" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🔐 Smart Password Strength Checker</h2>

        {/* INPUT */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "85%",
              padding: "10px 40px 10px 12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button
            onClick={clearPassword}
            style={{
              flex: 1,
              padding: "10px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
            }}
          >
            🗑 Clear
          </button>

          <button
            onClick={resetAll}
            style={{
              flex: 1,
              padding: "10px",
              background: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
            }}
          >
            🔄 Reset
          </button>
        </div>

        {/* RESULT */}
        {password && (
          <div style={{ marginTop: "15px" }}>
            <h3 style={{ color: result.color, textAlign: "center" }}>
              {result.strength} Password
            </h3>

            <p style={{ textAlign: "center" }}>
              Score: {result.securityScore}/100
            </p>

            {/* 🔥 LENGTH BAR */}
            <div>
              <p>Length</p>
              <div style={containerBar}>
                <div
                  style={getBar(Math.min(password.length * 12, 100))}
                />
              </div>
            </div>

            {/* 🔥 COMPLEXITY BAR */}
            <div style={{ marginTop: "10px" }}>
              <p>Complexity</p>
              <div style={containerBar}>
                <div
                  style={getBar(
                    (/[A-Z]/.test(password) +
                      /[a-z]/.test(password) +
                      /[0-9]/.test(password) +
                      /[^A-Za-z0-9]/.test(password)) *
                      25
                  )}
                />
              </div>
            </div>

            {/* 🔥 SECURITY BAR */}
            <div style={{ marginTop: "10px" }}>
              <p>Security</p>
              <div style={containerBar}>
                <div style={getBar(result.securityScore)} />
              </div>
            </div>

            {/* ISSUES */}
            <ul style={{ marginTop: "10px" }}>
              {result.issues.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            {/* SUGGESTION */}
            {result.strength !== "Strong" && (
              <p style={{ color: "#2563eb", fontWeight: "bold" }}>
                💡 {generateSuggestion()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}