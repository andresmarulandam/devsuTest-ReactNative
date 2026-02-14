import { useCallback, useEffect, useMemo, useState } from 'react';
import { productsApi } from '../api/products';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError('Error al cargar los productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filterProducts = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setFilteredProducts(products);
        return;
      }

      const termLower = term.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(termLower) ||
          product.id.toLowerCase().includes(termLower) ||
          product.description.toLowerCase().includes(termLower),
      );
      setFilteredProducts(filtered);
    },
    [products],
  );

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id);
    },
    [products],
  );

  const createProduct = useCallback(
    async (product: Product): Promise<boolean> => {
      try {
        setError(null);
        await productsApi.create(product);
        await loadProducts();
        return true;
      } catch (error) {
        setError('Error al crear el producto');
        console.error(error);
        return false;
      }
    },
    [loadProducts],
  );

  const updateProduct = useCallback(
    async (id: string, product: Partial<Product>): Promise<boolean> => {
      try {
        setError(null);
        await productsApi.update(id, product);
        await loadProducts();
        return true;
      } catch (error) {
        setError('Error al actualizar el producto');
        console.error(error);
        return false;
      }
    },
    [loadProducts],
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setError(null);
        await productsApi.delete(id);
        await loadProducts();
        return true;
      } catch (error) {
        setError('Error al actualizar el producto');
        console.error(error);
        return false;
      }
    },
    [loadProducts],
  );

  const verifyProductId = useCallback(async (id: string): Promise<boolean> => {
    try {
      return await productsApi.verifyId(id);
    } catch (err) {
      console.error(err);
      return false;
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilteredProducts(products);
  }, [products]);

  const totalCount = useMemo(() => filteredProducts.length, [filteredProducts]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    totalCount,
    loadProducts,
    filterProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    verifyProductId,
    resetFilters,
    setSearchTerm,
  };
};
