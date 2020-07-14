import React from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'src/redux/store';
import { login } from '../redux/authSlice';
import { Button } from '../components';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    alignItems: 'center',
    width,
  },
  input: {
    padding: 12,
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    width: 245,
  },
});

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={({ username, password }) => {
        dispatch(login({ username, password }));
      }}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          <TextInput
            style={styles.input}
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          <Button label="Signin" variant="primary" onPress={handleSubmit} />
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default LoginForm;
