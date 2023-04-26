import React, { useState } from "react";

export function useInput<T>(
  initialValue: T,
  submitAction: Function = () => {}
) {
  const [inputValue, setInputValue] = useState(initialValue);

  const updateValue = (newValue: T) => {
    setInputValue(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    submitAction(inputValue);
    updateValue(initialValue);
  };

  return { inputValue, updateValue, handleChange, handleSubmit };
}
