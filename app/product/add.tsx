import { Button } from '@/src/components/common/Button';
import { Header } from '@/src/components/common/Header';
import { Input } from '@/src/components/common/Input';
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
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddProductScreen() {
  const { createProduct, verifyProductId } = useProducts();
  const [submitting, setSubmitting] = useState(false);

  const initialValues: Partial<Product> = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    ),
  };

  const handleSubmit = async (values: Product) => {
    try {
      setSubmitting(true);
      const success = await createProduct(values);
      if (success) {
        Alert.alert('Éxito', SUCCESS_MESSAGES.productCreated);
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

  const validateId = async (id: string): Promise<boolean> => {
    const exists = await verifyProductId(id);
    return exists;
  };

  const {
    values,
    errors,
    loading,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
    reset,
    setFieldValue,
  } = useForm({
    initialValues,
    onSubmit: handleSubmit,
    validateId,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header showBack title="Banco" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Formulario de Registro</Text>

        <Input
          label="ID"
          placeholder={PLACEHOLDERS.id}
          value={values.id}
          onChangeText={(text) => handleChange('id', text)}
          onBlur={() => handleBlur('id')}
          error={touched.has('id') ? errors.id : undefined}
          editable={!submitting}
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
          value={values.date_release?.toISOString().split('T')[0]}
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
          value={values.date_revision?.toISOString().split('T')[0]}
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
            loading={submitting || loading}
            disabled={submitting || loading}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    flex: 1,
  },
});
