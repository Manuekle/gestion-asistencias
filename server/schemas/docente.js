import { z } from 'zod';

// Esquema de validación para crear un docente
export const createDocenteSchema = z.object({
  doc_nombre: z.string().min(1, 'El nombre es obligatorio'),
  doc_correo: z.string().email('Correo inválido'),
  doc_password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.string().min(1, 'El rol es obligatorio'),
  doc_estado: z.boolean()
});

// Esquema de validación para iniciar sesión
export const loginDocenteSchema = z.object({
  doc_correo: z.string().email('Correo inválido'),
  doc_password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});
