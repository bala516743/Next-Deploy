export const textfield = {
    display:'flex',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      height: '34px',
      '& fieldset': {
        border: '1px solid #c49f9f',
      },
      '&:hover fieldset': {
        border: '1px solid #c49f9f',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #c49f9f',
      },
    },
}

export const ButtonStyle = {
  color:'white', 
  textTransform:'none', 
  "&:focus": {outline: 'none'},
  borderRadius:'6px',
}