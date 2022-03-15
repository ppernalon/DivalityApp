import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {colors} from 'GlobalStyle'
import {selectUsername} from '../../store/reducers/UsernameSlice'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {profileStyles} from './MyProfileStyles'
import {selectDisciples} from 'store/reducers/DisciplesSlice'
import ProfilePasswordModal from 'components/ModalDivality/ProfilePasswordModal'
import {Appbar} from 'react-native-paper'
import {ScrollView} from 'react-native-gesture-handler'

type MyProfileProps = {}

const MyProfile = ({}: MyProfileProps) => {
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const nberDisciples = useSelector(selectDisciples)
    const [isModalChangePassword, setIsModalChangePassword] = useState<boolean>(false)
    const [winRate, setWinRate] = useState<string>('')

    useEffect(() => {
        loadWinRate()
    }, [ws])

    const loadWinRate = () => {
        ws.send(
            JSON.stringify({
                type: 'infoWinRate',
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            console.log(e)
            if (JSON.parse(e.data).type === 'infoWinRate') {
                const data = JSON.parse(e.data)
                console.log(data)
                if (data.victory && data.defeat) {
                    setWinRate(data.victory.toString() + '/' + data.defeat.toString())
                } else {
                    setWinRate('Indisponible')
                }
            }
        }
    }

    return (
        <View style={{height: '100%', width: '100%'}}>
            <ContentTextured position={'header'}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                    }}>
                    MON PROFILE
                </Text>
            </ContentTextured>
            <View style={{alignItems: 'center', flex: 1, paddingTop: 40}}>
                <View style={{width: '80%', alignItems: 'center'}}>
                    <View style={{width: '90%'}}>
                        <Text style={profileStyles.formName}>Pseudo</Text>
                        <TextInput mode={'flat'} underlineColor={colors.primaryBlue} disabled={true} style={profileStyles.formSell}>
                            {username}
                        </TextInput>
                        <View style={{marginVertical: 15}}>
                            <Text style={profileStyles.formName}>Disciples</Text>
                            <TextInput mode={'flat'} underlineColor={colors.primaryBlue} disabled={true} style={profileStyles.formSell}>
                                {nberDisciples}
                            </TextInput>
                        </View>
                        <View>
                            <Text style={profileStyles.formName}>Victoire/Défaite</Text>
                            <TextInput mode={'flat'} underlineColor={colors.primaryBlue} disabled={true} style={profileStyles.formSell}>
                                {winRate}
                            </TextInput>
                        </View>
                        <View style={{marginVertical: 15}}>
                            <DivalityButtonTextured
                                fontSize={15}
                                paddingVertical={10}
                                label={'Changer de mot de passe'}
                                onSubmit={() => {
                                    setIsModalChangePassword(!isModalChangePassword)
                                }}></DivalityButtonTextured>
                        </View>
                        <ProfilePasswordModal
                            isModalVisible={isModalChangePassword}
                            closeModalProps={() => {
                                setIsModalChangePassword(!isModalChangePassword)
                            }}></ProfilePasswordModal>
                    </View>
                </View>
            </View>
            <View>
                <ContentTextured position={'footer'} />
            </View>
        </View>
    )
}

export default MyProfile
