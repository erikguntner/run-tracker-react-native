import 'react-native';
import React from 'react';
import { render } from '../../src/utils/test-utils/test-utils';
import ProfileScreen from '../../src/Profile/ProfileScreen';
//mocking async storage module
const mockedSetItem = jest.fn();
jest.mock('@react-native-community/async-storage', () => ({
  setItem: mockedSetItem,
}));

describe('<ProfileScreen />', () => {
  test('renders correctly', () => {
    const { debug } = render(<ProfileScreen />);
    debug();
  });
});
