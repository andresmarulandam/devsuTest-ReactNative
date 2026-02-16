import { Button } from '@/src/components/common/Button';
import { Header } from '@/src/components/common/Header';
import { ProductCardSkeleton } from '@/src/components/common/Skeleton';
import { ProductList } from '@/src/components/products/ProductList';
import { useProducts } from '@/src/hooks/useProducts';
import {
  BUTTON_TEXTS,
  COLORS,
  PLACEHOLDERS,
  TEST_IDS,
} from '@/src/utils/constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { filteredProducts, loading, searchTerm, filterProducts, totalCount } =
    useProducts();

  const [searchInput, setSearchInput] = useState(searchTerm);

  const handleSearch = (text: string) => {
    setSearchInput(text);
    filterProducts(text);
  };

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleAddPress = () => {
    router.push('/product/add');
  };

  const renderSkeletons = () => (
    <>
      <ProductCardSkeleton testID={TEST_IDS.skeletonCard} />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Banco" />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={PLACEHOLDERS.search}
            value={searchInput}
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.gray}
            testID={TEST_IDS.searchInput}
          />
        </View>

        {loading ? (
          <View style={styles.listContainer}>{renderSkeletons()}</View>
        ) : (
          <ProductList
            products={filteredProducts}
            onProductPress={handleProductPress}
            totalCount={totalCount}
            testID={TEST_IDS.productList}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleAddPress}
            testID={TEST_IDS.addButton}
            title={BUTTON_TEXTS.add}
            variant="primary"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    width: '100%',
  },
});
