import React from 'react'
import {View, StatusBar} from 'react-native'

export default screen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#353866'}}>
      <StatusBar barStyle='light-content' />
    </View>
  )
}
