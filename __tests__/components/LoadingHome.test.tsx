import 'react-native'
import React from 'react'
import LoadingHome from '@components/LoadingHome/LoadingHome'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<LoadingHome />)
});
