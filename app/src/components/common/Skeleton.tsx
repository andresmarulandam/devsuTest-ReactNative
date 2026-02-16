import React, { useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../utils/constants';

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  testID?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  testID,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
      testID={testID}
    />
  );
};

export const ProductCardSkeleton: React.FC<{ testID?: string }> = ({
  testID,
}) => {
  return (
    <View style={styles.cardContainer} testID={testID}>
      <View style={styles.cardContent}>
        <Skeleton width="60%" height={20} style={styles.marginBottom} />
        <Skeleton width="40%" height={16} />
      </View>
      <Skeleton width={20} height={20} borderRadius={10} />
    </View>
  );
};

export const ProductDetailSkeleton: React.FC<{ testID?: string }> = ({
  testID,
}) => {
  return (
    <View style={styles.detailContainer} testID={testID}>
      <Skeleton width="80%" height={28} style={styles.marginBottom} />
      <Skeleton width="100%" height={100} style={styles.marginBottom} />
      <Skeleton width="100%" height={50} style={styles.marginBottom} />
      <Skeleton width="100%" height={50} style={styles.marginBottom} />
      <Skeleton width="100%" height={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS.lightGray,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  detailContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  marginBottom: {
    marginBottom: 8,
  },
});
