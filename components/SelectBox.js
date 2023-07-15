import Select from 'react-select';

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
    zIndex: 3 
  }),
  menuList: styles => ({
    ...styles,
    borderRadius: '0.625rem',
    border: '3px solid #1B1C1E',
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

export default function SelectBox({ ...props }) {
  return (
    <>
      <Select
        unstyled
        styles={selectStyles}
        menuPortalTarget={document.body} 
        placeholder={''}
        noOptionsMessage={({ inputValue }) => !inputValue ? 'Sem valores' : 'Não encontrado'}
        { ...props }
       />
    </>
  )
}
