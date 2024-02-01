import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { DataGrid, esES,enUS} from '@mui/x-data-grid'

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

import { useRouter } from 'next/router'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const endPoint = 'http://127.0.0.1:8000/show_entidad_diagnostica/'
const endPoint_ciudad = 'http://127.0.0.1:8000/show_ciudad/'

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
  const { t, i18n  } = useTranslation()

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
        field: 'abreviatura',
        headerName: t('Abbreviatura')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'direccion',
        headerName: t('Address')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'nombre_ciudad',
        headerName: t('City')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'indicativo',
        headerName: t('Indicative')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'telefono',
        headerName: t('Phone')
    }, 
    {
        flex: 0.25,
        minWidth: 230,
        field: 'correo',
        headerName: t('Email')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'sgss',
        headerName: t('SGSS')
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
  const [ciudadRows, setciudadRows] = useState(null)

  const peticionGet = async () => {
    await axios.get(endPoint).then(response => {
        setRows(response.data)
    })
    await axios.get(endPoint_ciudad).then(response => {
        setciudadRows(response.data)
    })
  }

  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
 
  const router = useRouter()

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
    abreviatura: '',
    direccion: '',
    ciudad: '',
    indicativo: '',
    telefono: '',
    correo: '',
    sgss: '',
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
    if (deleteRow(registroSeleccionado.id, '/update_entidad_diagnostica/')) {
      toast.success(t('Record deleted successfully!'))
      router.push('./entidad-diagnostica')
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
    abreviatura: yup
      .string()
      .min(1, obj => showErrors(t('abbreviatura'), obj.value.length, obj.min))
      .required(),
    direccion: yup
      .string()
      .min(3, obj => showErrors(t('address'), obj.value.length, obj.min))
      .required(),
    ciudad: yup
      .number()
      .min(1, obj => showErrors(t('city'), obj.value.length, obj.min))
      .required(),
    indicativo: yup
      .string()
      .min(2, obj => showErrors(t('indicative'), obj.value.length, obj.min))
      .required(),
    telefono: yup
      .string()
      .min(5, obj => showErrors(t('phone'), obj.value.length, obj.min))
      .required(),
    correo: yup
      .string().email()
      .min(5, obj => showErrors(t('email'), obj.value.length, obj.min))
      .required(),
    sgss: yup
      .string()
      .min(3, obj => showErrors(t('Sgss'), obj.value.length, obj.min))
      .required(),
    estado: yup.string()
  })

  const defaultValues = {
    nombre: '',
    abreviatura: '',
    direccion: '',
    ciudad: '',
    indicativo: '',
    telefono: '',
    correo: '',
    sgss: '',
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
      return `${t('The field')} ${field} ${t('must at least have')} ${min} ${t('characters')}`
    } else {
      return ''
    }
  }

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
    if (saveRow(data, '/store_entidad_diagnostica/')) {
      toast.success(t('Log saved successfully!'))
      router.push('./entidad-diagnostica')
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
    if (saveRow(registroSeleccionado, '/store_entidad_diagnostica/')) {
      toast.success(t('Registration successfully updated!'))
      router.push('./entidad-diagnostica')
    } else {
      toast.error(t('Error updating registry'))
    }
    setShowEdit(false)
  }

  useEffect(() => {
    peticionGet()
  }, [router])
  const currentLocaleText =
  i18n.language === 'es' ? esES.components.MuiDataGrid.defaultProps.localeText : enUS.components.MuiDataGrid.defaultProps.localeText;
  const table = (
    <DataGrid
      disableColumnMenu  
      columnHeaderHeight={38}
      rowHeight={38}
      stickyHeader
      rows={filteredData.length ? filteredData : rows}
      columns={columns}
      pageSizeOptions={[7, 10, 25, 50]}
      paginationModel={paginationModel}
      slots={{ toolbar: QuickSearchToolbar }}
      onPaginationModelChange={setPaginationModel}
      columnVisibilityModel={{ id: false, create_up: false, nombre_ciudad:false,indicativo:false,correo:false }}
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
      localeText={currentLocaleText}
      
      // localeText={esES.components.MuiDataGrid.defaultProps.localeText}

      // // Para inglés
      // localeText={enUS.components.MuiDataGrid.defaultProps.localeText} 
   />
   )
   const ITEM_HEIGHT = 48
   const ITEM_PADDING_TOP = 8
   const MenuProps = {
     PaperProps: {
       style: {
         width: 250,
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
       }
     }
   }
 
  if (!rows) return null

 
  return (
    <Card>
      <CardHeader
        title={t('Diagnosing Entity')}
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
                      inputProps={{ maxLength: 200 }}
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
                  name='abreviatura'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Abreviatura')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the abreviatura')}
                      error={Boolean(errors.abreviatura)}
                      aria-describedby='validation-schema-abreviatura'
                      {...(errors.abreviatura && { helperText: errors.abreviatura.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='direccion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Address')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the address')}
                      error={Boolean(errors.direccion)}
                      aria-describedby='validation-schema-address'
                      {...(errors.direccion && { helperText: errors.direccion.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='ciudad'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label={t('City')}
                      SelectProps={{
                        MenuProps,
                        value: value,
                        onChange:onChange
                      }}
                      error={Boolean(errors.ciudad)}
                      aria-describedby='validation-schema-city'
                      {...(errors.ciudad && { helperText: errors.ciudad.message })}
                      >
                      {ciudadRows?.map(ciu => {
                        return (
                          <MenuItem key={ciu.id} value={ciu.id}>
                            {ciu.nombre}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='indicativo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Indicative')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the indicative')}
                      error={Boolean(errors.indicativo)}
                      aria-describedby='validation-schema-indicative'
                      {...(errors.indicativo && { helperText: errors.indicativo.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='telefono'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Phone')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the phone')}
                      error={Boolean(errors.telefono)}
                      aria-describedby='validation-schema-phone'
                      {...(errors.telefono && { helperText: errors.telefono.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='correo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Email')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the email')}
                      error={Boolean(errors.correo)}
                      aria-describedby='validation-schema-email'
                      {...(errors.correo && { helperText: errors.correo.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='sgss'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('SGSS')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the sgss')}
                      error={Boolean(errors.sgss)}
                      aria-describedby='validation-schema-Sgss'
                      {...(errors.sgss && { helperText: errors.sgss.message })}
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
                    abreviatura: registroSeleccionado.abreviatura,
                    direccion: registroSeleccionado.direccion,
                    ciudad: registroSeleccionado.ciudad,
                    indicativo: registroSeleccionado.indicativo,
                    telefono: registroSeleccionado.telefono,
                    correo: registroSeleccionado.correo,
                    sgss: registroSeleccionado.sgss,
                    estado: registroSeleccionado.estado
                  })
                }}
              ></input>
              <Grid item sm={12} xs={12}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='nombre'
                  value={registroSeleccionado.nombre}
                  label={t('Name')}
                  inputProps={{ maxLength: 200 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: e.target.value,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter your name')}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='abreviatura'
                  value={registroSeleccionado.abreviatura}
                  label={t('Abbreviatura')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: e.target.value,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                 />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='direccion'
                  value={registroSeleccionado.direccion}
                  label={t('Address')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: e.target.value,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                 />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  select
                  fullWidth
                  required={false}
                  name='ciudad'
                  label={t('City')}
                  SelectProps={{
                    MenuProps,
                    value:registroSeleccionado.ciudad,    
                    onChange: e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: e.target.value,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                   }
                  }}
                  >
                  {ciudadRows?.map(ciu => {
                    return (
                      <MenuItem key={ciu.id} value={ciu.id}>
                        {ciu.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='indicativo'
                  value={registroSeleccionado.indicativo}
                  label={t('Indicative')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: e.target.value,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                 />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='telefono'
                  value={registroSeleccionado.telefono}
                  label={t('Phone')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: e.target.value,
                      correo: registroSeleccionado.correo,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                 />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='correo'
                  value={registroSeleccionado.correo}
                  label={t('Email')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: e.target.value,
                      sgss: registroSeleccionado.sgss,
                      estado: registroSeleccionado.estado
                    })
                  }}
                 />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  fullWidth
                  required={false}
                  name='sgss'
                  value={registroSeleccionado.sgss}
                  label={t('SGSS')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviatura: registroSeleccionado.abreviatura,
                      direccion: registroSeleccionado.direccion,
                      ciudad: registroSeleccionado.ciudad,
                      indicativo: registroSeleccionado.indicativo,
                      telefono: registroSeleccionado.telefono,
                      correo: registroSeleccionado.correo,
                      sgss: e.target.value,
                      estado: registroSeleccionado.estado
                    })
                  }}
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
                        abreviatura: registroSeleccionado.abreviatura,
                        direccion: registroSeleccionado.direccion,
                        ciudad: registroSeleccionado.ciudad,
                        indicativo: registroSeleccionado.indicativo,
                        telefono: registroSeleccionado.telefono,
                        correo: registroSeleccionado.correo,
                        sgss: registroSeleccionado.sgss,
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

// AppPage.acl = {
//   action: 'read',
//   subject: 'acl-page'
// }

export default AppPage