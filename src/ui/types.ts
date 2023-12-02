export type TSelect = {
  lable: string;
  isRequired: boolean;
  disabled?: boolean;
  value?: string | number;
  placeholder?: string;
  options: [
    {
      label: any;
      value: any;
    }
  ];
  className?: string;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
};
export type TButton = {
  lable: string;
  className?: string;
  iconClassName?: string;
  iconRequired?: boolean;
  disabled?: boolean;
  onClick?: (event: any) => void;
};
export type TCheckBox = {
  onChange?: any;
  checked: boolean;
};
export type TEmailInput = {
  label: string;
  value?: string;
};
