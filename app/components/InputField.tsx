import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
}


const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
}: InputFieldProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      placeholderTextColor="#666"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default InputField;