// ** React Imports
import { useState } from 'react'

import Box from '@mui/material/Box'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'

//import Infobasic from '/pages/info-basic'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    border: 1
  }
}))

// Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  '&:not(.Mui-focusVisible):hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.Mui-selected': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemIcon-root, & .MuiTypography-root': {
      color: theme.palette.common.white
    }
  }
}))

const MenuCustomized = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  const router = useRouter()

  const handleClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
      color: theme.palette.primary.main
    }
  }))

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  return (
    <div>
      <MenuItemStyled sx={{ p: 0 }} onClick={() => handleClose('/pages/moduls')}>
        <Box sx={styles}>
          <Icon icon='tabler:folder' />
          Módulos
        </Box>
      </MenuItemStyled>
      {/* <Menu
        keepMounted
        elevation={0}
        anchorEl={anchorEl}
        id='customized-menu'
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      ></Menu> */}
    </div>
  )
}

export default MenuCustomized
