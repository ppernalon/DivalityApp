import React, {Component} from "react"
import { 
    View,
    Image,
    Animated,
    TouchableWithoutFeedback
} from "react-native"
import DivalityLogo from "@components/DivalityLogo/DivalityLogo"
import { loadingHomeStyle } from "./LoadingHomeStyle"
import LinearGradient from "react-native-linear-gradient"

export default class LoadingHome extends Component {
    state = {
        animation: new Animated.Value(0),
      };
      startAnimation = () => {
        Animated.loop(Animated.sequence([Animated.timing(this.state.animation, {
          toValue: 10,
          duration: 1700,
          useNativeDriver: true
        }),
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 1700,
            useNativeDriver: true
          })])).start(() => {
          this.state.animation.setValue(0);
        });
    }
    render(){
        this.startAnimation()
        const animatedStyles = {
            transform: [
              { translateY: this.state.animation }
            ]
          }
        return (
            <View>
                 <LinearGradient colors={['#49C5FF', '#8DD1EE']} style={loadingHomeStyle.container}>
                    <DivalityLogo/>
                    <Animated.Image 
                    source={require('@images/earthImage.png')}
                    style={[loadingHomeStyle.earthImage, animatedStyles]}
                    />
                </LinearGradient>
            </View>
    
        )
    }
}


