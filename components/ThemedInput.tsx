import { KeyboardTypeOptions, TextInput, TouchableOpacity, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  onChange?: () => {};
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export function ThemedInput({ style, lightColor, darkColor, onChange, secureTextEntry, keyboardType, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <TextInput 
      style={[{ backgroundColor, color }, style]} 
      onChange={onChange} 
      secureTextEntry={secureTextEntry} 
      keyboardType={keyboardType}
      {...otherProps} 
    />
  )
}