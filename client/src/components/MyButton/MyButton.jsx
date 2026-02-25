import './myButton.css'

const MyButton = ({text, onClick, type = "button", className = ""}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`my-custom-button ${className}`}
    >
        {text}
    </button>
  )
}

export default MyButton;