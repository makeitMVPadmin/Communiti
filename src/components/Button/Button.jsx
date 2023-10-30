import "./Button.scss"

export default function Button({buttonText, color}) {
    const buttonStyle = {
        backgroundColor: color
    }
    return(
        <>
            <button style={buttonStyle}>{buttonText}</button>
        </>
    )
}