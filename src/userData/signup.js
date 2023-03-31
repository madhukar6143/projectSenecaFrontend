import React from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import axios from "axios";
import { URL } from "../App";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';

import handleErrors from '../errorComponent'

const Signup = () => {
  const navigate = useNavigate();
  
  const { addToast } = useToasts();
  const {register,handleSubmit,reset,formState: { errors }} = useForm();

  const onSubmit = async(data) => {
    try{
      console.log(data)
      let response= await axios.post(`${URL}/api/users/insert`,data)
      addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
      reset();
      navigate('/login', { state: { email: data.email, password: data.password } });
      }catch (error) 
      {
        handleErrors(error, addToast);
        }
      
  };

  return (
    <div className="signup-page">
      <div className="form-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
  {...register("name", {
    required: true,
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Name should contain only alphabets",
    },
  })}
  type="text"
  name="name"
  placeholder="Name"
  autoComplete="off" 
/>

{errors.name && (
  <span className="error">{errors.name.message}</span>
)}
         <input
  {...register("userName", {
    required: true,
    minLength: 8,
    maxLength: 16,
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Username should contain only alphanumeric characters",
    },
  })}
  type="text"
  name="userName"
  placeholder="Username"
  autoComplete="off" 
/>

{errors.userName && errors.userName.type === "required" && (
  <span className="error">Username is required</span>
)}
{errors.userName && errors.userName.type === "minLength" && (
  <span className="error">
    Username must be at least 8 characters
  </span>
)}
{errors.userName && errors.userName.type === "maxLength" && (
  <span className="error">
    Username must be no more than 16 characters
  </span>
)}
{errors.userName && errors.userName.type === "pattern" && (
  <span className="error">{errors.username.message}</span>
)}


<input
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off" 
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Format",
              },
            })}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off" 
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

<input
  {...register("mobileNumber", {
    required: true,
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Mobile number should be 10 digits"
    }
  })}
  type="tel"
  name="mobileNumber"
  placeholder="Mobile"
  autoComplete="off" 
/>
{errors.mobileNumber && (
  <span className="error">{errors.mobileNumber.message}</span>
)}

<select {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="error">Gender is required</span>
            )}

          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
