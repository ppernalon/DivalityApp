import 'react-native'
import React from 'react'
import App from '../App'
import renderer from 'react-test-renderer'

it('render correctly', () => {
  renderer.create(<App />)
});
