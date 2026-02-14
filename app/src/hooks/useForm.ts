import { useCallback, useState } from 'react';
import { Product, ProductFormErrors } from '../types';
import { validateProduct } from '../utils/validators';

interface UseFormProps {
  initialValues?: Partial<Product>;
  onSubmit: (values: Product) => Promise<void>;
  validateId?: (id: string) => Promise<boolean>;
}

export const useForm = ({
  initialValues = {},
  onSubmit,
  validateId,
}: UseFormProps) => {
  const [values, setValues] = useState<Partial<Product>>(initialValues);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Set<keyof Product>>(new Set());

  const handleChange = useCallback((field: keyof Product, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback((field: keyof Product) => {
    setTouched((prev) => new Set(prev).add(field));
  }, []);

  const validate = useCallback(async (): Promise<boolean> => {
    const validationErrors = await validateProduct(
      values,
      validateId ? validateId : undefined,
    );
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validateId]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const isValid = await validate();
      if (
        isValid &&
        values.id &&
        values.name &&
        values.description &&
        values.logo &&
        values.date_release &&
        values.date_revision
      ) {
        await onSubmit(values as Product);
      }
    } finally {
      setLoading(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(new Set());
  }, [initialValues]);

  const setFieldValue = useCallback(
    (field: keyof Product, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched.has(field)) {
        validateProduct({ [field]: value } as Partial<Product>).then(
          (fieldErrors) => {
            setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
          },
        );
      }
    },
    [touched],
  );

  return {
    values,
    errors,
    loading,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setValues,
    setErrors,
  };
};
