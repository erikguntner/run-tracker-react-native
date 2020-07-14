import React from 'react';
import { Formik } from 'formik';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { AppDispatch } from 'src/redux/store';
import { register } from '../redux/authSlice';

const { width } = Dimensions.get('window');

import { Button } from '../components';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please provide a username!')
    .min(4, 'Username must be between 4-25 characters')
    .max(25, 'Username must be between 4-25 characters'),
  password: Yup.string().required('Please provide a password!'),
});

interface RegisterFormProps {}

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
    marginBottom: 24,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    width: 245,
  },
});

const RegisterForm = ({}: RegisterFormProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      {...{ validationSchema }}
      onSubmit={({ username, email, password }) => {
        dispatch(register({ username, email, password }));
      }}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="username"
            autoCapitalize="none"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          <TextInput
            style={styles.input}
            textContentType="emailAddress"
            autoCapitalize="none"
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          <TextInput
            style={styles.input}
            textContentType="password"
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          <Button label="Register" variant="primary" onPress={handleSubmit} />
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterForm;
