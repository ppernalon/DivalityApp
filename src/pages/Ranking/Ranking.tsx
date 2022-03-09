import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {Text, TextInput} from 'react-native-paper'
import {useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {colors} from 'GlobalStyle'
import {selectUsername} from '../../store/reducers/UsernameSlice'

const Ranking = () => {
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [rankingData, setRankingData] = useState<[]>([])
    useEffect(() => {
        loadRanking()
    }, [ws])
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
                console.log(JSON.parse(e.data))
                setIsDataLoad(true)
            }
        }
        setRankingData(dataTableTemp)
        setIsDataLoad(true)
    }
    return (
        <View style={{height: '100%', width: '100%', marginBottom: 50}}>
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
            <View style={{height: '78%', paddingTop: 30, alignItems: 'center'}}>
                <View style={{width: '80%', alignItems: 'center'}}></View>
            </View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default Ranking
