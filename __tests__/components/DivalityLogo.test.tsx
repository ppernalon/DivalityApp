import 'react-native'
import React from 'react'
import DivalityLogo from '../../src/components/DivalityLogo/DivalityLogo'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<DivalityLogo />)
});
