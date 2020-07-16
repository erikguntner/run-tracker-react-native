import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { parseElevationData } from '../utils/parseElevationData';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { scaleLinear, max, extent, curveMonotoneX, line } from 'd3';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { convertLength } from '@turf/helpers';

import Cursor from './Cursor';

interface ElevationChartProps {
  lines: number[][][];
}

interface DataPoint {
  elevation: number;
  distance: number;
}

const ElevationChart = ({ lines }: ElevationChartProps) => {
  const { units } = useSelector((state: RootState) => ({
    units: state.auth.user.units,
  }));

  const { width } = Dimensions.get('window');
  const height = 200;
  const strokeWidth = 4;
  const padding = strokeWidth / 2;
  const CURSOR_RADIUS = 8;
  const STROKE_WIDTH = CURSOR_RADIUS / 2;

  const elevationData = parseElevationData(lines);
  const yAxisUnits = units === 'miles' ? 'feet' : 'meters';
  const xValue = (d) => convertLength(d.distance, 'meters', units);
  const yValue = (d) =>
    convertLength(
      d.elevation,
      'meters',
      //@ts-ignore
      yAxisUnits,
    );

  const xScale = scaleLinear()
    .domain([0, max(elevationData, xValue)])
    .range([0, width - 40]);

  const yScale = scaleLinear()
    .domain(extent(elevationData, yValue))
    .range([height - padding, padding]);

  const d = line()
    .x((data) => xScale(xValue(data)))
    .y((data) => yScale(yValue(data)))
    .curve(curveMonotoneX)(elevationData);

  return (
    <View>
      <Text>ElevationChart</Text>
      <View style={{ width: '100%', height, backgroundColor: '' }}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <Stop offset="0%" stopColor="#cee3f9" />
              <Stop offset="80%" stopColor="#ddedfa" />
              <Stop offset="100%" stopColor="#feffff" />
            </LinearGradient>
          </Defs>
          <Path
            d={`${d}L ${width} ${height} L 0 ${height}`}
            fill="url(#gradient)"
          />
          <Path fill="transparent" stroke="#0070f3" {...{ d, strokeWidth }} />
        </Svg>
        <Cursor
          r={CURSOR_RADIUS}
          borderWidth={STROKE_WIDTH}
          borderColor="#3977e3"
          {...{ d }}
        />
      </View>
    </View>
  );
};

export default ElevationChart;
