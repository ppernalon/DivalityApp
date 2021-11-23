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
    
    let [formState, setFormState] = useState<any>(DivalityForm.initFormState(items))  

    return (
        <View>
            <ReactIf condition={formNameIsDisplay}>
                <Title>
                    {formName}
                </Title>
            </ReactIf>

            <View>
                { DivalityForm.buildForms(formState, setFormState) }
            </View>

            <View style={style.buttonRow}>
                <ReactIf condition={showCancelButton}> 
                    <Button
                        style={{width: "47%"}}
                        mode="outlined" 
                        onPress={() => onCancel()}> 
                        {cancelButtonText}
                    </Button>
                </ReactIf>

                <Button
                    style={{width: showCancelButton ? "47%" : "100%"}}
                    mode="contained" 
                    onPress={() => onSubmit(formState)}> 
                    {submitButtonText}
                </Button>
            </View>      
        </View>
    )
}

DivalityForm.initFormState = (items: {id: string, label: string, type: string, placeholder?: string}[]) => {
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

DivalityForm.buildForms = (formState: any, setFormState: Function) => {
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
                        onChangeText={newValue => DivalityForm.OnValueChange(inputKey, newValue, formState, setFormState)}/>
                    break;

                case 'text':
                    inputToRender = <TextInput
                        style={style.formInput} 
                        key={inputKey}
                        label={formState[inputKey].label}
                        value={formState[inputKey].value}
                        placeholder={formState[inputKey].placeholder}
                        onChangeText={newValue => DivalityForm.OnValueChange(inputKey, newValue, formState, setFormState)}/>
                    break;
            }

            return inputToRender
        })
    )
}

DivalityForm.OnValueChange = (key: string, newValue: string, formState: any, setFormState: Function) => {
    const newSateForm = JSON.parse(JSON.stringify(formState))
    newSateForm[key].value = newValue
    setFormState(newSateForm)
}    

export default DivalityForm