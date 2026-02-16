import { Button } from '@/src/components/common/Button';
import { Header } from '@/src/components/common/Header';
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
  const { getProductById, deleteProduct, loadingProduct, products } =
    useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    setLoading(true);
    const productData = await getProductById(id);
    setProduct(productData);
    setLoading(false);
  };
  useEffect(() => {
    loadProduct();
  }, [id, products]);

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
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setDeleting(false);
      setModalVisible(false);
    }
  };

  if (loading || loadingProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Banco" />
        <ProductDetailSkeleton testID={TEST_IDS.skeletonDetail} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Banco" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
          <Button
            title="Volver"
            onPress={() => router.back()}
            variant="primary"
            style={styles.errorButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header showBack title="Banco" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        testID={TEST_IDS.detailContainer}
      >
        <View style={styles.header}>
          <Text style={styles.id}>ID: {product.id}</Text>
          <Text style={styles.extra}>Información extra</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.labelValueView}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{product.name}</Text>
          </View>

          <View style={styles.labelValueView}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.value}>{product.description}</Text>
          </View>

          <View style={styles.labelValueView}>
            <Text style={styles.label}>Logo</Text>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: product.logo }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.labelValueView}>
            <Text style={styles.label}>Fecha de Liberación</Text>
            <Text style={styles.value}>
              {new Date(product.date_release).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.labelValueView}>
            <Text style={styles.label}>Fecha de Revisión</Text>
            <Text style={styles.value}>
              {new Date(product.date_revision).toLocaleDateString()}
            </Text>
          </View>
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
            textStyle={{ color: 'white' }}
          />
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        message={`${CONFIRM_MESSAGES.deleteProduct} ${product.name} ?`}
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
    paddingLeft: 30,
  },
  header: {
    marginBottom: 20,
  },
  id: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  extra: {
    fontSize: 16,
    color: COLORS.gray,
  },

  infoContainer: {
    marginBottom: 20,
  },
  labelValueView: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
    paddingRight: 30,
  },
  logoContainer: {
    flex: 1,
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginLeft: 30,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 40,
  },
  button: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButton: {
    minWidth: 120,
  },
});
