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

type AuctionHouseModalNewSellProps = {
    isModalVisible: boolean
    closeModalProps: Function
}

const AuctionHouseModalNewSell = ({isModalVisible, closeModalProps}: AuctionHouseModalNewSellProps) => {
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const dispatch = useDispatch()
    const [errorToDisplay, setErrorToDisplay] = useState<string>('')
    const [formOutput, setFormOutput] = useState<{cardName: string; price: string; quantity: string}>({cardName: '', price: '', quantity: ''})
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [selectedDivinityName, setSelectedDivinityName] = useState<string>('')
    const [divinitiesNames, setDivinitiesNames] = useState<{label: string; value: string}[]>([])
    const [initialData, setInitialData] = useState<[]>([])
    const [maxOccurence, setMaxOccurence] = useState<number>(0)
    useEffect(() => {
        loadDataCollection()
    }, [isModalVisible])

    const {fonts, colors} = useTheme()

    const fontStyle = {
        fontFamily: fonts.regular.fontFamily,
        color: colors.placeholder,
        fontSize: 12,
    }

    const sellOneCard = () => {
        ws.send(
            JSON.stringify({
                type: 'sellAuctionHouse',
                username: username,
                cardName: formOutput.cardName.toLowerCase(),
                price: formOutput.price,
                quantity: formOutput.quantity
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'auctionHouse') {
                console.log(e)
                closeModal()
            }
        }
    }

    const loadDataCollection = () => {
        ws.send(
            JSON.stringify({
                type: 'collection',
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'collection') {
                const data = JSON.parse(e.data).data
                const listDivinityName = Array.from(new Set([...data.greek, ...data.egyptian, ...data.nordic])).sort()
                setInitialData([...data.greek, ...data.egyptian, ...data.nordic])
                const listDivinityNameForDropdown: {label: any; value: any}[] = []
                listDivinityName.map((divinityName) => {
                    const divinityNameUpperCase = divinityName.replace(divinityName[0], divinityName[0].toUpperCase())
                    listDivinityNameForDropdown.push({
                        label: divinityNameUpperCase,
                        value: divinityNameUpperCase,
                    })
                })
                console.log(listDivinityNameForDropdown)
                setDivinitiesNames(listDivinityNameForDropdown)
            }
        }
    }

    const closeModal = () => {
        setErrorToDisplay('')
        closeModalProps()
    }
    return (
        <Portal>
            <Modal
                visible={isModalVisible}
                onDismiss={() => {
                    closeModal()
                }}
                contentContainerStyle={{backgroundColor: 'white', height: '80%', width: '80%', margin: '10%'}}>
                <View style={{height: '100%', width: '100%', flex: 1}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            closeModal()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        style={{marginLeft: '85%'}}
                    />
                    <ScrollView style={{marginLeft: '20%', marginTop: '10%', width: '60%', flex: 1}}>
                        <Text>Ajouter une vente</Text>
                        <View style={auctionHouseStyle.pickerContainer}>
                            <DropDownPicker
                                style={{
                                    backgroundColor: '#f7f7f7',
                                    borderBottomColor: colorsGlobal.primaryBlue,
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderRadius: 0,
                                }}
                                dropDownContainerStyle={{
                                    borderColor: colorsGlobal.primaryBlue,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderBottomWidth: 0,
                                    borderRadius: 0,
                                }}
                                listItemContainerStyle={{
                                    backgroundColor: '#f7f7f7',
                                    borderBottomColor: colorsGlobal.primaryBlue,
                                    borderBottomWidth: 1,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderRadius: 0,
                                }}
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                textStyle={fontStyle}
                                open={openDropDown}
                                value={selectedDivinityName}
                                items={divinitiesNames}
                                setOpen={setOpenDropDown}
                                setValue={setSelectedDivinityName}
                                setItems={setDivinitiesNames}
                                onSelectItem={(cardName) => {
                                    setMaxOccurence(initialData.filter((x: string) => x === cardName.label.toLowerCase()).length)
                                    setFormOutput({...formOutput, cardName: cardName.label})
                                }}
                            />
                        </View>
                        <TextInput
                            keyboardType={'numeric'}
                            style={auctionHouseStyle.form}
                            mode={'flat'}
                            underlineColor={colorsGlobal.primaryBlue}
                            label="Quantité"
                            value={formOutput.quantity}
                            right={<TextInput.Affix text={'Max ' + maxOccurence} />}
                            onChangeText={(newValue) => {
                                if (parseInt(newValue) > maxOccurence) {
                                    setFormOutput({...formOutput, quantity: maxOccurence.toString()})
                                }
                                else{
                                    setFormOutput({...formOutput, quantity: newValue})
                                }
                            }}
                        />
                        <TextInput
                            keyboardType={'numeric'}
                            style={auctionHouseStyle.form}
                            mode={'flat'}
                            underlineColor={colorsGlobal.primaryBlue}
                            label="Prix"
                            value={formOutput.price}
                            placeholder="Nom de la divinité"
                            onChangeText={(newValue) => setFormOutput({...formOutput, price: newValue})}
                        />
                    </ScrollView>
                    <View
                        style={{
                            width: '100%',
                            marginHorizontal: '5%',
                            bottom: '5%',
                        }}>
                        <Text style={{color: colorsGlobal.errorRed, fontSize: 10, marginBottom: 10, left: '10%'}}>{errorToDisplay}</Text>

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
                                        sellOneCard()
                                    }}
                                    label={'Acheter'}
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

export default AuctionHouseModalNewSell
