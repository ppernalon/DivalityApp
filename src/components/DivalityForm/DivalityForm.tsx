import React, { useState } from "react"
import { View } from "react-native"
import ReactIf from "../ReactIf"
import { Button, TextInput, Title } from 'react-native-paper'
import { divalityFormStyle as style} from './DivalityFormStyle'

type DivalityFormProps = {
    formName: string
    items: {id: string, label: string, type: string, placeholder?: string}[]
    onSubmit: Function
    submitButtonText?: string
    formNameIsDisplay?: boolean
    cancelButtonText?: string
    onCancel?: Function
    showCancelButton?: boolean
}

const DivalityForm = ({
        formName,
        items,
        onSubmit,
        formNameIsDisplay = false,
        onCancel = () => console.error("no cancel function given"),
        showCancelButton = false,
        submitButtonText = "Valider",
        cancelButtonText = "Annuler"
    }: DivalityFormProps) => {

    const InitFormState = (items: {id: string, label: string, type: string, placeholder?: string}[]) => {
        let newFormState: any = {}
    
        items.forEach(input => {    
            const newInput = {
                label: input.label,
                type: input.type,
                placeholder: input.placeholder,
                value: ""
            }
            newFormState[input.id] = newInput
        })
            
        return newFormState
    }

    let [formState, setFormState] = useState<any>(InitFormState(items))

    const OnValueChange = (key: string, newValue: string) => {
        const newSateForm = JSON.parse(JSON.stringify(formState))
        newSateForm[key].value = newValue
        setFormState(newSateForm)
    }

    const buildForms = () => {
        return (
            Object.keys(formState).map((inputKey: string) => {
                let inputToRender
                switch (formState[inputKey].type) {
                    case 'password':
                        inputToRender = <TextInput
                            style={style.formInput}  
                            key={inputKey}
                            secureTextEntry={true}
                            label={formState[inputKey].label}
                            value={formState[inputKey].value}
                            placeholder={formState[inputKey].placeholder}
                            onChangeText={newValue => OnValueChange(inputKey, newValue)}/>
                        break;
    
                    case 'text':
                        inputToRender = <TextInput
                            style={style.formInput} 
                            key={inputKey}
                            label={formState[inputKey].label}
                            value={formState[inputKey].value}
                            placeholder={formState[inputKey].placeholder}
                            onChangeText={newValue => OnValueChange(inputKey, newValue)}/>
                        break;
                }

                return inputToRender
            })
        )
    }

    return (
        <View>
            <ReactIf condition={formNameIsDisplay}>
                <Title>
                    {formName}
                </Title>
            </ReactIf>

            <View>
                { buildForms() }
            </View>

            <View style={style.buttonRow}>
                <ReactIf condition={showCancelButton}> 
                    <Button
                        mode="outlined" 
                        onPress={() => onCancel()}> 
                        {cancelButtonText}
                    </Button>
                </ReactIf>

                <Button
                    mode="contained" 
                    onPress={() => onSubmit(formState)}> 
                    {submitButtonText}
                </Button>
            </View>      
        </View>
    )
}

export default DivalityForm