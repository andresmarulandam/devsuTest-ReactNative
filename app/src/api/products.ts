import { Product } from '../types';
import { httpClient } from './client';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await httpClient.get<{ data: Product[] }>(
        '/bp/products',
      );
      return response.data || [];
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Product> => {
    try {
      const response = await httpClient.get<{ data: Product[] }>(
        '/bp/products',
      );
      const product = response.data.find((p) => p.id === id);

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return product;
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },

  create: async (product: Product): Promise<Product> => {
    try {
      const response = await httpClient.post<{ data: Product }>(
        '/bp/products',
        product,
      );
      return response.data;
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await httpClient.put<{ data: Product }>(
        `/bp/products/${id}`,
        product,
      );
      return response.data;
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await httpClient.delete(`/bp/products/${id}`);
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  },

  verifyId: async (id: string): Promise<boolean> => {
    try {
      const response = await httpClient.get<boolean>(
        `/bp/products/verification/${id}`,
      );
      return response;
    } catch (error) {
      console.error('Error en verifyId:', error);

      if ((error as any)?.status === 404) {
        return false;
      }
      throw error;
    }
  },
};
