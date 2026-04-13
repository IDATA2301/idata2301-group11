import type { ComponentType, InputHTMLAttributes, SVGProps } from "react";
import TextInput from "./TextInput";
import styles from "./FormPrimitives.module.css";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: IconComponent;
  wrapperClassName?: string;
  iconClassName?: string;
  className?: string;
};

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function IconInput({
  icon: Icon,
  wrapperClassName,
  iconClassName,
  className,
  ...inputProps
}: IconInputProps) {
  return (
    <div className={mergeClasses(styles.iconWrap, wrapperClassName)}>
      <Icon className={mergeClasses(styles.icon, iconClassName)} aria-hidden="true" />
      <TextInput className={mergeClasses(styles.inputWithIcon, className)} {...inputProps} />
    </div>
  );
}
