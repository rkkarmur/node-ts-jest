import joi from "joi";
export const loginSchema = joi.object({
  email: joi
    .string()
    .required()
    .min(5)
    .max(255)
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: joi.string().required().min(6).max(12).label("Password"),
});

export const registerSchema = joi.object({
  name: joi.string().required().min(2).max(255).label("Name"),
  email: joi
    .string()
    .required()
    .min(5)
    .max(255)
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: joi
    .string()
    .min(8)
    .max(20)
    .required()
    // .alphanum()
    .pattern(/[a-z]/, { name: "lowercase" }) // at least one lowercase letter
    .pattern(/[A-Z]/, { name: "uppercase" }) // at least one uppercase letter
    .pattern(/[0-9]/, { name: "number" }) // at least one number
    .pattern(/[-_!@#$%^&*()<>?~]/, { name: "special character" })
    .label("Password"),
  confirm_password: joi
    .string()
    .equal(joi.ref("password"))
    .required()
    .label("confirm password")
    .options({
      messages: { "any.only": "{{#label}} does not match with password." },
    }),
  theFiles: joi.string().allow("", null),
});

export const forgotPasswordSchema = joi.object({
  email: joi
    .string()
    .required()
    .min(5)
    .max(255)
    .email({ tlds: { allow: false } })
    .label("Email"),
});
export const resetPasswordSchema = joi.object({
  password: joi.string().required().min(6).max(12).label("Password"),
  password_confirmation: joi
    .string()
    .required()
    .min(6)
    .max(12)
    .label("Confirm Password"),
});
