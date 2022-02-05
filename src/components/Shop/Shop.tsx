import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Modal, Text, TextInput} from 'react-native-paper'
import {colors} from 'GlobalStyle'
import wsService from '../../ws-services/WsService'
import {selectUsername} from 'store/reducers/UsernameSlice'
import {useSelector} from 'react-redux'
import AuctionHouseModal from '@components/AuctionHouseModal/AuctionHouseModal'

type ShopProps = {}

const Shop = () => {
    const [divinityNameSearch, setDivinityNameSearch] = useState<string>('')
    const [divinityNameSearchIsFocused, setDivinityNameSearchIsFocused] = useState<boolean>(false)
    const [shopData, setShopData] = useState<[]>([])
    const [shopDataFilter, setShopDataFilter] = useState<[]>([])
    const [shopDataFilterByPage, setShopDataFilterByPage] = useState<[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [cardInfoModal, setCardInfoModal] = useState<any>({})
    const [page, setPage] = useState<number>(0)
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const numberOfItemsPerPageList = [1, 2, 30]
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(numberOfItemsPerPageList[0])
    const fromPagination = page * numberOfItemsPerPage
    const toPagination = Math.min((page + 1) * numberOfItemsPerPage, shopDataFilter.length)
    useEffect(() => {
        loadDataShop()
        setPage(0)
    }, [ws, numberOfItemsPerPage])

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
                setShopDataFilter(JSON.parse(e.data).shopData)
                setShopDataFilterByPage(JSON.parse(e.data).shopData.slice(0, numberOfItemsPerPage))
                setIsDataLoad(true)
            }
        }
    }

    const filterDataShop = (divinityNameSearch: string) => {
        setDivinityNameSearch(divinityNameSearch)
        const shopDataFilterTemp: any = shopData.filter((item: any) => item.cardName.includes(divinityNameSearch))
        setShopDataFilter(shopDataFilterTemp)
    }
    const filterByPage = (page: number) => {
        setPage(page)
        const shopDataFilterTemp: any = shopDataFilter.slice(page * numberOfItemsPerPage, (page + 1) * numberOfItemsPerPage )
        setShopDataFilterByPage(shopDataFilterTemp)
    }

    const renderItem = (item: any, index: number) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell style={{flex: 2, justifyContent: 'center'}}>{item.cardName}</DataTable.Cell>
                <DataTable.Cell style={{flex: 2, justifyContent: 'center'}}>{item.ownerName}</DataTable.Cell>
                <DataTable.Cell style={{flex: 2, justifyContent: 'center'}}>{item.price}</DataTable.Cell>
                <DataTable.Cell style={{flex: 1, justifyContent: 'center'}}>
                    <IconButton
                        onPress={() => {
                            setCardInfoModal(item)
                            changeModalStatus()
                        }}
                        icon="cart-arrow-down"
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        color={colors.blueSky}
                    />
                </DataTable.Cell>
            </DataTable.Row>
        )
    }

    const changeModalStatus = () => {
        setIsModalVisible(!isModalVisible)
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
            <DataTable style={{width: '80%'}}>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 2, justifyContent: 'center'}}>Divinité</DataTable.Title>
                    <DataTable.Title style={{flex: 2, justifyContent: 'center'}}>Vendeur</DataTable.Title>
                    <DataTable.Title style={{flex: 2, justifyContent: 'center'}}>Prix</DataTable.Title>
                    <DataTable.Title style={{flex: 1, justifyContent: 'center'}}></DataTable.Title>
                </DataTable.Header>
                {!isDataLoad ? <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} style={{marginVertical: 30}} /> : <></>}
                {Object.keys(shopDataFilterByPage).length !== 0 ? shopDataFilterByPage.map((item, index) => renderItem(item, index)) : <></>}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(shopDataFilter.length / numberOfItemsPerPage)}
                    onPageChange={(page) => filterByPage(page)}
                    label={`${page + 1 } sur ${Math.ceil(shopDataFilter.length / numberOfItemsPerPage)}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={setNumberOfItemsPerPage}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Lignes par page'}
                />
            </DataTable>
            <AuctionHouseModal isModalVisible={isModalVisible} changeModalStatus={changeModalStatus} cardInfo={cardInfoModal} />
        </View>
    )
}

export default Shop
