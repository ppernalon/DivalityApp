import React, {useEffect, useState} from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native'
import {IconButton, Modal, Portal, Text} from 'react-native-paper'
import ContentTextured from 'components/ContentTextured/ContentTextured'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from './MyCollectionStyles'
import {useSelector} from 'react-redux'
import PantheonDisplayer from 'components/PantheonDisplayer/PantheonDisplayer'

type MyCollectionProps = {
    navigation: any
}

const MyCollection = ({navigation}: MyCollectionProps) => {
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')
    const [cardDialogPantheon, setCardDialogPantheon] = useState<string>('')
    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue,
    }

    const onClickCardPantheon = (name: string) => {
        setIsDialogVisible(true)
        setNameCardDialog(name)
    }

    const hideDialog = () => {
        setIsDialogVisible(false)
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
                    COLLECTION
                </Text>
            </ContentTextured>
            <View style={{height: '78%'}}>
                <PantheonDisplayer
                    isPrayDisponible={true}
                    onClickCard={(name: string, cardDialogPantheonProps: string) => {
                        setCardDialogPantheon(cardDialogPantheonProps)
                        onClickCardPantheon(name)
                    }}
                />
                <Portal>
                    <Modal
                        visible={isDialogVisible}
                        onDismiss={hideDialog}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Card name={nameCardDialog} minimal={false} />
                            <IconButton
                                icon="close"
                                size={27}
                                color={fontColor[cardDialogPantheon]}
                                style={myCollectionStyles.iconButtonCloseDialog}
                                onPress={hideDialog}
                                hasTVPreferredFocus={undefined}
                                tvParallaxProperties={undefined}
                            />
                        </View>
                    </Modal>
                </Portal>
            </View>

            <ContentTextured position={'footer'} children={<></>} />
        </View>
    )
}
export default MyCollection
