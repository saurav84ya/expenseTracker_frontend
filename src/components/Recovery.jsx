import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";

export default function Recovery() {
  const initialState = {
    email: "",
    otp: "",
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [get, setGet] = useState(false);
  const [newPass, setNewPass] = useState(false);

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();

  const requestOtp = async () => {
    if (formData.email === "") {
      toast({
        title: "Please provide an email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}auth/logup/getOtpForRecovery/${formData.email}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast({
          title: "OTP has been sent to your email",
          variant: "success",
        });
        setGet(true);
      } else {
        toast({
          title: "Email not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (formData.email === "" || formData.otp === "") {
      toast({
        title: "Please provide email and OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_SERVER}auth/recover/verifyOtp`,
        { email: formData.email, otp: formData.otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast({
          title: "OTP verified successfully",
          variant: "success",
        });
        setNewPass(true);
      } else {
        toast({
          title: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const updatePassword = async () => {
    const { password, confirmPassword } = newPassword;

    // Validate input
    if (!password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_SERVER}auth/recover/changePass`,
        { password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast({
          title: "Password updated successfully",
          variant: "success",
        });

        // Reset states
        setFormData(initialState);
        setNewPassword({ password: "", confirmPassword: "" });
        setNewPass(false);
        setGet(false);
        window.location.href = "/";
      } else {
        toast({
          title: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#F9E6CF] h-screen w-full flex justify-center items-center p-6">
      <div className=" w-[500px] " >
      {!newPass ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Recover your password</h1>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border p-2 w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          {get && (
            <div className="mb-4">
              <label>OTP:</label>
              <input
                type="number"
                id="otp"
                name="otp"
                className="border p-2 w-full"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            </div>
          )}
          {!get ? (
            <button
              onClick={requestOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Request OTP"}
              
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Verifying..." : "Submit OTP"}
            </button>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-4">Set New Password</h1>
          <div className="mb-4">
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              className="border p-2 w-full"
              onChange={(e) =>
                setNewPassword({ ...newPassword, password: e.target.value })
              }
              value={newPassword.password}
            />
          </div>
          <div className="mb-4">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className="border p-2 w-full"
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  confirmPassword: e.target.value,
                })
              }
              value={newPassword.confirmPassword}
            />
          </div>
          <button
            onClick={updatePassword}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
