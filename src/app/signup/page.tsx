"use client";

import React, { useState } from 'react';

export default function SignUpPage() {
  // For demonstration; in a real app, handle form state & auth properly
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement your sign-up logic (e.g. call an API, handle validations)
    console.log("Signing up with", { name, email, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex overflow-hidden flex-col py-64 bg-black max-md:py-24">
        <div className="gap-2.5 self-start p-2.5 ml-12 text-9xl text-white max-md:max-w-full max-md:text-6xl max-md:ml-[22px] max-sm:text-4xl">
          SIGN UP
        </div>
      </div>

      {/* Sign Up Form: larger & moved up */}
      <div className="relative w-full flex flex-col items-center">
        {/* Negative top margin moves the form up over the header space */}
        <div className="mt-[-5rem] px-4 max-w-lg mx-auto w-full">
          <form
            onSubmit={handleSignUp}
            className="flex flex-col w-full bg-white text-black rounded-md p-10 max-md:p-6 shadow-lg"
          >
            <label htmlFor="name" className="mb-2 font-semibold text-lg">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email" className="mb-2 font-semibold text-lg">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="mb-2 font-semibold text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="rounded-md border border-gray-300 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brandRed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-brandRed text-white py-2 rounded-md font-semibold hover:bg-black transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}