import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
});

interface ButtonProps {
  variant: 'default' | 'primary';
  label: string;
  onPress: () => void;
}

const Button = ({ variant, label, onPress }: ButtonProps) => {
  const backgroundColor =
    variant === 'primary' ? '#0070f3' : 'rgba(12, 13, 52, 0.05)';
  const color = variant === 'primary' ? 'white' : '#0C0D34';
  return (
    <RectButton
      {...{ onPress }}
      style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = { variant: 'default' };

export default Button;
