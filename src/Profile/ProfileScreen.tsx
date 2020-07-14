import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProfileScreen = ({}: ProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
