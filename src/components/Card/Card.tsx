import ReactIf from '@components/ReactIf'
import React, {useEffect, useState} from 'react'
import {View, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {ActivityIndicator, Title, Text, useTheme} from 'react-native-paper'
import CardServices from 'services/CardServices'
import {colors} from './../../GlobalStyle'
import {cardStyle} from './CardStyle'

type cardProps = {
    name: string
    minimal: boolean
}

const Card = ({name, minimal = false}: cardProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [image, setImage] = useState<any>({} as any)
    const [life, setLife] = useState<number>(0)
    const [armor, setArmor] = useState<number>(0)
    const [power, setPower] = useState<number>(0)
    const [speed, setSpeed] = useState<number>(0)
    const [ability, setAbility] = useState<string>('')
    const fontStyle = { 
        fontFamily:  "OpenSans-Light",
        fontSize: 15,
    }

    useEffect(() => {
        if (name !== '' && minimal === false) {
            CardServices.getCardByName(name).then((data: any) => {
                setLife(data.life)
                setArmor(data.armor)
                setPower(data.power)
                setSpeed(data.speed)
                setImage(data.uri)
                setAbility(data.ability)
                setIsLoading(false)
            })
        } else if (name !== '' && minimal === true) {
            setImage(CardServices.getImageByName(name))
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [name])

    let loadingCircleColor: string = colors.egyptianYellow
    const pantheon: string = CardServices.getPantheonByName(name)
    const globalCardStyle: any[] = [cardStyle.card]
    if (minimal) globalCardStyle.push(cardStyle.minimalDim)
    if (!minimal) globalCardStyle.push(cardStyle.notMinimalDim)
    if (isLoading) globalCardStyle.push(cardStyle.cardIsLoading)
    if (pantheon === 'egyptian') {
        loadingCircleColor = colors.egyptianYellow
        globalCardStyle.push(cardStyle.egyptian)
    }
    if (pantheon === 'greek') {
        loadingCircleColor = colors.greekBlue
        globalCardStyle.push(cardStyle.greek)
    }
    if (pantheon === 'nordic') {
        loadingCircleColor = colors.nordicRed
        globalCardStyle.push(cardStyle.nordic)
    }

    return (
        <View style={name !== '' ? globalCardStyle : {}}>
            <ReactIf condition={isLoading}>
                <ActivityIndicator color={loadingCircleColor} />
            </ReactIf>
            <ReactIf condition={!isLoading && name === ''}>
                <React.Fragment>
                    <View style={[minimal ? cardStyle.minimalDim : cardStyle.notMinimalDim, cardStyle.emptyCard]}></View>
                </React.Fragment>
            </ReactIf>
            <ReactIf condition={!isLoading && name !== ''}>
                <React.Fragment>
                    <Image style={minimal ? cardStyle.imageMinimalDim : cardStyle.imageNotMinimalDim} source={image} />
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={[cardStyle.rarityHeadband.common.start, cardStyle.rarityHeadband.common.end]}
                        style={cardStyle.rarityHeadband}
                    />
                    <Title style={cardStyle.name}>{name.replace(name[0], name[0].toUpperCase())}</Title>
                    <ReactIf condition={!minimal}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View style={cardStyle.cardAttributesContainer}>
                                <View style={{flexDirection: 'row', marginVertical: 8}}>
                                    <View style={cardStyle.cardAttributes}>
                                        <View style={{marginRight: 15}}>
                                            <View style={cardStyle.dot} />
                                        </View>
                                        <Text style={fontStyle}>Vie: {life}</Text>
                                    </View>
                                    <View style={cardStyle.cardAttributes}>
                                        <View style={{marginRight: 15}}>
                                            <View style={cardStyle.square} />
                                        </View>
                                        <Text style={fontStyle}>Armure: {armor} </Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginVertical: 8}}>
                                    <View style={cardStyle.cardAttributes}>
                                        <View style={{marginRight: 15}}>
                                            <View style={cardStyle.arrowRight} />
                                        </View>
                                        <Text  style={fontStyle}>Pouvoir: {power} </Text>
                                    </View>
                                    <View style={cardStyle.cardAttributes}>
                                        <View style={{marginRight: 15}}>
                                            <View style={cardStyle.arrowUp} />
                                        </View>
                                        <Text style={fontStyle}>Vitesse: {speed} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginTop: 5, marginHorizontal: 15, marginBottom:10}}>
                                <Text style={fontStyle}>{ability} </Text>
                            </View>
                        </View>
                    </ReactIf>
                </React.Fragment>
            </ReactIf>
        </View>
    )
}

export default Card
