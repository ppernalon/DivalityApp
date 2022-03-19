import React, {useEffect, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Modal, Portal, Text, TextInput, ToggleButton} from 'react-native-paper'
import {colors} from 'GlobalStyle'
import {sellStyles} from './SellStyle'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import wsService from 'ws-services/WsService'
import {selectUsername} from 'store/reducers/UsernameSlice'
import {useSelector} from 'react-redux'
import DataTableDivality from '@components/DataTable/DataTableDivality'
import AuctionHouseModal from '@components/ModalDivality/AuctionHouseModal'
import AuctionHouseModalNewSell from '@components/ModalDivality/AuctionHouseModalNewSell'
import AuctionHouseCancelSellModal from '@components/ModalDivality/AuctionHouseCancelSellModal'

type SellProps = {}

const Sell = () => {
    const [divinityNameSearch, setDivinityNameSearch] = useState('')
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const [sellData, setSellData] = useState<[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [isModalAddSellVisible, setIsModalAddSellVisible] = useState<boolean>(false)
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false)
    const [sellToDelete, setSellToDelete] = useState<{cardName: string; ownerName: string; price: string}>({cardName: '', ownerName: '', price: ''})
    const [cardInfoModal, setCardInfoModal] = useState<any>({})
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const header = [
        {name: 'Divinités', type: 'string', width: 1, nameOfTheData: 'cardName'},
        {name: 'Prix', type: 'string', width: 1, nameOfTheData: 'price'},
        {name: 'Quantité', type: 'string', width: 1, nameOfTheData: 'quantity'},
        {
            name: '',
            type: 'icon',
            width: 1,
            nameOfTheData: 'delete',
            action: (item: any) => {
                onDeleteClick(item)
            },
        },
    ]

    useEffect(() => {
        loadDataSell()
    }, [ws])

    const loadDataSell = () => {
        setIsDataLoad(false)
        ws.send(
            JSON.stringify({
                type: 'auctionsByUsername',
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'auctions') {
                setSellData(JSON.parse(e.data).auctionsData)
                setIsDataLoad(true)
                setRefreshing(refreshing)
            }
        }
    }

    const onDeleteClick = (item: any) => {
        setSellToDelete(item)
        setIsModalDeleteVisible(!isModalDeleteVisible)
    }

    const closeModalProps = () => {
        setIsModalVisible(!isModalVisible)
        loadDataSell()
    }

    const closeModalNewSell = () => {
        setIsModalAddSellVisible(!isModalAddSellVisible)
        loadDataSell()
    }
    const closeModalDelete = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible)
    }

    const onValidationDeleteClose = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible)
        setIsDataLoad(false)
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'auctionHouse') {
                loadDataSell()
            }
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        loadDataSell()
    }

    return (
        <ScrollView
            contentContainerStyle={{width: '100%', alignItems: 'center', paddingBottom: 20}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.blueSky]} />}>
            <View style={sellStyles.buttonAddSell}>
                <DivalityButtonTextured
                    label={'Ajouter une vente'}
                    onSubmit={() => {
                        setIsModalAddSellVisible(!isModalAddSellVisible)
                    }}
                    paddingHorizontal={12}
                    paddingVertical={7}
                    fontSize={15}
                />
            </View>
            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    style={{width: '50%', marginVertical: 20, backgroundColor: '#f7f7f7', fontSize: 13, marginRight: 15, height: 60}}
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
            <DataTableDivality isDataLoad={isDataLoad} data={sellData} header={header} nameToFilter={[divinityNameSearch, 'cardName']} />
            <AuctionHouseModalNewSell isModalVisible={isModalAddSellVisible} closeModalProps={closeModalNewSell}></AuctionHouseModalNewSell>
            <AuctionHouseModal isModalVisible={isModalVisible} closeModalProps={closeModalProps} cardInfo={cardInfoModal} />
            {isModalDeleteVisible ? (
                <AuctionHouseCancelSellModal
                    isModalVisible={isModalDeleteVisible}
                    closeModalProps={closeModalDelete}
                    sellInfo={sellToDelete}
                    onValidation={onValidationDeleteClose}></AuctionHouseCancelSellModal>
            ) : (
                <></>
            )}
        </ScrollView>
    )
}

export default Sell
