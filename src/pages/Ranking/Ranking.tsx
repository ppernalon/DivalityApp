import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {colors} from 'GlobalStyle'
import {selectUsername} from '../../store/reducers/UsernameSlice'
import DataTableDivality from '@components/DataTable/DataTableDivality'

const Ranking = () => {
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [rankingData, setRankingData] = useState<[]>([])
    const [usernameSearch, setUsernameSearch] = useState<string>('')
    const [refreshing, setRefreshing] = useState<boolean>(false)

    useEffect(() => {
        loadRanking()
    }, [ws])

    const header = [
        {name: 'Rang', type: 'string', width: 1, nameOfTheData: 'ranking'},
        {name: 'Nom', type: 'string', width: 4, nameOfTheData: 'username'},
        {
            name: 'V/D',
            type: 'string',
            width: 1,
            nameOfTheData: 'rate',
        },
    ]

    const loadRanking = () => {
        setIsDataLoad(false)
        let dataTableTemp: any = []
        ws.send(
            JSON.stringify({
                type: 'ranking',
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'ranking') {
                dataTableTemp = []
                for (const line of JSON.parse(e.data).dataRanking) {
                    dataTableTemp.push({
                        ranking: line.ranking,
                        username: line.username,
                        rate: line.defeat.toString() + '/' + line.victory.toString(),
                    })
                }
                setRankingData(dataTableTemp)
                setIsDataLoad(true)
                setRefreshing(false)
            }
        }
    }
    const onRefresh = () => {
        setRefreshing(true)
        loadRanking()
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
                    CLASSEMENT
                </Text>
            </ContentTextured>
            <ScrollView
                contentContainerStyle={{flex: 1, paddingTop: 30, alignItems: 'center'}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.blueSky]} />}>
                <View style={{width: '90%', alignItems: 'center'}}>
                    <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TextInput
                            style={{width: '60%', marginVertical: 10, backgroundColor: '#f7f7f7', fontSize: 13, marginRight: 15, height: 60}}
                            label="Pseudo à rechercher"
                            mode={'flat'}
                            value={usernameSearch}
                            onChangeText={(username) => setUsernameSearch(username)}
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
                    </View>
                    <DataTableDivality isDataLoad={isDataLoad} data={rankingData} header={header} nameToFilter={[usernameSearch, 'username']} />
                </View>
            </ScrollView>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default Ranking
