import React, {useRef} from "react"
import { View, Animated } from "react-native"
import DivalityLogo from "@components/DivalityLogo/DivalityLogo"
import { loadingHomeStyle } from "./LoadingHomeStyle"
import LinearGradient from "react-native-linear-gradient"

const LoadingHome = () => {
    let animation = useRef<any>(new Animated.Value(0)).current
    const animatedStyles = {
        transform: [
          { translateY: animation }
        ]
    }
    LoadingHome.startAnimation(animation)
    return (
        <View>
             <LinearGradient 
                colors={['#49C5FF', '#8DD1EE']} 
                style={loadingHomeStyle.background}>
                    <View style={loadingHomeStyle.containerLogo}>
                        <DivalityLogo/>
                    </View>
                <Animated.Image 
                    source={require('@images/earthImage.png')}
                    style={[loadingHomeStyle.earthImage, animatedStyles]}/>
            </LinearGradient>
        </View>
    )
}

LoadingHome.startAnimation = (animation:any) => {
    Animated.loop(Animated.sequence([
        Animated.timing(animation, {
            toValue: 10,
            duration: 1700,
            useNativeDriver: true
        }),
        Animated.timing(animation, {
            toValue: 0,
            duration: 1700,
            useNativeDriver: true
        })
    ])).start(() => {
      animation.setValue(0);
    });
}

export default LoadingHome