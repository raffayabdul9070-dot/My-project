import React, { useState } from 'react';
// Import AnimatePresence and motion for the animation to work
import { motion, AnimatePresence } from 'framer-motion'; 
import './login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [currentSavedPassword, setCurrentSavedPassword] = useState('123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === currentSavedPassword) {
      onLogin();
    } else {
      alert("Access Denied: Invalid Credentials");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin') {
      setCurrentSavedPassword(newPassword);
      alert("Security Key Updated Successfully!");
      setIsResetting(false);
      setPassword(''); // Clear the password field for the login screen
    } else {
      alert("Error: Researcher ID not recognized.");
    }
  };

  return (
    <div className="login-screen">
      <div className="passport-card">
        <div className="passport-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/State_emblem_of_Pakistan.svg" alt="Emblem" />
          <h2>ISLAMIC REPUBLIC OF PAKISTAN</h2>
          <p>{isResetting ? "Security Key Recovery" : "National Linguistic Access Portal"}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isResetting ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="login-form-fields" 
              onSubmit={handleSubmit}
            >
              <div className="input-row">
                <label>Researcher ID</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="input-row">
                <label>Security Key</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="verify-btn">VERIFY IDENTITY</button>
              
              <button 
                type="button" 
                className="forgot-link" 
                onClick={() => setIsResetting(true)}
              >
                Forgot Security Key?
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="reset"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="login-form-fields" 
              onSubmit={handleResetPassword}
            >
              <p className="reset-instruction">Enter Researcher ID to verify identity and set a new key.</p>
              <div className="input-row">
                <label>Verify Researcher ID</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="input-row">
                <label>New Security Key</label>
                <input type="password" onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <button type="submit" className="verify-btn">UPDATE KEY</button>
              
              <button 
                type="button" 
                className="forgot-link" 
                onClick={() => setIsResetting(false)}
              >
                Back to Login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;