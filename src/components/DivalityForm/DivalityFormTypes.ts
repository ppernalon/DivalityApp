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

export type divalityFormField = {
    label: string
    type: 'text' | 'password'
    error: boolean
    value: string
    placeholder?: string
    checkBeforeSubmit?: checkBeforeSubmitFunction
    shouldMatchWith?: string
}

export type formStateType = {
    [id: string]: divalityFormField  
}

export type divalityFormProps = {
    formName: string
    fields: formField[]
    onSubmit: Function
    submitButtonText?: string
    formNameIsDisplay?: boolean
    cancelButtonText?: string
    onCancel?: Function
    showCancelButton?: boolean
}