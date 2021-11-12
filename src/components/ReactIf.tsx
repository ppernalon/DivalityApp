import React from "react"

type ReactIfProps = {
    condition: boolean,
    children: JSX.Element
}

const ReactIf = (props: ReactIfProps) => {
    return props.condition ? props.children : null
}

export default ReactIf