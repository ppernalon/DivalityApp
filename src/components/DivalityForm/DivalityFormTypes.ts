export type checkFormAnswer = {
    isValid: boolean
    message: string
}

export type checkBeforeSubmitFunction = (value: string) => checkFormAnswer

export type formField = {
    id: string
    label: string
    type: 'text' | 'password'
    placeholder?: string
    checkBeforeSubmit?: checkBeforeSubmitFunction
    shouldMatchWith?: string
}