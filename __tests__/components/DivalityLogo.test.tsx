import 'react-native'
import React from 'react'
import DivalityLogo from '../../src/components/DivalityLogo/DivalityLogo'
import renderer from 'react-test-renderer'

it('render correctly', () => {
  renderer.create(<DivalityLogo />)
});
