// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react'
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native'

// import {createAppContainer} from 'react-navigation'
// import {createBottomTabNavigator} from 'react-navigation-tabs'

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import {
//   BookScreen,
//   MesuresScreen,
//   ProfieScreen,
//   TreatmentScreen,
// } from './screens'

// import AddButton from './components/AddButton'

// const TabNavigator = createBottomTabNavigator(
//   {
//     Book: {
//       screen: BookScreen,
//       navigationOptions: {
//         tabBarIcon: () => (
//           <FontAwesome5 name='book-medical' size={24} color='#F6B352' />
//         ),
//       },
//     },
//     Measures: {
//       screen: MesuresScreen,
//       navigationOptions: {
//         tabBarIcon: () => (
//           <FontAwesome5 name='heartbeat' size={24} color='#F6B352' />
//         ),
//       },
//     },
//     Add: {
//       screen: () => null,
//       navigationOptions: {
//         tabBarIcon: <AddButton />,
//       },
//     },

//     Treatment: {
//       screen: TreatmentScreen,
//       navigationOptions: {
//         tabBarIcon: () => (
//           <FontAwesome5 name='band-aid' size={24} color='#F6B352' />
//         ),
//       },
//     },
//     Profie: {
//       screen: ProfieScreen,
//       navigationOptions: {
//         tabBarIcon: () => (
//           <FontAwesome5 name='user' size={24} color='#F6B352' />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       showLabel: false,
//     },
//   },
// )

// export default createAppContainer(TabNavigator)

import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import FloatingButton from './FloatingButton'

export default function App () {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/map.png')}
        resizeMode='cover'
        style={{width: 500, height: 900, opacity: 0.5}}
      />
      <FloatingButton style={{bottom: 90, right: 90}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
