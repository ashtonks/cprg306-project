"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useState } from "react";

export default function UserLogin() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      await gitHubSignIn();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.divContainer}>
      {user ? (
        <div style={styles.container}>
          <p className="text-4xl font-bold mb-5">Successfully Logged in</p>
          Signed in as: {user.displayName} ({user.email})
          <div>
            <button onClick={firebaseSignOut}>Sign out</button>
          </div>
          <div>
            <a href="/">Home</a>
          </div>
        </div>
      ) : (
        <div style={styles.container}>
          <p className="text-4xl font-bold mb-5">
            {loading ? "Authenticating..." : "Login"}
          </p>
          <button className="text-lg" onClick={handleAuth} disabled={loading}>
            Sign in with GitHub
          </button>
          <div>
            <a href="/">Home</a>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px",
    justifyContent: "center",
    padding: "250px",
    backgroundColor: "#1c1917",
    borderRadius: "10px",
  },
  divContainer: {
    backgroundColor: "#1e1b4b",
    borderRadius: "10px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: "2px",
    borderColor: "#1e3a8a",
  },
};
