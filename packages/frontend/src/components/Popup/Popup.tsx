import React from "react";

interface PopupProps {
  text: string;
  closePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Popup = (props: PopupProps): JSX.Element => {
  return (
    <div>
      <h1>{props.text}</h1>
      <button onClick={props.closePopup}>close me</button>
    </div>
  );
};

export default Popup;
