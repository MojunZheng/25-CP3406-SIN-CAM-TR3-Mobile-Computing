import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ history }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    const formData = { ...data, [name]: value };
    setData(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    // Simplified login - accepts any email and password
    if (email && password) {
      // Simulate successful login
      const user = {
        email: email,
        username: email.split('@')[0],
        id: Date.now()
      };
      
      // Save user info to local storage
      localStorage.setItem("booktracker_user", JSON.stringify(user));
      localStorage.setItem("token", "mock-token-" + Date.now());
      
      // Navigate to home page
      history.push("/");
    } else {
      setError({ isFailed: true, message: "Please enter email and password" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <input onChange={handleChange} className="" type="email" name="email" id="email-address" placeholder="Email" />
      <input
        onChange={handleChange}
        className=""
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      {error.isFailed ? <pre className="alert alert-danger">{error.message}</pre> : <pre></pre>}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px', fontSize: '14px'}}>
        <strong>Tip:</strong> You can enter any email and password to login!<br/>
        Example: test@test.com / 123
      </div>
      <button>Sign In</button>
    </form>
  );
};

export default LoginPage;
