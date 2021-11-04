import 'react-native'
import React from 'react'
import SignIn from '../../src/pages/SignIn/SignIn'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<SignIn />)
});
