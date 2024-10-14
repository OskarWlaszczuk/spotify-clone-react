import {Container, Field, StyledSearchIcon } from "./styled"

export const Input = () => {
    return (
        <Container>
            <StyledSearchIcon />
            <Field
                placeholder="What do you want to listen?"
            />
        </Container>
    )
}