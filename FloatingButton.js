import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

const {height} = Dimensions.get('window')

const animationEndY = Math.ceil(height * 0.7)
const negativeEndY = animationEndY * -1

let heartCount = 1

function getRandomNumber (min, max) {
  return Math.random() * (max - min) + min
}

function getRandomColor () {
  return `rgb(${getRandomNumber(100, 144)},${getRandomNumber(
    10,
    200,
  )},${getRandomNumber(200, 244)})`
}

export default class FloatingButton extends Component {
  state = {
    hearts: [],
  }
  animated = new Animated.Value(0)

  addHeart = () => {
    this.setState(
      {
        hearts: [
          ...this.state.hearts,
          {
            id: heartCount,
            right: getRandomNumber(20, 150),
            color: getRandomColor(),
          },
        ],
      },
      () => {
        heartCount++
      },
    )
  }

  removeHeart = id => {
    this.setState({
      hearts: this.state.hearts.filter(heart => {
        return heart.id !== id
      }),
    })
  }

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1

    Animated.spring(this.animated, {
      toValue,
      friction: 5,
    }).start()
    this.open = !this.open
  }
  render () {
    const pinStyle = {
      transform: [
        {scale: this.animated},
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    }
    const thumStyle = {
      transform: [
        {scale: this.animated},
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    }
    const heartStyle = {
      transform: [
        {scale: this.animated},
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200],
          }),
        },
      ],
    }
    const rotation = {
      transform: [
        {
          rotate: this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    }
    const opacity = this.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    })
    return (
      <View style={[styles.container, this.props.style]}>
        <View>
          {this.state.hearts.map(heart => {
            return (
              <HeartContainer
                key={heart.id}
                style={{right: heart.right}}
                onComplete={() => this.removeHeart(heart.id)}
                color={heart.color}
              />
            )
          })}
        </View>
        <TouchableOpacity onPress={this.addHeart}>
          <Animated.View
            style={[styles.button, styles.secondry, heartStyle, opacity]}>
            <AntDesign name='hearto' size={24} color='#F02A4B' />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Animated.View
            style={[styles.button, styles.secondry, thumStyle, opacity]}>
            <Entypo name='thumbs-up' size={24} color='#F02A4B' />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Animated.View
            style={[styles.button, styles.secondry, pinStyle, opacity]}>
            <Entypo name='location-pin' size={24} color='#F02A4B' />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name='plus' size={24} color='#fff' />
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}

class HeartContainer extends React.Component {
  constructor () {
    super()
    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    })

    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0],
    })

    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 36],
      outputRange: [0, 1.4, 1],
      extrapolate: 'clamp',
    })

    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: [0, 25, 15, 0, 10],
    })

    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
    })
  }
  state = {
    position: new Animated.Value(0),
  }

  static defaultProps = {
    onComplete () {},
  }
  componentDidMount () {
    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(this.props.onComplete)
  }

  getHeartStyle () {
    return {
      transform: [
        {translateY: this.state.position},
        {scale: this.scaleAnimation},
        {translateX: this.xAnimation},
        {rotate: this.rotateAnimation},
      ],
      opacity: this.opacityAnimation,
    }
  }
  render () {
    return (
      <Animated.View
        style={[styles.heartContainer, this.getHeartStyle(), this.props.style]}>
        <Heart color={this.props.color} />
      </Animated.View>
    )
  }
}

const Heart = props => (
  <View {...props} style={[styles.heart, props.style]}>
    <AntDesign name='heart' size={48} color={props.color} />
  </View>
)
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 18,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondry: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#FFF',
  },
  heartContainer: {
    position: 'absolute',

    backgroundColor: 'transparent',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
