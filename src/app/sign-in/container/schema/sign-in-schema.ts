import * as z from "zod";

const signInSchema = z.object({
  email: z
    .email("Must be an email.")
    .min(1, { message: "Email Field is required." }),
  password: z.string("Password is required."),
  rememberMe: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

export { signInSchema, type SignInSchemaType };
