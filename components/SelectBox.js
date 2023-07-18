import Select from 'react-select';
import { Controller } from 'react-hook-form';

const selectStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    maxHeight: '4rem',
    width: '100%',
    borderRadius: '0.625rem',
    border: '3px solid #1B1C1E',
    paddingLeft: '3rem',
    paddingRight: '1rem',
  }),
  menuPortal: styles => ({
    ...styles,
    zIndex: 4
  }),
  menuList: styles => ({
    ...styles,
    borderRadius: '0.625rem',
    border: '3px solid #1B1C1E',
    backgroundColor: 'white',
  }),
  singleValue: styles => ({
    ...styles,
    borderRadius: '0px',
  }),
  option: (styles,{ data,isDisabled,isFocused,isSelected }) => {
    return {
      ...styles,
      borderRadius: '0',
      padding: '1rem',
      color: isFocused ? 'white' : '#1B1C1E',
      backgroundColor: isFocused ? '#1B1C1E' : 'white',
      border: '1px solid #1B1C1E',
    };
  },
};

export default function SelectBox({ control,name,options,fetchFunction }) {

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: '(Campo obrigatório)' }}
      render={({ field: { value, onChange } }) => (
        <Select
          value={value}
          onChange={fetchFunction ? fetchFunction : onChange}
          options={options}
          unstyled
          styles={selectStyles}
          menuPortalTarget={document.body}
          placeholder={''}
          noOptionsMessage={({ inputValue }) => !inputValue ? 'Sem valores' : 'Não encontrado'}
        />
      )}
    />
  );
}
