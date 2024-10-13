import { ChangeEventHandler } from 'react';

type TProps = {
  label?: string;
  value: string | number;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const Checkbox = (props: TProps) => {
  const { value, label, onChange, checked } = props;

  return (
    <label className="flex items-center gap-1 w-fit capitalize">
      <input
        type="checkbox"
        className="invisible absolute"
        {...{ value, onChange }}
      />
      <span
        className={`h-4 w-4 ${
          checked ? 'bg-teal-500 border-teal-500' : 'bg-white'
        } border-2 border-gray-400 rounded-md`}
      />
      {label}
    </label>
  );
};
