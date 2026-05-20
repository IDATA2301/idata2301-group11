import type { ComponentType, InputHTMLAttributes, SVGProps } from "react";
import TextInput from "./TextInput";
import styles from "./FormPrimitives.module.css";

/** SVG icon component type used by icon input fields. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Props for an input field with a leading icon. */
type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: IconComponent;
  wrapperClassName?: string;
  iconClassName?: string;
  className?: string;
};

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Text input wrapper that renders a decorative icon alongside the field. */
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
