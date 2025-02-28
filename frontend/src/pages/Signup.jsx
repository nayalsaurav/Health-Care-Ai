import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";

import axios from "axios";
import { Signin } from "./Signin";

function Signup({ buttonName }) {
  const id = useId();

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State for handling loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Replace with your backend API URL
      const response = await axios.post("http://localhost:3000/api/v1/auth/signup", formData);
      setSuccess("Signup successful! Welcome aboard.");
      console.log(response.data); // Log the response from the server
    } catch (error) {
      setError("There was an error with your signup. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      // Optionally reset the form data
      setFormData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Sign up</DialogTitle>
            <DialogDescription className="sm:text-center">
              Already have an account? <Signin />
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Full name</Label>
              <Input
                id={`${id}-name`}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Matt Welsh"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hi@yourcompany.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center mt-2">{success}</p>}
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline">Continue with Google</Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Terms
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}

export { Signup };