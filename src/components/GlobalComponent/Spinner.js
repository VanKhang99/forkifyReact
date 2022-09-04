import icon from "../../assets/images/icons.svg";

function Spinner() {
  return (
    <div className="spinner">
      <svg>
        <use href={`${icon}#icon-loader`}></use>
      </svg>
    </div>
  );
}

export default Spinner;
