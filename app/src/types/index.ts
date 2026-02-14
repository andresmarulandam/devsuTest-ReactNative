export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface ApiResponse<T> {
  data: T[];
  message?: string;
  status?: number;
}

export type ProductFormErrors = Partial<Record<keyof Product, string>>;

export interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
  testID?: string;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}
