"use client";

import { useState } from "react";
import { useActionState } from "react";
import {
  createBrotherAccount,
  createRecruitAccount,
  State,
} from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function SignUpPage() {
  // Track whether we are signing up as Recruit or Brother
  const [isRecruit, setIsRecruit] = useState(false);

  // Initialize state for the server action responses
  const initialState: State = { message: null, errors: {} };

  // Hooks for the two different sign-up actions
  const [brotherState, brotherFormAction] = useActionState(
    createBrotherAccount,
    initialState
  );
  const [recruitState, recruitFormAction] = useActionState(
    createRecruitAccount,
    initialState
  );

  // We’ll show whichever form state is relevant
  const formState = isRecruit ? recruitState : brotherState;
  const formAction = isRecruit ? recruitFormAction : brotherFormAction;

  // Some constants for dropdown lists
  const validYears = ["2028", "2027", "2026", "2025"];
  const positions = [
    "New Brother",
    "Archives",
    "Brotherhood Chair",
    "Recruitment Chair",
    "Activism Chair",
    "Service Chair",
    "Finance Chair",
    "Alumni Chair"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
        <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
          SIGN UP
        </div>
      </div>

      {/* Main Form Container */}
      <div className="relative w-full flex flex-col items-center mt-[-5rem]">
        <div className="px-4 max-w-lg mx-auto w-full">
          <form
            action={formAction}
            className="flex flex-col w-full bg-white text-black rounded-md p-10 max-md:p-6 shadow-lg relative"
          >
            {/* Title Based on Selection */}
            <h2 className="text-4xl font-bold mb-4">
              {isRecruit ? "Sign Up as a Recruit" : "Sign Up as a Brother"}
            </h2>

            {/* Invitation Code (Brother Only) */}
            {!isRecruit && (
              <>
                <label
                  htmlFor="invite_code"
                  className="mb-2 font-semibold text-lg"
                >
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
              </>
            )}

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

            {/* Email Fields */}
            {isRecruit ? (
              <>
                {/* Recruit Email */}
                <label htmlFor="email" className="mb-2 font-semibold text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
                  required
                />
              </>
            ) : (
              <>
                {/* Brother Emails */}
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
              </>
            )}

            {/* Password (Brother Only) */}
            {!isRecruit && (
              <>
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
              </>
            )}

            {/* Year Dropdown */}
            <label htmlFor="year" className="mb-2 font-semibold text-lg">
              Graduation Year
            </label>
            <select
              id="year"
              name="year"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            >
              {validYears.map((yearVal) => (
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

            {/* House or Room, depending on user type */}
            {!isRecruit ? (
              <>
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
              </>
            ) : (
              <>
                <label htmlFor="room" className="mb-2 font-semibold text-lg">
                  Room
                </label>
                <input
                  id="room"
                  type="text"
                  name="room"
                  placeholder="Lowell E-41"
                  className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
                  required
                />
              </>
            )}

            {/* Brother-Specific Fields */}
            {!isRecruit && (
              <>
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

                <label htmlFor="position" className="mb-2 font-semibold text-lg">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
                  required
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>

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
              </>
            )}

            {/* Image Upload */}
            <label htmlFor="image" className="mb-2 font-semibold text-lg">
              Upload Profile Picture
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="rounded-md border border-gray-300 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brandRed"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-brandRed text-white py-2 rounded-md font-semibold hover:bg-black transition-colors"
            >
              {isRecruit ? "Sign Up as a Recruit" : "Sign Up as a Brother"}
            </button>

            {/* Error Message */}
            <div
              className="flex h-8 items-end space-x-1 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {formState.message && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{formState.message}</p>
                </>
              )}
            </div>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setIsRecruit(!isRecruit)}
              className="absolute bottom-4 right-4 text-sm text-gray-500 hover:text-brandRed transition"
            >
              {isRecruit
                ? "Sign up as a Brother instead?"
                : "Sign up as a Recruit instead?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}