import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Button, Image} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import {useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {colors} from 'GlobalStyle'
import {selectUsername} from '../../store/reducers/UsernameSlice'
import {selectFriends} from '../../store/reducers/FriendsSlice'
import DataTableDivality from 'components/DataTable/DataTableDivality'

type MyCommunityProps = {}

const MyCommunity = ({}: MyCommunityProps) => {
    const username = useSelector(selectUsername)
    const friends = useSelector(selectFriends)
    const ws = wsService.getWs()
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [dataForDataTable, setDataForDataTable] = useState<{pseudo: string; rate: string; status: string}[]>([])

    useEffect(() => {
        onChangeFriends()
    }, [friends])

    const onChangeFriends = () => {
        setIsDataLoad(false)
        let dataTableTemp: any = []
        let friendsCopy = JSON.parse(JSON.stringify(friends))
        for (let keyOfOneState of Object.keys(friendsCopy)) {
            dataTableTemp.push.apply(
                dataTableTemp,
                friendsCopy[keyOfOneState].map((oneFriend: {username: any; victory: string; defeat: string}) => {
                    return {username: oneFriend.username, rate: oneFriend.victory.toString() + '/' + oneFriend.defeat.toString(), status: keyOfOneState}
                })
            )
        }
        setDataForDataTable(dataTableTemp)
        setIsDataLoad(true)
    }
    const header = [
        {name: 'Pseudo', type: 'string', width: '', nameOfTheData: 'username'},
        {name: 'V/D', type: 'string', width: '', nameOfTheData: 'rate'},
        {
            name: 'Statut',
            type: 'isConnected',
            width: '',
            nameOfTheData: 'status', //sword-fight //Sport
            action: (item: any, isValidated: boolean) => {
                console.log('tu as défié ', item, isValidated)
            },
        },
        {
            name: 'Défier',
            type: 'icon',
            width: '',
            nameOfTheData: 'fencing', //sword-fight //Sport
            action: (item: any) => {
                console.log('tu as défié ', item)
            },
        },
    ]

    return (
        <View style={{height: '100%', width: '100%', marginBottom: 50}}>
            <ContentTextured position={'header'}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                    }}>
                    MES AMIS
                </Text>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center', marginTop: 30}}>
                <Text style={{marginBottom: 30, fontSize: 17}}>
                    Amis en ligne
                </Text>
                {!isDataLoad ? (
                    <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} />
                ) : (
                    <DataTableDivality isDataLoad={isDataLoad} data={dataForDataTable} header={header} />
                )}
            </View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default MyCommunity
