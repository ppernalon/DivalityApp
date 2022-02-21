import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Modal, Text, TextInput} from 'react-native-paper'
import {colors} from 'GlobalStyle'
import wsService from '../../ws-services/WsService'
import {selectUsername} from 'store/reducers/UsernameSlice'
import {useSelector} from 'react-redux'
import AuctionHouseModal from '@components/AuctionHouseModal/AuctionHouseModal'
import DataTableDivality from 'components/DataTable/DataTableDivality'


const Shop = () => {
    const [divinityNameSearch, setDivinityNameSearch] = useState<string>('')
    const [shopData, setShopData] = useState<[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [cardInfoModal, setCardInfoModal] = useState<any>({})
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)

    const header = [
        {name: 'Divinité', type: 'string', width: '', nameOfTheData: 'cardName'},
        {name: 'Vendeur', type: 'string', width: '', nameOfTheData: 'ownerName'},
        {name: 'Prix', type: 'string', width: '', nameOfTheData: 'price'},
        {
            name: '',
            type: 'icon',
            width: '',
            nameOfTheData: 'cart-arrow-down',
            action: (item: any) => {
                onShopClick(item)
            },
        },
    ]
    useEffect(() => {
        loadDataShop()
    }, [ws])

    const loadDataShop = () => {
        setIsDataLoad(false)
        ws.send(
            JSON.stringify({
                type: 'auctionHouse',
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'auctionHouse') {
                setShopData(JSON.parse(e.data).shopData)
                setIsDataLoad(true)
            }
        }
    }

    const filterDataShop = (divinityNameSearch: string) => {
        setDivinityNameSearch(divinityNameSearch)
    }

    const onShopClick = (item: any) => {
        setCardInfoModal(item)
        setIsModalVisible(!isModalVisible)
    }

    const closeModalProps = () => {
        setIsModalVisible(!isModalVisible)
        loadDataShop()
    }

    return (
        <View style={{width: '100%', alignItems: 'center', height: '100%'}}>
            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    style={{width: '60%', marginVertical: 20, backgroundColor: '#f7f7f7', fontSize: 15, marginRight: 15}}
                    label="Nom de la divinité"
                    mode={'flat'}
                    value={divinityNameSearch}
                    onChangeText={(divinityNameSearch) => filterDataShop(divinityNameSearch)}
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
                    onPress={() => {
                        loadDataShop()
                    }}
                    size={40}
                    hasTVPreferredFocus={undefined}
                    tvParallaxProperties={undefined}
                    color={colors.blueSky}
                />
            </View>
            <DataTableDivality isDataLoad={isDataLoad} data={shopData} header={header} nameToFilter={divinityNameSearch}></DataTableDivality>
            <AuctionHouseModal isModalVisible={isModalVisible} closeModalProps={closeModalProps} cardInfo={cardInfoModal} />
        </View>
    )
}

export default Shop
