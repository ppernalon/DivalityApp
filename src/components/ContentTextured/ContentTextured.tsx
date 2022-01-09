import React from 'react'
import {ImageBackground, TouchableOpacity, View} from 'react-native'
import {contentTexturedStyle} from './ContentTexturedStyle'
import ReactIf from '@components/ReactIf'
import {IconButton, Text} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
type ContentTexturedProps = {
    children: JSX.Element
    position: String
}

const ContentTextured = ({children, position}: ContentTexturedProps) => {
    const navigation = useNavigation();

    return (
        <View>
            <ReactIf condition={position === 'header'}>
                <ImageBackground source={require('@images/texturebouton.png')} style={contentTexturedStyle.backgroundHeader}>
                    <View>{children}</View>
                </ImageBackground>
            </ReactIf>
            <ReactIf condition={position === 'footer'}>
                <ImageBackground source={require('@images/texturebouton.png')} style={contentTexturedStyle.backgroundFooter}>
                    <View style={contentTexturedStyle.containerViewFooter}>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                            <Text style={{color: 'white', fontSize: 17}}>Retour au menu</Text>
                        </TouchableOpacity>
                        <IconButton
                            icon="home"
                            color={'white'}
                            size={27}
                            onPress={() => navigation.navigate('Menu')}
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                        />
                    </View>
                </ImageBackground>
            </ReactIf>
        </View>
    )
}

export default ContentTextured
