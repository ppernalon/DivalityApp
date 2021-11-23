import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import DivalityForm from '../../src/components/DivalityForm/DivalityForm'
import { formField } from '../../src/components/DivalityForm/DivalityFormTypes'

const minimalEntries = {
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

describe("DivivalityForm should", () => {
    test("render correctly with minimal props", () => {
        renderer.create(
            <DivalityForm 
                formName={minimalEntries.formName} 
                fields={minimalEntries.fields} 
                onSubmit={minimalEntries.onSubmit} />
        )
    })

    test("init a formState using minimal fields", () => {
        const formState: any = DivalityForm.initFormState(minimalEntries.fields)
        const expectedFormState: any = {}
        expectedFormState[minimalEntries.fields[0].id] = {
            label: minimalEntries.fields[0].label,
            type: minimalEntries.fields[0].type,
            checkBeforeSubmit: minimalEntries.fields[0].checkBeforeSubmit,
            placeholder: minimalEntries.fields[0].placeholder,
            shouldMatchWith: minimalEntries.fields[0].shouldMatchWith,
            error: false,
            value: ""
        }
        expect(formState).toStrictEqual(expectedFormState)
    })

})