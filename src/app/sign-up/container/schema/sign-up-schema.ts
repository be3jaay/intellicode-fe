import * as z from "zod";

const validatePassword = (password: string) => {
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasLetter && hasNumber && hasSpecialChar && isLongEnough;
};

const passwordComparisonSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

const signUpSchema = z
  .object({
    role: z.enum(["student", "teacher"], {
      message: "Please select your role",
    }),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .email("Must be a valid email")
      .min(1, { message: "Email field is required." }),
    password: z.string().refine(validatePassword, {
      message:
        "Password must be at least 8 characters and contain at least one letter, one number, and one special character",
    }),
    confirmPassword: z.string(),
    studentNumber: z.string().optional(),
    section: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
    when(payload) {
      return passwordComparisonSchema.safeParse(payload.value).success;
    },
  })
  .refine(
    (data) => {
      if (data.role === "student") {
        return data.studentNumber && data.studentNumber.trim().length > 0;
      }
      return true;
    },
    {
      message: "Student number is required for students",
      path: ["studentNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "student") {
        return data.section && data.section.trim().length > 0;
      }
      return true;
    },
    {
      message: "Section is required for students",
      path: ["section"],
    }
  );

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export { signUpSchema };
