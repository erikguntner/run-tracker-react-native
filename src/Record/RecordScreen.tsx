import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RecordScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecordScreen = ({}: RecordScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>RecordScreen</Text>
    </View>
  );
};

export default RecordScreen;
