import React from "react";

interface ISignButton {
  txt: string;
  isValid?: boolean;
  isOutlined?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function SignButton({
  txt,
  isValid = false,
  isOutlined = false,
  onClick,
}: ISignButton) {
  return (
    <button
      data-testid="signup-button"
      type="submit"
      className={isOutlined ? "btn_outline" : isValid ? "btn" : "btn-disabled"}
      disabled={!isOutlined && !isValid}
      onClick={onClick}
    >
      {txt}
    </button>
  );
}
