import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteListStackNavProps } from './RouteListParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.61,
  },
  image: {
    height: 200,
  },
});

const RouteScreen = ({ route }: RouteListStackNavProps<'Route'>) => {
  const { data } = useSelector(({ routeList }: RootState) => ({
    data: routeList.routes.find(({ id }) => id === route.params.id),
  }));

  console.log(data);

  return (
    <View>
      <Text>RouteScreen</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: data?.image,
          }}
        />
      </View>
    </View>
  );
};

export default RouteScreen;
