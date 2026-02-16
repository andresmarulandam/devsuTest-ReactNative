import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Product } from '../../types';
import { COLORS } from '../../utils/constants';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductPress: (id: string) => void;
  totalCount: number;
  testID?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductPress,
  totalCount,
  testID,
}) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={onProductPress}
      testID={`product-card-${item.id}`}
    />
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{totalCount} registros encontrados</Text>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hay productos para mostrar</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
});
