import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./FormPrimitives.module.css";

type BaseProps = {
  className?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type TextInputProps = InputProps | TextareaProps;

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TextInput(props: TextInputProps) {
  if (props.as === "textarea") {
    const { as: textareaType, className, ...textareaProps } = props;
    void textareaType;
    return <textarea className={mergeClasses(styles.input, styles.textarea, className)} {...textareaProps} />;
  }

  const { as: inputType, className, ...inputProps } = props;
  void inputType;
  return <input className={mergeClasses(styles.input, className)} {...inputProps} />;
}
