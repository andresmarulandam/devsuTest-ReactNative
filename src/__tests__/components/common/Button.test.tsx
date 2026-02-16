import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../../../components/common/Button';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  test('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Press Me" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Press Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('shows loading indicator when loading prop is true', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button
        title="Loading Button"
        onPress={mockOnPress}
        loading={true}
        testID="test-button"
      />,
    );

    expect(queryByText('Loading Button')).toBeNull();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  test('does not call onPress when disabled', () => {
    const { getByText } = render(
      <Button title="Disabled" onPress={mockOnPress} disabled={true} />,
    );

    fireEvent.press(getByText('Disabled'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
