import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react-native'
import DivalityForm from '../../src/components/DivalityForm/DivalityForm'
import { formField, formStateType } from '../../src/components/DivalityForm/DivalityFormTypes'

const RedError = "#B00020"
const BlueNoError = "#6200ee"

const minimalInputs = {
    formName: "formName",
    fields: [
        {
            id: 'field_1',
            label: 'field_1',
            type: 'text',
        } as formField
    ],
    onSubmit: () => console.error("no submit function")
}

const shouldMatchWithKeyInputs = {
    formName: "formName",
    fields: [
        {
            id: 'field_1',
            label: 'field_1',
            type: 'text',
            shouldMatchWith: 'field_2'
        } as formField,
        {
            id: 'field_2',
            label: 'field_2',
            type: 'text',
            shouldMatchWith: 'field_1'
        } as formField
    ],
    onSubmit: () => console.error("no submit function")
}

const setFormStateBuilder = (formState: formStateType) => {
    return (newFormState: formStateType) => (formState = newFormState)
}

const setFormErrorBuilder = (formError: string) => {
    return (newError: string) => (formError = newError)
}

describe("DivivalityForm should", () => {
    test("render correctly with minimal props", () => {
        renderer.create(
            <DivalityForm 
                formName={minimalInputs.formName} 
                fields={minimalInputs.fields} 
                onSubmit={minimalInputs.onSubmit} />
        )
        cleanup()
    })

    test("init a formState using minimal fields", () => {
        const formState: formStateType = DivalityForm.initFormState(minimalInputs.fields)
        const expectedFormState: formStateType = {}
        expectedFormState[minimalInputs.fields[0].id] = {
            label: minimalInputs.fields[0].label,
            type: minimalInputs.fields[0].type,
            checkBeforeSubmit: minimalInputs.fields[0].checkBeforeSubmit,
            placeholder: minimalInputs.fields[0].placeholder,
            shouldMatchWith: minimalInputs.fields[0].shouldMatchWith,
            error: false,
            value: ""
        }
        expect(formState).toStrictEqual(expectedFormState)
    })

    test("build the same amount of form field as fields in input", () => {
        let formError: string = ""
        const setFormError: Function = setFormErrorBuilder(formError)
        let formState: formStateType = DivalityForm.initFormState(minimalInputs.fields)
        const setFormSate: Function = setFormStateBuilder(formState)
        const formFieldBuilt: JSX.Element[] = DivalityForm.buildForms(formState, setFormSate, setFormError)
        expect(formFieldBuilt.length).toStrictEqual(minimalInputs.fields.length)
    })

    test("checkField with only shouldMatchWith props", () => {
        const { getByLabelText } = render(
            <DivalityForm 
                formName={shouldMatchWithKeyInputs.formName}
                formNameIsDisplay={true}
                fields={shouldMatchWithKeyInputs.fields} 
                onSubmit={shouldMatchWithKeyInputs.onSubmit} />
        )

        const field_1 = getByLabelText('field_1')
        const field_2 = getByLabelText('field_2')

        fireEvent(field_1, 'onChangeText', 'a')
        fireEvent(field_1, 'onBlur')
        
        fireEvent(field_2, 'onChangeText', 'b')
        fireEvent(field_2, 'onBlur')
        
        expect(field_1.props.value).toStrictEqual("a")
        expect(field_2.props.value).toStrictEqual("b")
        expect(field_1.props.selectionColor).toStrictEqual(RedError) // the prop "error" is not accessible, so testing
        expect(field_2.props.selectionColor).toStrictEqual(RedError) // this make us able to be sure about error

        fireEvent(field_2, 'onChangeText', 'a')
        fireEvent(field_2, 'onBlur')
        expect(field_1.props.selectionColor).toStrictEqual(BlueNoError) // the prop "error" is not accessible, so testing
        expect(field_2.props.selectionColor).toStrictEqual(BlueNoError) // this make us able to be sure about error
    })

})