import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./FormPrimitives.module.css";

/** Common base props shared by text inputs and textareas. */
type BaseProps = {
  className?: string;
};

/** Props for a regular input element. */
type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

/** Props for a textarea element. */
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

/** Union type for the shared text input component. */
type TextInputProps = InputProps | TextareaProps;

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Shared text input component that can render either an input or textarea. */
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
