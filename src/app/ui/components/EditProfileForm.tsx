"use client";

import { useActionState } from "react";
import { updateBrotherProfile, State } from "@/app/lib/actions"; 
import { BrotherProfileProps } from "@/app/lib/definitions";
// ^ We'll define updateBrotherProfile in actions.ts

export default function EditProfileForm({ brother, id }: { brother: BrotherProfileProps, id: string}) {
  const initialState: State = { message: null, errors: {} };

  // Hook into the updateBrotherProfile server action
  const [state, formAction] = useActionState(updateBrotherProfile, initialState);

  // For the dropdown
  const validYears = ["2028", "2027", "2026", "2025"];
  const positions = [
    "New Brother",
    "Archives",
    "Brotherhood Chair",
    "Recruitment Chair",
    "Activism Chair",
    "Service Chair",
    "Finance Chair",
  ];

  return (
    <form
      action={formAction}
      className="flex flex-col w-full bg-white text-black rounded-md p-10 max-md:p-6 shadow-lg relative"
    >
      <h2 className="text-4xl font-bold mb-4">Edit Brother Profile</h2>

      {/* Hidden ID field, so server action knows who to update */}
      <input type="hidden" name="brotherId" value={id} />

      {/* First Name */}
      <label htmlFor="first_name" className="mb-2 font-semibold text-lg">
        First Name
      </label>
      <input
        id="first_name"
        type="text"
        name="first_name"
        defaultValue={brother.first_name}
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
        defaultValue={brother.last_name}
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
        defaultValue={brother.personal_email}
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
        defaultValue={brother.school_email}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      />

      {/* Year Dropdown */}
      <label htmlFor="year" className="mb-2 font-semibold text-lg">
        Graduation Year
      </label>
      <select
        id="year"
        name="year"
        defaultValue={brother.year}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      >
        {validYears.map((year) => (
          <option key={year} value={year}>
            {year}
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
        defaultValue={brother.phone}
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
        defaultValue={brother.house}
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
        defaultValue={brother.brother_name}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      />

      {/* Birthday */}
      <label
        htmlFor="birthday"
        className="mb-2 font-semibold text-lg"
      >
        Birthday
      </label>
      <input
        id="birthday"
        type="date"
        name="birthday"
        defaultValue={brother.birthday} 
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      />

      {/* Location */}
      <label
        htmlFor="location"
        className="mb-2 font-semibold text-lg"
      >
        Location
      </label>
      <input
        id="location"
        type="text"
        name="location"
        defaultValue={brother.location}
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
        defaultValue={brother.tagline}
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
        defaultValue={brother.position}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      >
        {positions.map((p) => (
          <option key={p} value={p}>
            {p}
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
        defaultValue={brother.bio}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed h-24"
        required
      />

      {/* Instagram (optional) */}
      <label htmlFor="instagram" className="mb-2 font-semibold text-lg">
        Instagram Handle (optional)
      </label>
      <input
        id="instagram"
        type="text"
        name="instagram"
        defaultValue={brother.instagram || ""}
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
      />

      {/* Replace or Upload New Profile Picture */}
      <label htmlFor="image" className="mb-2 font-semibold text-lg">
        Replace Profile Picture
      </label>
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        className="rounded-md border border-gray-300 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brandRed"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-brandRed text-white py-2 rounded-md font-semibold hover:bg-black transition-colors"
      >
        Update Profile
      </button>

      {/* Error Message Section */}
      <div
        className="flex h-8 items-end space-x-1 mt-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message && (
          <>
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.94-1.14 2.994-2.674L22 12c0-6.076-4.925-11-11-11S0 5.924 0 12c0 1.53.328 2.98.938 4.326.614 1.363 2.006 2.674 3.552 2.674z"
              />
            </svg>
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
    </form>
  );
}