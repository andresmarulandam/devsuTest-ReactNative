import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../../types';
import { COLORS } from '../../utils/constants';

interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
  testID?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product.id)}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.id} numberOfLines={1}>
          ID: {product.id}
        </Text>
      </View>

      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.border,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  id: {
    fontSize: 14,
    color: COLORS.gray,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: COLORS.gray,
    fontWeight: '300',
  },
});
