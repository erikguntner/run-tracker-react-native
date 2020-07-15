import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Button } from '../components';

interface ProfileScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProfileScreen = ({}: ProfileScreenProps) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button variant="primary" label="logout" {...{ onPress }} />
    </View>
  );
};

export default ProfileScreen;
