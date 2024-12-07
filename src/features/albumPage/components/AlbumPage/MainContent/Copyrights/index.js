import { Text } from "./styled"

export const Copyrights = ({ date, copyrights }) => {

    const dateFormatted = new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <section>
            <Text>{dateFormatted}</Text>
            {
                copyrights?.map(({ text }) => (
                    <Text $smaller>{text}</Text>
                ))
            }
        </section>
    )
};