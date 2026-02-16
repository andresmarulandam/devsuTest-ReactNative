import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Input } from '../../../components/common/Input';
import { COLORS } from '../../../utils/constants';

describe('Input Component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnFocus = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnBlur.mockClear();
    mockOnFocus.mockClear();
  });

  test('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('renders label when provided', () => {
    const { getByText } = render(
      <Input
        label="Username"
        placeholder="Enter username"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(getByText('Username')).toBeTruthy();
  });

  test('shows error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(
      <Input
        placeholder="Test Input"
        value="test"
        onChangeText={mockOnChangeText}
        error={errorMessage}
      />,
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });

  test('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Type here"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Type here'), 'new text');
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  test('calls onFocus and onBlur correctly', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Focus test"
        value=""
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    const input = getByPlaceholderText('Focus test');

    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalledTimes(1);

    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles when focused', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Focus style"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    const input = getByPlaceholderText('Focus style');

    fireEvent(input, 'focus');

    expect(input.props.style).toContainEqual(
      expect.objectContaining({ borderColor: COLORS.primary, borderWidth: 2 }),
    );
  });

  test('applies error styles when error is present', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Error style"
        value="test"
        onChangeText={mockOnChangeText}
        error="Error message"
      />,
    );

    const input = getByPlaceholderText('Error style');

    expect(input.props.style).toContainEqual(
      expect.objectContaining({ borderColor: COLORS.danger, borderWidth: 2 }),
    );
  });

  test('is not editable when editable prop is false', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Disabled input"
        value="test"
        onChangeText={mockOnChangeText}
        editable={false}
      />,
    );

    const input = getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
  });

  test('applies custom container styles', () => {
    const customStyle = { marginBottom: 20, width: '90%' as const };
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Custom container"
        value=""
        onChangeText={mockOnChangeText}
        containerStyle={customStyle}
      />,
    );

    const container = getByPlaceholderText('Custom container').parent?.parent;
    expect(container?.props.style).toContainEqual(
      expect.objectContaining(customStyle),
    );
  });
});
