export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  parentClassName?: string;
  errorMsg?: any;
  isInvalid: boolean;
  disabled?: boolean;
  helperText?: any | undefined;
  inputLeftLable?: string | undefined;
  inputRightLable?: string | undefined;
  inputRIghtIcon?: string | undefined;
  inputLeftIcon?: string | undefined;
}
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  filter?: boolean;
  options: [
    {
      label: any;
      value: any;
    }
  ];
  isInvalid?: boolean;
}
