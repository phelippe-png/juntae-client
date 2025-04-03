import { TouchableOpacity, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  onPress?: () => {}
};

export function ThemedButton({ style, lightColor, darkColor, onPress, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <TouchableOpacity style={[{ backgroundColor }, style]} onPress={onPress} {...otherProps} />;
}