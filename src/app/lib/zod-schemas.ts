import { z } from "zod";

// Just your schemas:
export const BrotherSchema = z.object({
  personal_email: z.string().email(),
  school_email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  year: z.string().regex(/^\d{4}$/),
  phone: z.string().min(1),
  house: z.string().min(1),
  brother_name: z.string().min(1),
  birthday: z.string(),
  location: z.string().min(1),
  tagline: z.string().min(1),
  position: z.string().min(1),
  bio: z.string().min(1),
  instagram: z.string().optional(),
  // Instead of inline arrow function, define it separately or inline:
  image: z.custom<File>((val): val is File => val instanceof File && val.size > 0, {
    message: "Please upload an image file.",
  }),
});

export const RecruitSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  year: z.string().regex(/^\d{4}$/),
  phone: z.string().min(1),
  room: z.string().min(1),
  image: z.custom<File>((val): val is File => val instanceof File && val.size > 0, {
    message: "Please upload an image file.",
  }),
});

export const EditBrotherSchema = z.object({
    brotherId: z.string().uuid(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    personal_email: z.string().email(),
    school_email: z.string().email(),
    year: z.string().regex(/^\d{4}$/),
    phone: z.string().min(1),
    house: z.string().min(1),
    brother_name: z.string().min(1),
    birthday: z.string(),
    location: z.string().min(1),
    tagline: z.string().min(1),
    position: z.string().min(1),
    bio: z.string().min(1),
    instagram: z.string().optional(),
    // ✅ Optional image field to avoid Zod errors on new file
    image: z.any().optional(),
  });