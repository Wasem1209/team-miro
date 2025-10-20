"use client";
import React, { useState } from "react";
import ProfileWrapper from "../../userComponent/profile/ProfileWrapper";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function DriversLicensePage() {
  const [formData, setFormData] = useState({
    license_number: "",
    issuing_authority: "",
    issue_date: "",
    expiration_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "https://driveeasy.pythonanywhere.com/api/v1/account/driverlicense",
        {
          method: "POST", // or "PUT" if updating existing info
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`, // assuming JWT stored here
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Driver’s license info updated successfully!" });
        setFormData({
          license_number: "",
          issuing_authority: "",
          issue_date: "",
          expiration_date: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data?.detail || "Failed to update license information.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileWrapper activeTab="license">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {message && (
          <div
            className={`flex items-center gap-2 p-3 text-sm rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Drivers License Number
          </label>
          <input
            name="license_number"
            type="text"
            value={formData.license_number}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Issuing Authority
          </label>
          <input
            name="issuing_authority"
            type="text"
            value={formData.issuing_authority}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Issue Date
            </label>
            <input
              name="issue_date"
              type="date"
              value={formData.issue_date}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Expiration Date
            </label>
            <input
              name="expiration_date"
              type="date"
              value={formData.expiration_date}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Drivers License Information"}
          </button>
        </div>
      </form>
    </ProfileWrapper>
  );
}
