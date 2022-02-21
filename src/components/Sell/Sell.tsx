import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Modal, Portal, Text, TextInput, ToggleButton} from 'react-native-paper'
import {colors} from 'GlobalStyle'
import {sellStyles} from './SellStyle'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import wsService from 'ws-services/WsService'
import {selectUsername} from 'store/reducers/UsernameSlice'
import {useSelector} from 'react-redux'
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
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false)
    const [sellToDelete, setSellToDelete] = useState<{cardName: string; ownerName: string; price: string}>({cardName: '', ownerName: '', price: ''})
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
            }
        }
    }

    const onDeleteClick = (item: any) => {
        setSellToDelete(item)
        setIsModalDeleteVisible(!isModalDeleteVisible)
    }

    const onValidationDeleteSell = () => {
        setIsDataLoad(false)
        setIsModalDeleteVisible(!isModalDeleteVisible)
        const cardToDelete = sellToDelete
        console.log(
            JSON.stringify({
                type: 'cancelAuction',
                username: username,
                carnName: cardToDelete.cardName,
                price: cardToDelete.price,
                quantity: '1',
            })
        )
        ws.send(
            JSON.stringify({
                type: 'cancelAuction',
                username: username,
                cardName: cardToDelete.cardName,
                price: cardToDelete.price,
                quantity: '1',
            })
        )
        ws.onmessage = (e: any) => {
            console.log(e)
            if (JSON.parse(e.data).type === 'auctionHouse') {
                loadDataSell()
            }
        }
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

    return (
        <View style={{width: '100%', alignItems: 'center'}}>
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
            <DataTableDivality isDataLoad={isDataLoad} data={sellData} header={header} nameToFilter={divinityNameSearch} />
            <AuctionHouseModalNewSell isModalVisible={isModalAddSellVisible} closeModalProps={closeModalNewSell}></AuctionHouseModalNewSell>
            <AuctionHouseModal isModalVisible={isModalVisible} closeModalProps={closeModalProps} cardInfo={cardInfoModal} />
            {isModalDeleteVisible ? (
                <Portal>
                    <Modal
                        visible={isModalDeleteVisible}
                        onDismiss={() => {
                            closeModalDelete()
                        }}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            width: '80%',
                            margin: '10%',
                            alignItems: 'center',
                            paddingTop: '1%',
                            paddingBottom: '5%',
                        }}>
                        <IconButton
                            icon="close"
                            onPress={() => {
                                closeModalDelete()
                            }}
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                            style={{marginLeft: '85%', marginBottom: '3%'}}
                        />
                        <Text style={{width: '80%', paddingBottom: '5%'}}>
                            Voulez-vous supprimer la vente de {sellToDelete.cardName.replace(sellToDelete.cardName[0], sellToDelete.cardName[0].toUpperCase())}?
                        </Text>
                        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    isCancelButton={true}
                                    label={'Annuler'}
                                    onSubmit={() => closeModalDelete()}
                                    fontSize={14}
                                    paddingVertical={5}
                                />
                            </View>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    onSubmit={() => {
                                        onValidationDeleteSell()
                                    }}
                                    label={'Valider'}
                                    fontSize={14}
                                    paddingVertical={5}
                                    isShadow={false}
                                />
                            </View>
                        </View>
                    </Modal>
                </Portal>
            ) : (
                <></>
            )}
        </View>
    )
}

export default Sell
