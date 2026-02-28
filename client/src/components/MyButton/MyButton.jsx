import './myButton.css'

const MyButton = ({text, onClick, type = "button", className = "", disabled}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`my-custom-button ${className}`}
        disabled={disabled}
    >
        {text}
    </button>
  )
}

export default MyButton;