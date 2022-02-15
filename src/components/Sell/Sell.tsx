import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Text, TextInput, ToggleButton} from 'react-native-paper'
import {colors} from 'GlobalStyle'
import {sellStyles} from './SellStyle'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import wsService from 'ws-services/WsService'
import { selectUsername } from 'store/reducers/UsernameSlice'
import { useSelector } from 'react-redux'
import DataTableDivality from 'components/DataTable/DataTableDivality'
import AuctionHouseModal from 'components/AuctionHouseModal/AuctionHouseModal'
import AuctionHouseModalNewSell from 'components/AuctionHouseModal/AuctionHouseModalNewSell'

type SellProps = {}

const Sell = () => {
    const [divinityNameSearch, setDivinityNameSearch] = useState('')
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const [sellData, setSellData] = useState<[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [isModalAddSellVisible, setIsModalAddSellVisible] = useState<boolean>(false)

    const [cardInfoModal, setCardInfoModal] = useState<any>({})
    
    const header = [
        {name: 'Divinités', type: 'string', width: '', nameOfTheData: 'cardName'},
        {name: 'Vendeur', type: 'string', width: '', nameOfTheData: 'ownerName'},
        {name: 'Prix', type: 'string', width: '', nameOfTheData: 'price'},
        {
            name: '',
            type: 'icon',
            width: '',
            nameOfTheData: 'delete',
            action: (item: any) => {
                onDeleteClick(item)
            },
        }
    ]
    
    useEffect(() => {
        loadDataSell()
    }, [ws])

    const loadDataSell = () => {
        setIsDataLoad(false)
        ws.send(
            JSON.stringify({
                type: 'auctionHouse',
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'auctionHouse') {
                setSellData(JSON.parse(e.data).shopData)
                setIsDataLoad(true)
            }
        }
    }
    
    const onDeleteClick = (item: any) => {
        setCardInfoModal(item)
        setIsModalVisible(!isModalVisible)
    }

    const closeModalProps = () => {
        setIsModalVisible(!isModalVisible)
        loadDataSell()
    }

    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <View style={sellStyles.buttonAddSell}>
                <DivalityButtonTextured label={'Ajouter une vente'} onSubmit={() => {setIsModalAddSellVisible(!isModalAddSellVisible)}} paddingHorizontal={12} paddingVertical={7} fontSize={15} />
            </View>
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
            </View>
            <DataTableDivality isDataLoad={isDataLoad} data={sellData} header={header}/>
            <AuctionHouseModalNewSell isModalVisible={isModalAddSellVisible} closeModalProps={()=>{}}></AuctionHouseModalNewSell>
            <AuctionHouseModal isModalVisible={isModalVisible} closeModalProps={closeModalProps} cardInfo={cardInfoModal} />
        </View>
    )
}

export default Sell
