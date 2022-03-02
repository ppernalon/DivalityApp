import Card from '@components/Card/Card'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {colors as colorsGlobal} from 'GlobalStyle'
import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native'
import {Button, Divider, IconButton, Menu, Modal, Portal, Text, TextInput, useTheme} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {selectUsername} from 'store/reducers/UsernameSlice'
import wsService from '../../ws-services/WsService'
import {auctionHouseStyle} from './AuctionHouseStyle'
import DropDownPicker from 'react-native-dropdown-picker'
import ProfileHttpService from 'http-services/ProfileHttpService'

type ProfilePasswordModalProps = {
    isModalVisible: boolean
    closeModalProps: Function
}

const ProfilePasswordModal = ({isModalVisible, closeModalProps}: ProfilePasswordModalProps) => {
    const username = useSelector(selectUsername)
    const [errorToDisplay, setErrorToDisplay] = useState<string>('')
    const [formOutput, setFormOutput] = useState<{password: string; confirmationPassword: string}>({password: '', confirmationPassword: ''})

    const {fonts, colors} = useTheme()

    const fontStyle = {
        fontFamily: fonts.regular.fontFamily,
        color: colors.placeholder,
        fontSize: 12,
    }
    const closeModal = () => {
        setErrorToDisplay('')
        closeModalProps()
    }
    const changePassword = () => {
        if (formOutput.password === formOutput.confirmationPassword) {
            setErrorToDisplay('')
            ProfileHttpService.changePassword(formOutput)
                .then(() => {
                    console.log('ok')
                })
                .catch((err) => {
                    const error = JSON.parse(JSON.stringify(err)).status
                    console.log(JSON.parse(JSON.stringify(err)))
                })
        } else {
            setErrorToDisplay('Les mots de passes sont différents')
        }
    }

    return (
        <Portal>
            <Modal
                visible={isModalVisible}
                onDismiss={() => {
                    closeModal()
                }}
                contentContainerStyle={{backgroundColor: 'white', width: '80%', margin: '10%'}}>
                <View style={{width: '100%'}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            closeModal()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        style={{marginLeft: '85%'}}
                    />

                    <ScrollView style={{marginLeft: '15%', width: '70%', marginVertical: 20}}>
                        <Text>Voulez-vous changer votre mot de passe?</Text>
                        <TextInput
                            style={auctionHouseStyle.formNewSell}
                            secureTextEntry={true}
                            mode={'flat'}
                            underlineColor={colorsGlobal.primaryBlue}
                            label="Nouveau mot de passe"
                            value={formOutput.password}
                            onChangeText={(newValue) => {
                                setFormOutput({...formOutput, password: newValue})
                            }}
                        />
                        <TextInput
                            style={auctionHouseStyle.formNewSell}
                            mode={'flat'}
                            secureTextEntry={true}
                            underlineColor={colorsGlobal.primaryBlue}
                            label="Confirmation du nouveau mot de passe"
                            value={formOutput.confirmationPassword}
                            onChangeText={(newValue) => {
                                setFormOutput({...formOutput, confirmationPassword: newValue})
                            }}
                        />
                    </ScrollView>
                    <View
                        style={{
                            width: '100%',
                            marginHorizontal: '5%',
                            bottom: '5%',
                            marginTop: 30
                        }}>
                        {errorToDisplay !== '' ? (
                            <Text style={{color: colorsGlobal.errorRed, fontSize: 12, marginVertical: 20, left: '10%'}}>{errorToDisplay}</Text>
                        ) : (
                            <></>
                        )}
                        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    isCancelButton={true}
                                    label={'Annuler'}
                                    onSubmit={() => closeModal()}
                                    fontSize={14}
                                    paddingVertical={5}
                                />
                            </View>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    onSubmit={() => {
                                        changePassword()
                                    }}
                                    label={'Valider'}
                                    fontSize={14}
                                    paddingVertical={5}
                                    isShadow={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default ProfilePasswordModal
