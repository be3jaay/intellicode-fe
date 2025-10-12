import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const createCourseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .min(3, { message: "Title must be at least 3 characters." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .min(10, { message: "Description must be at least 10 characters." })
    .max(1000, { message: "Description must not exceed 1000 characters." }),
  category: z
    .string()
    .min(1, { message: "Category is required." }),
  thumbnail: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Optional field
        return file instanceof File;
      },
      { message: "Please upload a valid file." }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      { message: "File size must be less than 5MB." }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      },
      { message: "Only JPEG, PNG, and WebP formats are supported." }
    ),
});

type CreateCourseSchemaType = z.infer<typeof createCourseSchema>;

export { createCourseSchema, type CreateCourseSchemaType };

