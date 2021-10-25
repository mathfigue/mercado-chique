import { FC } from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.55),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.85),
  },
  width: '100%',
  maxWidth: '800px',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

interface SearchProps {
  search: any
  handleSearch: any
}

const InputSearch: FC<SearchProps> = ({ search, handleSearch }) => {
  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '800px', width: '100%', padding: '0 20px' }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Pesquisar...'
          inputProps={{ 'data-cy': 'input-search' }}
        />
      </Search>
    </Box>
  )
}

export default InputSearch
