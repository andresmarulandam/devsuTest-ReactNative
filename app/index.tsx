import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCardSkeleton } from './src/components/common/Skeleton';
import { ProductList } from './src/components/products/ProductList';
import { useProducts } from './src/hooks/useProducts';
import {
  COLORS,
  PLACEHOLDERS,
  SCREEN_TITLES,
  TEST_IDS,
} from './src/utils/constants';

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
      <View style={styles.content}>
        <Text style={styles.title}>{SCREEN_TITLES.home}</Text>

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

        <View style={styles.fabContainer}>
          <Text
            style={styles.fab}
            onPress={handleAddPress}
            testID={TEST_IDS.addButton}
          >
            +
          </Text>
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
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
