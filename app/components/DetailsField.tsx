import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface DetailsFieldProps {
  placeholder: string,
  value: any,
  onChangeText: (text: string) => void,
  keyboardType?: TextInputProps['keyboardType'];
}

const DetailsField = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
}: DetailsFieldProps) => {
    return (
        <TextInput
              style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize="none"
                placeholderTextColor="#666"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    required: {
        color: 'red',
    },
    input: {
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        fontSize: 16,
        margin: 12
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default DetailsField;