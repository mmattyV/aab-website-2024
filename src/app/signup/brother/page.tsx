"use client";

import { useActionState } from "react";
import { createBrotherAccount, State } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function BrotherSignUpPage() {
  const initialState: State = { message: null, errors: {} };
  const [brotherState, brotherFormAction] = useActionState(
    createBrotherAccount,
    initialState
  );

  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ["jpeg", "jpg", "png"];
      const allowedMimeTypes = ["image/jpeg", "image/png"];

      const extension = file.name.split(".").pop()?.toLowerCase();
      const isValidExtension =
        extension && allowedExtensions.includes(extension);
      const isValidMimeType = allowedMimeTypes.includes(file.type);

      if (!isValidExtension || !isValidMimeType) {
        setImageError("Only JPEG, JPG, and PNG files are allowed.");
        e.target.value = ""; // Reset the input
      }

      if (isValidExtension && isValidMimeType) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
        <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
          SIGN UP AS BROTHER
        </div>
      </div>

      {/* Main Form Container */}
      <div className="relative w-full flex flex-col items-center mt-[-5rem]">
        <div className="px-4 max-w-lg mx-auto w-full">
          <form
            action={brotherFormAction}
            className="flex flex-col w-full bg-white text-black rounded-md p-10 max-md:p-6 shadow-lg relative"
          >
            {/* Title */}
            <h2 className="text-4xl font-bold mb-4">Sign Up as a Brother</h2>

            {/* Invitation Code */}
            <label htmlFor="invite_code" className="mb-2 font-semibold text-lg">
              Invitation Code
            </label>
            <input
              id="invite_code"
              type="text"
              name="invite_code"
              placeholder="Enter your code"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* First Name */}
            <label htmlFor="first_name" className="mb-2 font-semibold text-lg">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Last Name */}
            <label htmlFor="last_name" className="mb-2 font-semibold text-lg">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Personal Email */}
            <label
              htmlFor="personal_email"
              className="mb-2 font-semibold text-lg"
            >
              Personal Email
            </label>
            <input
              id="personal_email"
              type="email"
              name="personal_email"
              placeholder="you@example.com"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* School Email */}
            <label
              htmlFor="school_email"
              className="mb-2 font-semibold text-lg"
            >
              School Email
            </label>
            <input
              id="school_email"
              type="email"
              name="school_email"
              placeholder="you@harvard.edu"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Password */}
            <label htmlFor="password" className="mb-2 font-semibold text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              className="rounded-md border border-gray-300 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
              minLength={6}
            />

            {/* Graduation Year */}
            <label htmlFor="year" className="mb-2 font-semibold text-lg">
              Graduation Year
            </label>
            <select
              id="year"
              name="year"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            >
              {["2028", "2027", "2026", "2025"].map((yearVal) => (
                <option key={yearVal} value={yearVal}>
                  {yearVal}
                </option>
              ))}
            </select>

            {/* Phone Number */}
            <label htmlFor="phone" className="mb-2 font-semibold text-lg">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="123-456-7890"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* House */}
            <label htmlFor="house" className="mb-2 font-semibold text-lg">
              House
            </label>
            <input
              id="house"
              type="text"
              name="house"
              placeholder="House Name"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Brother Name */}
            <label
              htmlFor="brother_name"
              className="mb-2 font-semibold text-lg"
            >
              Brother Name
            </label>
            <input
              id="brother_name"
              type="text"
              name="brother_name"
              placeholder="Your Brother Name"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Birthday */}
            <label htmlFor="birthday" className="mb-2 font-semibold text-lg">
              Birthday
            </label>
            <input
              id="birthday"
              type="date"
              name="birthday"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Location */}
            <label htmlFor="location" className="mb-2 font-semibold text-lg">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="City, State"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Tagline */}
            <label htmlFor="tagline" className="mb-2 font-semibold text-lg">
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              name="tagline"
              placeholder="Short tagline"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Position */}
            <label htmlFor="position" className="mb-2 font-semibold text-lg">
              Position
            </label>
            <select
              id="position"
              name="position"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            >
              {[
                "New Brother",
                "Archives",
                "Brotherhood Chair",
                "Recruitment Chair",
                "Activism Chair",
                "Service Chair",
                "Finance Chair",
                "Alumni Chair",
              ].map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>

            {/* Bio */}
            <label htmlFor="bio" className="mb-2 font-semibold text-lg">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Write something about yourself..."
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed h-24"
              required
            />

            {/* Instagram Handle (optional) */}
            <label htmlFor="instagram" className="mb-2 font-semibold text-lg">
              Instagram Handle (optional)
            </label>
            <input
              id="instagram"
              type="text"
              name="instagram"
              placeholder="yourhandle"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
            />

            {/* Image Upload */}
            <label htmlFor="image" className="mb-2 font-semibold text-lg">
              Upload Profile Picture (no .heic or .heif files)
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept=".jpeg,.jpg,.png,image/jpeg,image/png"
              className="rounded-md border border-gray-300 p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
              onChange={handleImageChange}
            />
            {imageError && (
              <p className="text-sm text-red-500 mb-4">{imageError}</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 mb-4 w-32 h-32 object-cover rounded-md"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!!imageError}
              className={`bg-brandRed text-white py-2 rounded-md font-semibold hover:bg-black transition-colors ${
                imageError ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign Up as a Brother
            </button>

            {/* Error Message */}
            <div
              className="flex h-8 items-end space-x-1 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {brotherState.message && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{brotherState.message}</p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
