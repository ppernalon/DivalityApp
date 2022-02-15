import Card from '@components/Card/Card'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {colors as colorsGlobal} from 'GlobalStyle'  
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
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
    const [formOutput, setFormOutput] = useState<{divinityName: string; price: string}>({divinityName: '', price: ''})
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [selectedDivinityName, setSelectedDivinityName] = useState<string>('')
    const [divinitiesNames, setDivinitiesNames] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
    ])

    useEffect(() => {
        loadDataCollection()
    }, [ws])

    const {fonts, colors} = useTheme()
    
    const fontStyle = {
        fontFamily: fonts.regular.fontFamily,
        color: colors.placeholder,
        fontSize: 12
    }

    const sellOneCard = () => {
        ws.send(
            JSON.stringify({
                type: 'sellAuctionHouse',
                username: username,
                cardName: formOutput.divinityName,
                price: formOutput.price,
            })
        )
        ws.onmessage = (e: any) => {
            console.log(e)
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
            console.log(e)
            if (JSON.parse(e.data).type === 'collection') {
                console.log(e)
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
                <View style={{height: '100%', width: '100%'}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            closeModal()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        style={{marginLeft: '85%'}}
                    />
                    <View style={{marginLeft: '20%', marginTop: '10%', width: '50%', height: '90%'}}>
                        <Text>Ajouter une vente</Text>
                        <TextInput
                            style={auctionHouseStyle.form}
                            mode={'flat'}
                            underlineColor={colorsGlobal.primaryBlue}
                            label="Divinité"
                            value={formOutput.divinityName}
                            placeholder="Nom de la divinité"
                            onChangeText={(newValue) => setFormOutput({...formOutput, divinityName: newValue})}
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
                            borderLeftWidth:0,
                            borderRightWidth:0,
                            borderBottomWidth:0,
                            borderRadius:0
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
                            textStyle={fontStyle}
                            open={openDropDown}
                            value={selectedDivinityName}
                            items={divinitiesNames}
                            setOpen={setOpenDropDown}
                            setValue={setSelectedDivinityName}
                            setItems={setDivinitiesNames}
                        />
                        </View>
                      
                    </View>
                    <View
                        style={{
                            width: '100%',
                            marginHorizontal: '5%',
                            position: 'absolute',
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
