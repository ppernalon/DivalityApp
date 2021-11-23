import 'react-native'
import React from 'react'
import SignUp from '../../src/pages/SignUp/SignUp'
import renderer from 'react-test-renderer'
import { checkFormAnswer } from '../../src/components/DivalityForm/DivalityFormTypes'

describe("SignUp should", () => {
    test("render correctly", () => {
        renderer.create(<SignUp />)
    })

    test("accept 'Aze1' as psuedo", () => {
        const pseudoToTest = "Aze1"
        const expectedAnswer = {
            isValid: true,
            message: ""
        } as checkFormAnswer
        expect(SignUp.checkPseudo(pseudoToTest)).toStrictEqual(expectedAnswer)
    })

    test("refuse 'Aze1 ' as psuedo", () => {
        const pseudoToTest = "Aze1 "
        const expectedAnswer = {
            isValid: false,
            message: "Caratères non autorisés dans le pseudo"
        } as checkFormAnswer
        expect(SignUp.checkPseudo(pseudoToTest)).toStrictEqual(expectedAnswer)
    })

    test("refuse 'Â_e1' as psuedo", () => {
        const pseudoToTest = "Â_e1"
        const expectedAnswer = {
            isValid: false,
            message: "Caratères non autorisés dans le pseudo"
        } as checkFormAnswer
        expect(SignUp.checkPseudo(pseudoToTest)).toStrictEqual(expectedAnswer)
    })
})
