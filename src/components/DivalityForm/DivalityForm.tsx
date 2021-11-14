import React, { useEffect, useState } from "react"
import { View } from "react-native"
import ReactIf from "../ReactIf"
import { Button, TextInput, Title } from 'react-native-paper'
import { divalityFormStyle as style} from './DivalityFormStyle'
import { checkBeforeSubmitFunction, formField } from "./DivalityFormTypes"
import { colors } from "../../GlobalStyle"

type DivalityFormProps = {
    formName: string
    fields: formField[]
    onSubmit: Function
    submitButtonText?: string
    formNameIsDisplay?: boolean
    cancelButtonText?: string
    onCancel?: Function
    showCancelButton?: boolean
}

const DivalityForm = ({
        formName,
        fields,
        onSubmit,
        formNameIsDisplay = false,
        onCancel = () => console.error("no cancel function given"),
        showCancelButton = false,
        submitButtonText = "Valider",
        cancelButtonText = "Annuler"
    }: DivalityFormProps) => {
    
    let [formState, setFormState] = useState<any>(DivalityForm.initFormState(fields))

    return (
        <View>
            <ReactIf condition={formNameIsDisplay}>
                <Title>
                    {formName}
                </Title>
            </ReactIf>

            <View>
                { DivalityForm.buildForms(fields, formState, setFormState) }
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

DivalityForm.initFormState = (fields: formField[]) => {
    let newFormState: any = {}
    
    fields.forEach(field => {
        const newInput = {
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            value: "",
            error: false,
            checkBeforeSubmit: field.checkBeforeSubmit,
            shouldMatchWith: field.shouldMatchWith
        }
        newFormState[field.id] = newInput
    })
    return newFormState
}

DivalityForm.buildForms = (fields: formField[], formState: any, setFormState: Function) => {
    const formStateKeys = Object.keys(formState)
    return (
        formStateKeys.map((inputKey: string) => {
            const field = formState[inputKey]
            const checkBeforeSubmit = fields.filter(value => value.id === inputKey)[0].checkBeforeSubmit
            let inputToRender
            switch (field.type) {
                case 'password':
                    inputToRender = <TextInput
                        style={style.formInput}
                        key={inputKey}
                        mode={'flat'}
                        underlineColor={colors.blue}
                        secureTextEntry={true}
                        error={field.error}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        onBlur={() => DivalityForm.checkField(inputKey, checkBeforeSubmit, formState, setFormState)}
                        onChangeText={newValue => DivalityForm.onValueChange(inputKey, newValue, formState, setFormState)}/>
                    break;

                case 'text':
                    inputToRender = <TextInput
                        style={style.formInput}
                        key={inputKey}
                        mode={'flat'}
                        underlineColor={colors.blue}
                        error={field.error}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        onBlur={() => DivalityForm.checkField(inputKey, checkBeforeSubmit, formState, setFormState)}
                        onChangeText={newValue => DivalityForm.onValueChange(inputKey, newValue, formState, setFormState)}/>
                    break;
            }

            return inputToRender
        })
    )
}

DivalityForm.checkField = (
        key: string, 
        checkBeforeSubmit: checkBeforeSubmitFunction | undefined,
        formState: any, 
        setFormState: Function
    ) => {    

    const newSateForm = {...formState}

    let errorValue
    const shouldMatchWithKey = newSateForm[key].shouldMatchWith as string

    if ( shouldMatchWithKey && checkBeforeSubmit ) {
        const targetValue = formState[shouldMatchWithKey].value
        errorValue = !checkBeforeSubmit(newSateForm[key].value).isValid
        if (targetValue.length > 0) {
            errorValue = errorValue && targetValue !== newSateForm[key].value
            newSateForm[shouldMatchWithKey].error = errorValue
        }
    } else if ( checkBeforeSubmit && !shouldMatchWithKey) {
        errorValue = !checkBeforeSubmit(newSateForm[key].value).isValid
    } else if ( shouldMatchWithKey && !checkBeforeSubmit) {
        const targetValue = formState[shouldMatchWithKey].value
        errorValue = targetValue.length > 0 && targetValue !== newSateForm[key].value
        newSateForm[shouldMatchWithKey].error = errorValue
    } else {
        errorValue = false
    }

    newSateForm[key].error = errorValue
    
    setFormState(newSateForm)
}

DivalityForm.onValueChange = (key: string, newValue: string, formState: any, setFormState: Function) => {
    const newSateForm = JSON.parse(JSON.stringify(formState))
    newSateForm[key].value = newValue
    setFormState(newSateForm)
}    

export default DivalityForm