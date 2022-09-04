import icon from "../../assets/images/icons.svg";

function Message({ message, typeIcon }) {
  return (
    <div className="message">
      <svg>
        <use href={`${icon}#${typeIcon}`}></use>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default Message;
