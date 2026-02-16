import { Button } from '@/src/components/common/Button';
import { Modal } from '@/src/components/common/Modal';
import { ProductDetailSkeleton } from '@/src/components/common/Skeleton';
import { useProducts } from '@/src/hooks/useProducts';
import { Product } from '@/src/types';
import {
  BUTTON_TEXTS,
  COLORS,
  CONFIRM_MESSAGES,
  TEST_IDS,
} from '@/src/utils/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProductById, deleteProduct, loading } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const productData = getProductById(id);
    setProduct(productData || null);
  };

  const handleEdit = () => {
    router.push(`/product/edit/${id}`);
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const success = await deleteProduct(id);
      if (success) {
        router.back();
      } else {
        Alert.alert('Error', 'No se pudo eliminar el producto');
      }
    } catch {
      Alert.alert('Error, ocurrió un error inesperado');
    } finally {
      setDeleting(false);
      setModalVisible(false);
    }
  };

  if (loading || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <ProductDetailSkeleton testID={TEST_IDS.skeletonDetail} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        testID={TEST_IDS.detailContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.id}>ID: {product.id}</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={{ uri: product.logo }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{product.description}</Text>

          <Text style={styles.label}>Fecha de Liberación</Text>
          <Text style={styles.value}>
            {product.date_release.toLocaleDateString()}
          </Text>

          <Text style={styles.label}>Fecha de Revisión</Text>
          <Text style={styles.value}>
            {product.date_revision.toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title={BUTTON_TEXTS.edit}
            onPress={handleEdit}
            variant="gray"
            style={styles.button}
            testID={TEST_IDS.editButton}
          />
          <Button
            title={BUTTON_TEXTS.delete}
            onPress={handleDelete}
            variant="danger"
            style={styles.button}
            loading={deleting}
            testID={TEST_IDS.deleteButton}
          />
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        title="Confirmar Eliminación"
        message={CONFIRM_MESSAGES.deleteProduct}
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
        confirmVariant="danger"
        testID={TEST_IDS.modalContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  id: {
    fontSize: 16,
    color: COLORS.gray,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 4,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});
