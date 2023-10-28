import { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Fab from '@mui/material/Fab'
import { left, right } from '@popperjs/core'
import { textAlign } from '@mui/system'
import { CardContent } from '@mui/material'
import { useRouter } from 'next/router'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const baseURL = 'http://127.0.0.1:8000/show_prodid/'

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'nombre',
    headerName: 'NOMBRE'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'abreviacion',
    headerName: 'ABREVIACIÓN'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'estado',
    headerName: 'ESTADO'
  }
]

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const AppPage = () => {
  const [rows, setRows] = useState(null)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setRows(response.data)
    })
  }, [setRows])

  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [show, setShow] = useState(false)
  const [languages, setLanguages] = useState([])

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const router = useRouter()

  const handleClose = url => {
    if (url) {
      router.push(url)
    }
  }

  if (!rows) return null

  return (
    <Card>
      <CardHeader title='Propiedad DID' />
      <CardContent>
        <Box sx={{ height: 500 }}>
          <Box sx={{ textAlign: right }} onClick={() => setShow(true)}>
            <Fab color='primary' aria-label='add' size='small'>
              <Icon icon='tabler:plus' />
            </Fab>
          </Box>
          <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
            rows={rows}
            slotProps={{
              baseButton: {
                size: 'medium',
                variant: 'outlined'
              },
              toolbar: {
                value: searchText,
                clearSearch: () => handleSearch(''),
                onChange: event => handleSearch(event.target.value)
              }
            }}
          />
        </Box>
      </CardContent>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ingresar Registro Propiedad DID
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingresa la información requerida</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth defaultValue='Oliver' label='First Name' placeholder='John' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth defaultValue='Queen' label='Last Name' placeholder='Doe' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth defaultValue='oliverQueen' label='Username' placeholder='johnDoe' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField
                fullWidth
                label='Billing Email'
                placeholder='johnDoe@email.com'
                defaultValue='oliverQueen@email.com'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField select defaultValue='Status' fullWidth id='status-select' label='Status'>
                <MenuItem value='Status'>Status</MenuItem>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
                <MenuItem value='Suspended'>Suspended</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth label='Tax ID' placeholder='Tax-7490' defaultValue='Tax-8894' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth label='Contact' placeholder='+ 123 456 7890' defaultValue='+1 609 933 4422' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Language'
                SelectProps={{
                  multiple: true,
                  value: languages,
                  onChange: e => handleChange(e),
                  renderValue: selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )
                }}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Hindi'>Hindi</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                placeholder='UK'
                id='country-select'
                defaultValue='Select Country'
              >
                <MenuItem value='Select Country'>Select Country</MenuItem>
                <MenuItem value='France'>France</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='China'>China</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='US'>US</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Make this default shipping address'
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
