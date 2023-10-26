import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

const ModulsDropdown = ({ settings, saveSettings }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button variant='outlined' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        Módulos
      </Button>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <MenuItem onClick={handleClose}>Información Básica de Terceros</MenuItem>
        <MenuItem onClick={handleClose}>Información de Afiliación</MenuItem>
        <MenuItem onClick={handleClose}>Facturación</MenuItem>
      </Menu>
    </div>
  )
}

export default ModulsDropdown
