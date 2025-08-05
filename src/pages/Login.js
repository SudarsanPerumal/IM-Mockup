import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      value: "Borrower",
      label: "Issuer (Borrower)",
      description: "Originator seeking revolving funding",
      email: "borrower@abc.com",
      password: "borrower123",
    },
    {
      value: "Facility Agent",
      label: "Facility Agent (Market Maker)",
      description: "Sets up CF Deal, calculates BB, publishes certificates",
      email: "facility@intain.com",
      password: "facility123",
    },
    {
      value: "Lender",
      label: "Lender (Investor)",
      description: "Provide commitments; receive FTs, coupons",
      email: "lender@goldman.com",
      password: "lender123",
    },
    {
      value: "Verification Agent",
      label: "Verification Agent",
      description: "Optional; reviews collateral data",
      email: "verification@verify.com",
      password: "verify123",
    },
    {
      value: "Servicer",
      label: "Servicer",
      description: "Uploads collections, performance data",
      email: "servicer@servicing.com",
      password: "service123",
    },
    {
      value: "Trustee",
      label: "Trustee / Custodian",
      description: "Holds legal title where required",
      email: "trustee@trust.com",
      password: "trust123",
    },
    {
      value: "Treasury Ops",
      label: "Treasury Ops",
      description: "Paying and Calculation Agent",
      email: "treasury@ops.com",
      password: "treasury123",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleRoleChange = (roleValue) => {
    const selectedRole = roles.find((role) => role.value === roleValue);
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        role: roleValue,
        email: selectedRole.email,
        password: selectedRole.password,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    console.log("Form validation passed, starting login process...");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login timeout completed, storing user data...");
      setIsLoading(false);

      // Store user role in localStorage for role-based routing
      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("userEmail", formData.email);

      console.log("User data stored:", {
        role: formData.role,
        email: formData.email,
      });

      // Notify parent component about successful login
      if (onLoginSuccess) {
        onLoginSuccess(formData.role, formData.email);
      }

      // Navigate based on role
      console.log("Navigating to /dashboard...");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <h1>IntainMARKETS</h1>
            <p>Credit Facility Platform</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="role">Select Your Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className={errors.role ? "error" : ""}
            >
              <option value="">Choose your role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label} - {role.description}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="error-message">{errors.role}</span>
            )}
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <div className="login-help">
            <p>
              <strong>Test Credentials:</strong>
            </p>
            <div className="credentials-list">
              {roles.map((role) => (
                <div key={role.value} className="credential-item">
                  <strong>{role.label}:</strong> {role.email} / {role.password}
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="#contact">Contact your administrator</a>
          </p>
          <p>
            <a href="#forgot">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
