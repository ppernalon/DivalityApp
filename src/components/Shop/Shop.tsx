import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, IconButton, Text, TextInput} from 'react-native-paper'
import {colors} from 'GlobalStyle'

type ShopProps = {}

const Shop = () => {
    const [divinityNameSearch, setDivinityNameSearch] = useState('')
    const [divinityNameSearchIsFocused, setDivinityNameSearchIsFocused] = useState(false)

    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    style={{width: '60%', marginVertical: 20, backgroundColor: '#f7f7f7', fontSize: 15, marginRight: 15}}
                    label="Nom de la divinité"
                    mode={'flat'}
                    value={divinityNameSearch}
                    onChangeText={(divinityNameSearch) => setDivinityNameSearch(divinityNameSearch)}
                    underlineColor={colors.blueSky}
                    theme={{colors: {text: colors.blueSky, primary: colors.blueSky, placeholder: colors.blueSky}}}
                    right={
                        <TextInput.Icon
                            name="magnify"
                            color={(isTextInputFocused: boolean) => {
                                if (isTextInputFocused) {
                                    return colors.blueSky
                                } else return colors.blueSky
                            }}
                        />
                    }
                />
                <IconButton
                    icon="reload"
                    onPress={() => {}}
                    size={40}
                    hasTVPreferredFocus={undefined}
                    tvParallaxProperties={undefined}
                    color={colors.blueSky}
                />
                
            </View>
        </View>
    )
}

export default Shop
