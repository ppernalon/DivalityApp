import ReactIf from '@components/ReactIf'
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, Title, Text } from 'react-native-paper'
import CardServices from 'services/CardServices'
import { colors } from "./../../GlobalStyle"
import { cardStyle } from "./CardStyle"

type cardProps = {
    name: string
    minimal: boolean
}

const Card = ({name, minimal = false}: cardProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [image, setImage] = useState<NodeRequire>({} as NodeRequire)
    const [life, setLife] = useState<number>(0)
    const [armor, setArmor] = useState<number>(0)
    const [power, setPower] = useState<number>(0)
    const [speed, setSpeed] = useState<number>(0)
    const [ability, setAbility] = useState<string>("")
    const [abilityType, setAbilityType] = useState<string>("")
    
    useEffect(() => {
        CardServices.getCardByName(name).then((data: any) => {
            setLife(data.life)
            setArmor(data.armor)
            setPower(data.power)
            setSpeed(data.speed)
            setImage(data.uri)
            setAbility(data.ability)
            setAbilityType(data.abilityType)
            setIsLoading(false)
        })
    }, [name])

    let loadingCircleColor: string = colors.egyptianYellow
    const pantheon: string = CardServices.getPantheonByName(name)
    const globalCardStyle = [cardStyle.card]
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
        <View style={globalCardStyle}>
            <ReactIf condition={isLoading}>
                <ActivityIndicator color={loadingCircleColor}/>
            </ReactIf>
            <ReactIf condition={!isLoading}>
                <React.Fragment>
                    <Image style={minimal ? cardStyle.imageMinimalDim : cardStyle.imageNotMinimalDim} source={image}/>
                    <LinearGradient 
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}} 
                        colors={[cardStyle.rarityHeadband.common.start, cardStyle.rarityHeadband.common.end]} 
                        style={cardStyle.rarityHeadband}
                    />
                    <Title style={cardStyle.name}> {name} </Title>
                    <ReactIf condition={!minimal}>
                        <React.Fragment>
                            <View>
                                <View>
                                    <View style={{backgroundColor: 'green', width: 20, height: 20, borderRadius: 100}}/>
                                    <Text> {life} </Text>
                                </View>
                                <View>
                                    <View style={{backgroundColor: '#41BAF1', width: 20, height: 20, transform: [{rotate: "45deg"}] }}/>
                                    <Text> {armor} </Text>
                                </View> 
                                <View>
                                    <View style={{backgroundColor: 'green', width: 10, height: 10, borderRadius: 100}}/>
                                    <Text> {power} </Text>
                                </View> 
                                <View>
                                    <View style={{backgroundColor: 'green', width: 10, height: 10, borderRadius: 100}}/>
                                    <Text> {speed} </Text>
                                </View>
                            </View>
                            <Text> {ability} </Text>
                        </React.Fragment>
                    </ReactIf>
                </React.Fragment>
            </ReactIf>
        </View>
    )
}

export default Card