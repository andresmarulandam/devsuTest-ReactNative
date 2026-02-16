import { Button } from '@/src/components/common/Button';
import { Header } from '@/src/components/common/Header';
import { Input } from '@/src/components/common/Input';
import { ProductDetailSkeleton } from '@/src/components/common/Skeleton';
import { useForm } from '@/src/hooks/useForm';
import { useProducts } from '@/src/hooks/useProducts';
import { Product } from '@/src/types';
import {
  BUTTON_TEXTS,
  COLORS,
  ERROR_MESSAGES,
  PLACEHOLDERS,
  SUCCESS_MESSAGES,
  TEST_IDS,
} from '@/src/utils/constants';
import { formatDateForInput } from '@/src/utils/helpers';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProductById, updateProduct, loadingProduct } = useProducts();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    const productData = await getProductById(id);
    setProduct(productData);
    setLoading(false);
  };

  const handleSubmit = async (values: Product) => {
    try {
      setSubmitting(true);
      const success = await updateProduct(id, values);
      if (success) {
        Alert.alert('Éxito', SUCCESS_MESSAGES.productUpdated);
        router.back();
      } else {
        Alert.alert('Error', ERROR_MESSAGES.unexpectedError);
      }
    } catch {
      Alert.alert('Error', ERROR_MESSAGES.unexpectedError);
    } finally {
      setSubmitting(false);
    }
  };

  // ❗ No llamar a useForm hasta que tengamos el producto
  const {
    values,
    errors,
    loading: formLoading,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
    reset,
    setFieldValue,
  } = useForm({
    initialValues: product || {}, // Si product es null, pasa objeto vacío
    onSubmit: handleSubmit,
  });

  // Mostrar skeleton mientras carga
  if (loading || loadingProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Banco" />
        <ProductDetailSkeleton testID={TEST_IDS.skeletonDetail} />
      </SafeAreaView>
    );
  }

  // Si no hay producto después de cargar, mostrar error
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
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.formTitle}>Editar Producto</Text>

        <Input
          label="ID"
          placeholder={PLACEHOLDERS.id}
          value={values.id}
          onChangeText={(text) => handleChange('id', text)}
          onBlur={() => handleBlur('id')}
          error={touched.has('id') ? errors.id : undefined}
          editable={false}
          testID={TEST_IDS.formId}
        />

        <Input
          label="Nombre"
          placeholder={PLACEHOLDERS.name}
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          onBlur={() => handleBlur('name')}
          error={touched.has('name') ? errors.name : undefined}
          editable={!submitting}
          testID={TEST_IDS.formName}
        />

        <Input
          label="Descripción"
          placeholder={PLACEHOLDERS.description}
          value={values.description}
          onChangeText={(text) => handleChange('description', text)}
          onBlur={() => handleBlur('description')}
          error={touched.has('description') ? errors.description : undefined}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          style={styles.textArea}
          editable={!submitting}
          testID={TEST_IDS.formDescription}
        />

        <Input
          label="Logo"
          placeholder={PLACEHOLDERS.logo}
          value={values.logo}
          onChangeText={(text) => handleChange('logo', text)}
          onBlur={() => handleBlur('logo')}
          error={touched.has('logo') ? errors.logo : undefined}
          editable={!submitting}
          testID={TEST_IDS.formLogo}
        />

        <Input
          label="Fecha de Liberación"
          placeholder={PLACEHOLDERS.dateRelease}
          value={formatDateForInput(values.date_release)}
          onChangeText={(text) => {
            const date = new Date(text);
            if (!isNaN(date.getTime())) {
              setFieldValue('date_release', date);
              const revisionDate = new Date(date);
              revisionDate.setFullYear(revisionDate.getFullYear() + 1);
              setFieldValue('date_revision', revisionDate);
            }
          }}
          onBlur={() => handleBlur('date_release')}
          error={touched.has('date_release') ? errors.date_release : undefined}
          editable={!submitting}
          testID={TEST_IDS.formDateRelease}
        />

        <Input
          label="Fecha de Revisión"
          placeholder={PLACEHOLDERS.dateRevision}
          value={formatDateForInput(values.date_revision)}
          onBlur={() => handleBlur('date_revision')}
          error={
            touched.has('date_revision') ? errors.date_revision : undefined
          }
          editable={false}
          testID={TEST_IDS.formDateRevision}
        />

        <View style={styles.buttonsContainer}>
          <Button
            title={BUTTON_TEXTS.save}
            onPress={submitForm}
            variant="primary"
            style={styles.button}
            loading={submitting || formLoading}
            disabled={submitting || formLoading}
            testID={TEST_IDS.formSubmit}
          />
          <Button
            title={BUTTON_TEXTS.reset}
            onPress={reset}
            variant="gray"
            style={styles.button}
            disabled={submitting}
            testID={TEST_IDS.formReset}
          />
        </View>
      </ScrollView>
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
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 30,
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
