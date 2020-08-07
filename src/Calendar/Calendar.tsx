import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalendarProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Calendar = ({}: CalendarProps) => {
  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
    </View>
  );
};

export default Calendar;
