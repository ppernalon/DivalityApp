import React, {useState} from 'react'
import {View} from 'react-native'
import ReactIf from '../ReactIf'
import {Button, TextInput, Title, Text, useTheme, withTheme} from 'react-native-paper'
import {divalityFormStyle as style} from './DivalityFormStyle'
import {checkBeforeSubmitFunction, divalityFormProps, formField, formStateType} from './DivalityFormTypes'
import {colors} from '../../GlobalStyle'

const DivalityForm = ({
    errorBack = '',
    formName,
    fields,
    onSubmit,
    formNameIsDisplay = false,
    onCancel = () => console.error('no cancel function given'),
    showCancelButton = false,
    submitButtonText = 'Valider',
    cancelButtonText = 'Annuler',
}: divalityFormProps) => {
    let [formState, setFormState] = useState<formStateType>(DivalityForm.initFormState(fields))
    let [formError, setFormError] = useState<string>('')
    let [isErrorBackToDiplay, setIsErrorBackToDisplay] = useState<boolean>(false)

    const {fonts} = useTheme()
    const fontStyle = {
        color: 'white',
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
    }
    return (
        <View>
            <ReactIf condition={formNameIsDisplay}>
                <Title>{formName}</Title>
            </ReactIf>

            <View>{DivalityForm.buildForms(formState, setFormState, setFormError, setIsErrorBackToDisplay)}</View>

            <View style={formError.length > 0 || (isErrorBackToDiplay && errorBack !== '') ? style.formError : null}>
                <Text style={style.formError.text}>
                    {isErrorBackToDiplay ? errorBack : ''}
                    {formError}
                </Text>
            </View>

            <View style={style.buttonRow}>
                <ReactIf condition={showCancelButton}>
                    <Button style={{width: '47%'}} mode="outlined" onPress={() => onCancel()}>
                        {cancelButtonText}
                    </Button>
                </ReactIf>

                <Button
                    style={[{width: showCancelButton ? '47%' : '100%'}]}
                    mode="contained"
                    onPress={() => {
                        DivalityForm.onFormValidate(formState, onSubmit, formError, setIsErrorBackToDisplay)
                    }}>
                    <Text style={fontStyle}>{submitButtonText}</Text>
                </Button>
            </View>
        </View>
    )
}

DivalityForm.onFormValidate = (formState: formStateType, onSubmit: Function, formError: string, setIsErrorBackToDisplay: Function) => {
    if (formError.length === 0) {
        onSubmit(formState)
        setIsErrorBackToDisplay(true)
    }
}

DivalityForm.initFormState = (fields: formField[]) => {
    let newFormState: formStateType = {}

    fields.forEach((field) => {
        const newInput = {
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            value: '',
            error: false,
            checkBeforeSubmit: field.checkBeforeSubmit,
            shouldMatchWith: field.shouldMatchWith,
        }
        newFormState[field.id] = newInput
    })
    return newFormState
}

DivalityForm.buildForms = (formState: formStateType, setFormState: Function, setFormError: Function, setIsErrorBackToDisplay: Function) => {
    const formStateKeys = Object.keys(formState)
    return formStateKeys.map((inputKey: string) => {
        const field = formState[inputKey]
        let inputToRender: JSX.Element
        switch (field.type) {
            case 'password':
                inputToRender = (
                    <TextInput
                        accessibilityLabel={inputKey}
                        style={style.formInput}
                        key={inputKey}
                        mode={'flat'}
                        underlineColor={colors.primaryBlue}
                        secureTextEntry={true}
                        error={field.error}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        onBlur={() => DivalityForm.checkField(inputKey, formState, setFormState, setFormError)}
                        onChangeText={(newValue) => DivalityForm.onValueChange(inputKey, newValue, formState, setFormState, setIsErrorBackToDisplay)}
                    />
                )
                break

            case 'text':
                inputToRender = (
                    <TextInput
                        accessibilityLabel={inputKey}
                        style={style.formInput}
                        key={inputKey}
                        mode={'flat'}
                        underlineColor={colors.primaryBlue}
                        error={field.error}
                        label={field.label}
                        value={field.value}
                        placeholder={field.placeholder}
                        onBlur={() => DivalityForm.checkField(inputKey, formState, setFormState, setFormError)}
                        onChangeText={(newValue) => DivalityForm.onValueChange(inputKey, newValue, formState, setFormState, setIsErrorBackToDisplay)}
                    />
                )
                break
        }

        return inputToRender
    })
}

DivalityForm.checkField = (key: string, formState: formStateType, setFormState: Function, setFormError: Function) => {
    const newSateForm = {...formState}

    let errorMessage: string = ''
    let errorValue: boolean
    const shouldMatchWithKey = newSateForm[key].shouldMatchWith as string
    const checkBeforeSubmit = newSateForm[key].checkBeforeSubmit as checkBeforeSubmitFunction

    if (shouldMatchWithKey && checkBeforeSubmit) {
        const targetValue = newSateForm[shouldMatchWithKey].value
        const checkFormAnswer = checkBeforeSubmit(newSateForm[key].value)
        errorMessage = checkFormAnswer.message
        if (targetValue === newSateForm[key].value && checkFormAnswer.isValid) {
            errorValue = false
        } else if (targetValue !== newSateForm[key].value && checkFormAnswer.isValid) {
            errorValue = targetValue.length > 0
        } else {
            errorValue = true
        }
        newSateForm[shouldMatchWithKey].error = errorValue
        if (errorValue) {
            errorMessage = `${newSateForm[shouldMatchWithKey].label} et ${newSateForm[key].label} doivent être identiques`
        }
    } else if (checkBeforeSubmit && !shouldMatchWithKey) {
        const checkFormAnswer = checkBeforeSubmit(newSateForm[key].value)
        errorValue = !checkFormAnswer.isValid
        errorMessage = checkFormAnswer.message
    } else if (shouldMatchWithKey && !checkBeforeSubmit) {
        const targetValue = formState[shouldMatchWithKey].value
        errorValue = targetValue.length > 0 && targetValue !== newSateForm[key].value
        newSateForm[shouldMatchWithKey].error = errorValue
        if (errorValue) {
            errorMessage = `${newSateForm[key].label} et ${newSateForm[shouldMatchWithKey].label} doivent être identiques`
        }
    } else {
        errorValue = false
    }

    newSateForm[key].error = errorValue

    setFormError(errorMessage)
    setFormState(newSateForm)
}

DivalityForm.onValueChange = (key: string, newValue: string, formState: formStateType, setFormState: Function, setIsErrorBackToDisplay: Function) => {
    const newSateForm = {...formState}
    newSateForm[key].value = newValue
    setFormState(newSateForm)
    setIsErrorBackToDisplay(false)
}

export default withTheme(DivalityForm)
