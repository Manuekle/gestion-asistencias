'use client';

import { useState, useCallback } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los campos
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;

      setValues((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      // Limpiar error cuando el usuario modifica el campo
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined
        }));
      }
    },
    [errors]
  );

  // Manejar cuando un campo pierde el foco
  const handleBlur = useCallback((e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  }, []);

  // Validar el formulario
  const validate = useCallback(
    (validationSchema) => {
      if (!validationSchema) return {};

      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (validationError) {
        const errors = {};

        validationError.inner.forEach((error) => {
          errors[error.path] = error.message;
        });

        return errors;
      }
    },
    [values]
  );

  // Manejar el envío del formulario
  const handleSubmit = useCallback(
    (onSubmit, validationSchema) => {
      return async (e) => {
        e.preventDefault();

        // Validar todos los campos
        const validationErrors = validate(validationSchema);
        setErrors(validationErrors);

        // Marcar todos los campos como tocados
        const allTouched = Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});

        setTouched(allTouched);

        // Si hay errores, no continuar
        if (Object.keys(validationErrors).length > 0) {
          return;
        }

        setIsSubmitting(true);

        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [values, validate]
  );

  // Resetear el formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
}
