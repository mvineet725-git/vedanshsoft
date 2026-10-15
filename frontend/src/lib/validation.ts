import { z } from "zod";

const indianMobileRegex = /^(\+?91[\-\s]?)?[6-9]\d{9}$/;
const internationalRegex = /^\+[1-9]\d{7,14}$/;

export const enquiryFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required.")
    .refine(
      (value) => indianMobileRegex.test(value) || internationalRegex.test(value),
      "Enter a valid 10-digit Indian mobile number or an international number with country code."
    ),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .optional()
    .or(z.literal("")),
  organizationName: z.string().trim().max(150).optional().or(z.literal("")),
  organizationType: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  productInterestedIn: z.string().min(1, "Please select a product."),
  preferredContactMethod: z.string().optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consentAccepted: z.literal(true, {
    message: "You must accept the privacy policy to continue.",
  }),
  websiteUrl: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
