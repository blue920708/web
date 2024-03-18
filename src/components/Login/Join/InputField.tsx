interface Props {
  inputId: string;
  inputName?: string;
  type: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder: string;
  maxLength: number;
  hasButton?: boolean;
  buttonName?: string;
  onClick?: () => void;
  show?: boolean;
}

export const InputField = ({
  inputId,
  inputName,
  type,
  label,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  hasButton,
  buttonName,
  onClick,
  show = true,
}: Props) => {
  return (
    <>
      <div
        className='col-12'
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <label htmlFor={inputId} className='form-label'>
          {label}
        </label>
        <div className='input-group has-validation'>
          <input
            className='form-control'
            type={type}
            name={inputName}
            id={inputId}
            maxLength={maxLength}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            required
            autoComplete='off'
          />
          {hasButton && (
            <button
              className='btn btn-primary w-40'
              type='button'
              onClick={onClick}
            >
              {buttonName}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
