import { z } from "zod";

// Esquema de validación para crear un usuario
export const createUsuarioSchema = z.object({
  usua_nombre: z.string().min(1, "El nombre es obligatorio"),
  usua_correo: z.string().email("Correo inválido"),
  usua_password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  usua_rol: z.enum(["docente", "estudiante"], "Rol inválido"), // Ajusta los roles según tus necesidades
  usua_estado: z.boolean(),
});

// Esquema de validación para iniciar sesión
export const loginUsuarioSchema = z.object({
  usua_correo: z.string().email("Correo inválido"),
  usua_password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
}); 
