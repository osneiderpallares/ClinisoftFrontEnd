import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { DataGrid } from '@mui/x-data-grid'

import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import { GridLocaleTextES } from 'src/@fake-db/table/constants/index.js'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Fab from '@mui/material/Fab'
import { CardContent } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Peticiones
import { saveRow } from '../../../@fake-db/requests/peticiones.js'
import { deleteRow } from '../../../@fake-db/requests/peticiones.js'

//import { useRouter } from 'next/router'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const endPoint = 'http://127.0.0.1:8000/show_parentesco/'

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

const AppPage = ({}) => {
  const { t } = useTranslation()

  //** DataGrid
  const columns = [
    {
      type: 'number',
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'nombre',
      headerName: t('NAME')
    },
    {
      flex: 0.25,
      minWidth: 230,
      field: 'abreviacion',
      headerName: t('ABBREVIATION')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'create_up',
      headerName: t('CREATION DATE')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'estado_nombre',
      headerName: t('STATE')
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'acciones',
      headerName: t('ACTIONS'),
      renderCell: params => {
        return (
          <Grid container>
            <Grid mx={1}>
              <Tooltip title={t('Edit')}>
                <IconButton color='warning' aria-label='Editar' size='small' onClick={() => Edit(params)}>
                  <Icon icon='tabler:pencil' fontSize='inherit' />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid mx={1}>
              <Tooltip title={t('Delete')}>
                <IconButton color='error' aria-label='Eliminar' size='small' onClick={() => Delete(params)}>
                  <Icon icon='tabler:trash' fontSize='inherit' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )
      }
    }
  ]
  const [rows, setRows] = useState(null)

  const peticionGet = async () => {
    await axios.get(endPoint).then(response => {
      setRows(response.data)
    })
  }

  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = rows?.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field]?.toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  // ** Eliminar registro
  const [registroSeleccionado, setRegistroSeleccionado] = useState({
    id: null,
    nombre: '',
    abreviacion: '',
    estado: '1'
  })

  const Delete = form => {
    setRegistroSeleccionado(form)
    handleClickOpen()
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleNo = () => setOpen(false)

  const handleSi = () => {
    if (deleteRow(registroSeleccionado.id, '/update_parentesco/')) {
      toast.success(t('Record deleted successfully!'))

      //router.push('./parentesco')
    } else {
      toast.error(t('Error when trying to delete the registry'))
    }
    setOpen(false)
  }

  //** Guardar registro y validar
  const schema = yup.object().shape({
    id: yup.number(),
    nombre: yup
      .string()
      .min(3, obj => showErrors(t('name'), obj.value.length, obj.min))
      .required(),
    abreviacion: yup
      .string()
      .min(1, obj => showErrors(t('abbreviation'), obj.value.length, obj.min))
      .required(),
    estado: yup.string()
  })

  const defaultValues = {
    nombre: '',
    abreviacion: '',
    estado: '1'
  }

  const openModal = () => {
    //registroSeleccionado.id = null

    setShow(true)
  }

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${t('The field')} ${field} ${t('is required')}`
    } else if (valueLen > 0 && valueLen < min) {
      return `${t('El campo')} ${field} ${t('must at least have')} ${min} ${t('characters')}`
    } else {
      return ''
    }
  }

  //const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    if (saveRow(data, '/store_parentesco/')) {
      toast.success(t('Log saved successfully!'))

      //router.push('./parentesco')
    } else {
      toast.error(t('Error saving log'))
    }
    setShow(false)
  }

  //** Editar registro
  const Edit = params => {
    setShowEdit(true)
    setRegistroSeleccionado(params.row)
  }

  const onSubmitEdit = e => {
    e.preventDefault()
    if (saveRow(registroSeleccionado, '/store_parentesco/')) {
      toast.success(t('Registration successfully updated!'))

      //router.push('./parentesco')
    } else {
      toast.error(t('Error updating registry'))
    }
    setShowEdit(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, [peticionGet()])

  const table = (
    <DataGrid
      columnHeaderHeight={38}
      rowHeight={38}
      stickyHeader
      rows={filteredData.length ? filteredData : rows}
      columns={columns}
      pageSizeOptions={[7, 10, 25, 50]}
      paginationModel={paginationModel}
      slots={{ toolbar: QuickSearchToolbar }}
      onPaginationModelChange={setPaginationModel}
      columnVisibilityModel={{ id: false, create_up: false }}
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
      localeText={GridLocaleTextES}
    />
  )

  if (!rows) return null

  return (
    <Card>
      <CardHeader
        title={t('Parentesco')}
        action={
          <Tooltip title={t('Add')}>
            <Fab color='primary' aria-label='Add' size='small' onClick={openModal}>
              <Icon icon='tabler:plus' fontSize={35} />
            </Fab>
          </Tooltip>
        }
      />
      <CardContent>
        <Box sx={{ height: 500 }}>{table}</Box>
      </CardContent>
      {/* Modal insertar registro */}
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        errors=''
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {t('Start Registration')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('Record the required information')}</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='nombre'
                      fullWidth
                      value={value}
                      label={t('Name')}
                      onChange={onChange}
                      placeholder={t('Enter the name')}
                      error={Boolean(errors.nombre)}
                      aria-describedby='validation-schema-name'
                      {...(errors.nombre && { helperText: errors.nombre.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='abreviacion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Abbreviation')}
                      onChange={onChange}
                      placeholder={t('Enter the abbreviation')}
                      error={Boolean(errors.abreviacion)}
                      aria-describedby='validation-schema-abbreviation'
                      {...(errors.abreviacion && { helperText: errors.abreviacion.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='estado'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label={t('State')}
                      SelectProps={{
                        value: value,
                        onChange: onChange
                      }}
                      error={Boolean(errors.estado)}
                      aria-describedby='validation-basic-estado'
                      {...(errors.estado && { helperText: errors.estado.message })}
                    >
                      <MenuItem value='1'>{t('Active')}</MenuItem>
                      <MenuItem value='2'>{t('Inactive')}</MenuItem>
                    </CustomTextField>
                  )}
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
            <Button variant='contained' sx={{ mr: 1 }} type='submit'>
              {t('Save')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
              {t('Cancel')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal editar registro */}
      <Dialog
        fullWidth
        open={showEdit}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowEdit(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowEdit(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        errors=''
      >
        <form onSubmit={onSubmitEdit}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => setShowEdit(false)}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                {t('Edit Record')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('Edit required information')}</Typography>
            </Box>
            <Grid container spacing={6}>
              <input
                name='id'
                type='hidden'
                value={registroSeleccionado.id}
                onChange={e => {
                  setRegistroSeleccionado({
                    id: registroSeleccionado.id,
                    nombre: registroSeleccionado.nombre,
                    abreviacion: registroSeleccionado.abreviacion,
                    estado: registroSeleccionado.estado
                  })
                }}
              ></input>
              <Grid item sm={12} xs={12}>
                <CustomTextField
                  fullWidth
                  required
                  name='nombre'
                  value={registroSeleccionado.nombre}
                  label={t('Name')}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: e.target.value,
                      abreviacion: registroSeleccionado.abreviacion,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter your name')}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required
                  name='abreviacion'
                  value={registroSeleccionado.abreviacion}
                  label={t('Abbreviation')}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: e.target.value,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the abbreviation')}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  select
                  fullWidth
                  id='estado'
                  name='estado'
                  label={t('State')}
                  SelectProps={{
                    value: registroSeleccionado.estado,
                    onChange: e => {
                      setRegistroSeleccionado({
                        id: registroSeleccionado.id,
                        nombre: registroSeleccionado.nombre,
                        abreviacion: registroSeleccionado.abreviacion,
                        estado: e.target.value
                      })
                    }
                  }}
                >
                  <MenuItem value='1'>{t('Active')}</MenuItem>
                  <MenuItem value='2'>{t('Inactive')}</MenuItem>
                </CustomTextField>
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
            <Button variant='contained' sx={{ mr: 1 }} type='submit'>
              {t('Save')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShowEdit(false)}>
              {t('Cancel')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confimrar si desea eliminar o no */}
      <Fragment>
        <Dialog
          open={open}
          disableEscapeKeyDown
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleNo()
            }
          }}
        >
          <DialogTitle id='alert-dialog-title'>Clinisoft</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {t('Do you want to delete the record?')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleSi}>{t('Yes')}</Button>
            <Button onClick={handleNo}>{t('No')}</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </Card>
  )
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
