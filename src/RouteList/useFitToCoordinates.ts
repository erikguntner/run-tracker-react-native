import { useEffect, useMemo, MutableRefObject } from 'react';
import bbox from '@turf/bbox';
import { multiLineString } from '@turf/helpers';
import MapView from 'react-native-maps';
import { Route } from './routeListSlice';

interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const useFitToCoordinates = (
  ref: MutableRefObject<MapView | null>,
  route: Route,
  padding: Padding,
) => {
  useEffect(() => {
    if (ref.current) {
      const { lines } = route;
      const line = multiLineString(lines);
      const boundingBox = bbox(line);
      ref.current.fitToCoordinates(
        [
          { latitude: boundingBox[1], longitude: boundingBox[0] },
          { latitude: boundingBox[3], longitude: boundingBox[2] },
        ],
        {
          edgePadding: padding,
          animated: false,
        },
      );
    }
  }, [route, padding, ref]);

  const { coordinates } = useMemo(() => {
    const { lines } = route;
    const coordinates = lines
      .reduce((accum, curr) => accum.concat(curr), [])
      .map((route) => ({ latitude: route[1], longitude: route[0] }));

    return {
      coordinates,
    };
  }, [route]);

  return { coordinates };
};
