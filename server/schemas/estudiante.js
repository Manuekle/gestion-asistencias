import { z } from "zod";

// Esquema de validación para crear un estudiante
export const createEstudianteSchema = z.object({
  estu_nombre: z.string().min(1, "El nombre es obligatorio"),
  estu_correo: z.string().email("Correo inválido"),
  estu_password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.string().min(1, "El rol es obligatorio"),
  estu_estado: z.boolean(),
});

// Esquema de validación para iniciar sesión
export const loginEstudianteSchema = z.object({
  estu_correo: z.string().email("Correo inválido"),
  estu_password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
