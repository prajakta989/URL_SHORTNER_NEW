import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import {login} from "../../../Backend/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  let [searchParams]= useSearchParams();
  const longLink = searchParams.get('createNew')
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {data, loading, error, fn:fnlogin} = useFetch(login,formData)
  console.log("dat", data)
  useEffect(() => {
    if(error === null && data){
      console.log("data", data);
      if(!data?.error){
        localStorage.setItem("token", data.token);  // Example: Store token
        localStorage.setItem("user", JSON.stringify(data.user));  // Store user info if needed
        navigate(`/dashborad?${longLink? `createNew=${longLink}`: "" }`)
      } 
    }
  },[data, error])
  const handleLogin = async() => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData,{abortEarly:false})
      const resss = await fnlogin()
      console.log("resss", resss)
    } catch (e) {
        const newErrors = {};
        e.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
        })
        setErrors(newErrors)
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        <Error message={data?.error} />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email}/>}
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password}/>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
