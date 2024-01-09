import { useState, useEffect, forwardRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { DataGrid, esES, enUS } from '@mui/x-data-grid'

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
import { saveRow } from 'src/@fake-db/requests/peticiones.js'
import { deleteRow } from 'src/@fake-db/requests/peticiones.js'

import { useRouter } from 'next/router'

import { indicativos } from 'src/@fake-db/table/constants'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const endPoint = 'http://127.0.0.1:8000/show_sede/'

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
  const { t, i18n } = useTranslation()

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
      flex: 0.2,
      minWidth: 200,
      field: 'nombre',
      headerName: t('NAME')
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'abreviacion',
      headerName: t('ABBREVIATION')
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'direccion',
      headerName: t('ADDRESS')
    },
    {
      flex: 0.1,
      minWidth: 90,
      field: 'telefono',
      headerName: t('PHONE NUMBER'),
      renderCell: sede => {
        return sede.row?.indicativo + ' ' + sede.row?.numero_telefonico
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'ciudades_nombre',
      headerName: t('CITY')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'create_up',
      headerName: t('CREATION DATE')
    },
    {
      flex: 0.11,
      minWidth: 110,
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
  const [indiceRow, setIndiceRow] = useState(null)
  const [departamentoRow, setDepartamentoRow] = useState(null)
  const [dep, setDep] = useState(9)
  const [ciud, setCiud] = useState('')
  const [ciudadRow, setCiudadRow] = useState(null)
  const [ciudades, setCiudades] = useState(null)
  const [company, setCompany] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)

  const peticionGet = async () => {
    await axios.get(endPoint).then(response => {
      setRows(response.data)
    })
    await axios.get('http://127.0.0.1:8000/show_indice').then(response => {
      setIndiceRow(response.data)
    })
    await axios.get('http://127.0.0.1:8000/show_departamento').then(response => {
      setDepartamentoRow(response.data)
    })
    await axios.get(`http://127.0.0.1:8000/get_ciudad_por_departamento/` + dep).then(response => {
      setCiudadRow(response.data)
    })
    await axios.get(`http://127.0.0.1:8000/show_ciudad/`).then(response => {
      setCiudades(response.data)
    })
    await axios.get('http://127.0.0.1:8000/show_empresa/').then(response => {
      setCompany(response.data[0])
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
    abreviacion: '',
    sgsss: '',
    numero_empleados: 1,
    indicativo: '+ 57',
    numero_telefonico: 1,
    direccion: '',
    departamento: 9, //Cesar por default
    ciudades: '',
    indice: '1',
    email: '',
    representante_legal: '',
    horario_laboral_inicio: '08:00:00',
    horario_laboral_fin: '18:00:00',
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
    if (deleteRow(registroSeleccionado.id, '/update_sede/')) {
      toast.success(t('Record deleted successfully!'))
      router.push('./sede')
    } else {
      toast.error(t('Error when trying to delete the registry'))
    }
    setOpen(false)
  }
  const [error, setError] = useState({ ciudad: '' })

  const handleChangeDep = props => {
    setDep(props.target.value)
    const approved = ciudades?.filter(ciudad => ciudad.departamento === props.target.value)
    setCiudadRow(approved)
    if (modoEdicion) {
      setRegistroSeleccionado({
        id: registroSeleccionado.id,
        nombre: registroSeleccionado.nombre,
        abreviacion: registroSeleccionado.abreviacion,
        sgsss: registroSeleccionado.sgsss,
        numero_empleados: registroSeleccionado.numero_empleados,
        indicativo: registroSeleccionado.indicativo,
        numero_telefonico: registroSeleccionado.numero_telefonico,
        direccion: registroSeleccionado.direccion,
        departamento: props.target.value,
        ciudades: '',
        indice: registroSeleccionado.indice,
        email: registroSeleccionado.email,
        representante_legal: registroSeleccionado.representante_legal,
        horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
        horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
        estado: registroSeleccionado.estado
      })
    } else {
      setCiud('')
      setError({ ciudad: `${t('The field city is required')}` })
    }
  }

  const handleChangeCiud = props => {
    if (!modoEdicion) {
      setCiud(props.target.value)
      setError({ ciudad: '' })
    }
  }

  //** validaciones
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
    sgsss: yup
      .string()
      .min(1, obj => showErrors(t('sgsss'), obj.value.length, obj.min))
      .required(),
    numero_empleados: yup
      .number()
      .min(1, obj => showErrors(t('number of employees'), obj.value.length, obj.min))
      .required(),
    numero_telefonico: yup
      .number()
      .min(1, obj => showErrors(t('cell phone'), obj.value, obj.min))
      .required(),
    direccion: yup
      .string()
      .min(1, obj => showErrors(t('address'), obj.value.length, obj.min))
      .required(),
    indice: yup
      .string()
      .min(1, obj => showErrors(t('index'), obj.value.length, obj.min))
      .required(),
    email: yup.string().email().required(),
    representante_legal: yup
      .string()
      .min(1, obj => showErrors(t('legal representative'), obj.value.length, obj.min))
      .required(),
    estado: yup.string()
  })

  const defaultValues = {
    nombre: '',
    abreviacion: '',
    sgsss: '',
    indicativo: '+ 57',
    numero_telefonico: 1,
    direccion: '',
    numero_empleados: 1,
    departamento: 9, //Cesar por default
    indice: '1',
    email: '',
    representante_legal: '',
    horario_laboral_inicio: '08:00:00',
    horario_laboral_fin: '18:00:00',
    estado: '1'
  }

  const openModal = () => {
    setShow(true)
  }

  const showErrors = (field, valueLen, min, max = 999999999) => {
    if (!ciud) {
      setError({ ciudad: `${t('The field city is required')}` })
    }
    if (valueLen === 0) {
      return `${t('The field')} ${field} ${t('is required')}`
    } else if (valueLen > 0 && valueLen < min) {
      return `${t('The field')} ${field} ${t('must at least have')} ${min} ${t('characters')}`
    } else if (valueLen > max) {
      return `${t('The field')} ${field} ${t('cannot be longer than')} ${max} ${t('characters')}`
    } else if (valueLen < 0) {
      return `${t('The field')} ${field} ${t('the field cannot be less than 0')}`
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
    if (error.ciudad) {
      toast.error(error.ciudad)
    } else {
      if (saveRow(data, '/store_sede/')) {
        toast.success(t('Log saved successfully!'))
        router.push('./sede')
      } else {
        toast.error(t('Error saving log'))
      }
      setShow(false)
    }
  }

  //** Editar registro
  const Edit = params => {
    setShowEdit(true)
    setModoEdicion(true)
    setRegistroSeleccionado(params.row)
  }

  const onSubmitEdit = e => {
    e.preventDefault()
    if (saveRow(registroSeleccionado, '/store_sede/')) {
      toast.success(t('Registration successfully updated!'))
      router.push('./sede')
    } else {
      toast.error(t('Error updating registry'))
    }
    setModoEdicion(false)
    setShowEdit(false)
  }

  useEffect(() => {
    peticionGet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const currentLocaleText =
    i18n.language === 'es'
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText

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

  if (!indiceRow) return null

  if (!departamentoRow) return null

  if (!ciudades) return null

  if (!company) return null

  return (
    <Card>
      <CardHeader
        title={t('Campus')}
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
                <CustomTextField
                  id='nombre_empresa'
                  name='nombre_empresa'
                  fullWidth
                  value={company.nombre}
                  label={t('Company Name')}
                  disabled
                />
              </Grid>
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
                  name='abreviacion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Abbreviation')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the abbreviation')}
                      error={Boolean(errors.abreviacion)}
                      aria-describedby='validation-schema-abbreviation'
                      {...(errors.abreviacion && { helperText: errors.abreviacion.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='sgsss'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('SGSSS')}
                      inputProps={{ maxLength: 50 }}
                      onChange={onChange}
                      placeholder={t('Enter the sgsss')}
                      error={Boolean(errors.sgsss)}
                      aria-describedby='validation-schema-sgsss'
                      {...(errors.sgsss && { helperText: errors.sgsss.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='numero_empleados'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='number'
                      value={value ? value : 1}
                      label={t('Number of Employees')}
                      inputProps={{ maxLength: 9 }}
                      onChange={onChange}
                      placeholder={t('Enter the number employees')}
                      error={Boolean(errors.numero_empleados)}
                      aria-describedby='validation-schema-number-employees'
                      {...(errors.numero_empleados && { helperText: errors.numero_empleados.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='indice'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label={t('Index')}
                      SelectProps={{
                        MenuProps,
                        value: value,
                        onChange: onChange
                      }}
                      error={Boolean(errors.indice)}
                      {...(errors.indice && { helperText: errors.indice.message })}
                    >
                      {indiceRow?.map(ind => {
                        return (
                          <MenuItem key={ind.id} value={ind.id}>
                            {ind.nombre}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='indicativo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label={t('indicative')}
                      SelectProps={{
                        MenuProps,
                        value: value,
                        onChange: onChange
                      }}
                      error={Boolean(errors.indicativo)}
                      {...(errors.indicativo && { helperText: errors.indicativo.message })}
                    >
                      {indicativos?.map(ind => {
                        return (
                          <MenuItem key={ind.pais} value={ind.codigo}>
                            {ind.pais} {ind.codigo}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='numero_telefonico'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='number'
                      value={value > 0 ? value : ''}
                      label={t('Cell Phone')}
                      onChange={onChange}
                      placeholder={t('Enter the cell phone')}
                      error={Boolean(errors.numero_telefonico)}
                      {...(value
                        ? errors.numero_telefonico && { helperText: errors.numero_telefonico.message }
                        : { helperText: `${t('The field cell phone is required')}` })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='direccion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Address')}
                      inputProps={{ maxLength: 9 }}
                      onChange={onChange}
                      placeholder={t('Enter the address')}
                      error={Boolean(errors.direccion)}
                      {...(errors.direccion && { helperText: errors.direccion.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  select
                  fullWidth
                  label={t('Department')}
                  SelectProps={{
                    MenuProps,
                    value: dep,
                    onChange: handleChangeDep
                  }}
                  error={Boolean(errors.departamento)}
                  {...(errors.departamento && { helperText: errors.departamento.message })}
                >
                  {departamentoRow?.map(dep => {
                    return (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  select
                  fullWidth
                  label={t('City')}
                  SelectProps={{
                    MenuProps,
                    value: ciud,
                    onChange: handleChangeCiud
                  }}
                  error={Boolean(error.ciudad)}
                  {...(error.ciudad && { helperText: error.ciudad })}
                >
                  {ciudadRow?.map(ciud => {
                    return (
                      <MenuItem key={ciud.id} value={ciud.id}>
                        {ciud.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='email'
                      name='email'
                      fullWidth
                      required
                      label={t('Email')}
                      value={value}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the email')}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='representante_legal'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Legal Representative')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the legal representative')}
                      error={Boolean(errors.representante_legal)}
                      aria-describedby='validation-schema-legal-representative'
                      {...(errors.representante_legal && { helperText: errors.representante_legal.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='horario_laboral_inicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='time'
                      value={value}
                      label={t('Start Of Work Day')}
                      onChange={onChange}
                      placeholder={t('Enter the start of work day')}
                      error={Boolean(errors.horario_laboral_inicio)}
                      {...(errors.horario_laboral_inicio && { helperText: errors.horario_laboral_inicio.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='horario_laboral_fin'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='time'
                      value={value}
                      label={t('End Of Work Day')}
                      onChange={onChange}
                      placeholder={t('Enter the end of work day')}
                      error={Boolean(errors.horario_laboral_fin)}
                      {...(errors.horario_laboral_fin && { helperText: errors.horario_laboral_fin.message })}
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
                {t('Start Registration')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('Record the required information')}</Typography>
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
                    sgsss: registroSeleccionado.sgsss,
                    numero_empleados: registroSeleccionado.numero_empleados,
                    indicativo: registroSeleccionado.indicativo,
                    numero_telefonico: registroSeleccionado.numero_telefonico,
                    direccion: registroSeleccionado.direccion,
                    departamento: registroSeleccionado.departamento,
                    ciudades: registroSeleccionado.ciudades,
                    indice: registroSeleccionado.indice,
                    email: registroSeleccionado.email,
                    representante_legal: registroSeleccionado.representante_legal,
                    horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                    horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                    estado: registroSeleccionado.estado
                  })
                }}
              ></input>
              <Grid item sm={12} xs={12}>
                <CustomTextField
                  name='nombre_empresa'
                  fullWidth
                  value={company.nombre}
                  label={t('Company Name')}
                  disabled
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <CustomTextField
                  name='nombre'
                  fullWidth
                  required
                  value={registroSeleccionado.nombre}
                  label={t('Name')}
                  inputProps={{ maxLength: 200 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: e.target.value,
                      abreviacion: registroSeleccionado.abreviacion,
                      sgsss: registroSeleccionado.sgsss,
                      numero_empleados: registroSeleccionado.numero_empleados,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: registroSeleccionado.numero_telefonico,
                      direccion: registroSeleccionado.direccion,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the name')}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <CustomTextField
                  name='abreviacion'
                  fullWidth
                  required
                  value={registroSeleccionado.abreviacion}
                  label={t('Abbreviation')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: e.target.value,
                      sgsss: registroSeleccionado.sgsss,
                      numero_empleados: registroSeleccionado.numero_empleados,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: registroSeleccionado.numero_telefonico,
                      direccion: registroSeleccionado.direccion,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the abbreviation')}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <CustomTextField
                  name='sgsss'
                  fullWidth
                  required
                  value={registroSeleccionado.sgsss}
                  label={t('SGSSS')}
                  inputProps={{ maxLength: 50 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: registroSeleccionado.abreviacion,
                      sgsss: e.target.value,
                      numero_empleados: registroSeleccionado.numero_empleados,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: registroSeleccionado.numero_telefonico,
                      direccion: registroSeleccionado.direccion,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the sgsss')}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <CustomTextField
                  name='numero_empleados'
                  fullWidth
                  required
                  type='number'
                  value={registroSeleccionado.numero_empleados ? registroSeleccionado.numero_empleados : 1}
                  label={t('Number of Employees')}
                  inputProps={{ maxLength: 9 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: registroSeleccionado.abreviacion,
                      sgsss: registroSeleccionado.sgsss,
                      numero_empleados: e.target.value,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: registroSeleccionado.numero_telefonico,
                      direccion: registroSeleccionado.direccion,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the number employees')}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='indice'
                  select
                  fullWidth
                  required
                  label={t('Index')}
                  SelectProps={{
                    MenuProps,
                    value: registroSeleccionado.indice,
                    onChange: e => {
                      setRegistroSeleccionado({
                        id: registroSeleccionado.id,
                        nombre: registroSeleccionado.nombre,
                        abreviacion: registroSeleccionado.abreviacion,
                        sgsss: registroSeleccionado.sgsss,
                        numero_empleados: registroSeleccionado.numero_empleados,
                        indicativo: registroSeleccionado.indicativo,
                        numero_telefonico: registroSeleccionado.numero_telefonico,
                        direccion: registroSeleccionado.direccion,
                        departamento: registroSeleccionado.departamento,
                        ciudades: registroSeleccionado.ciudades,
                        indice: e.target.value,
                        email: registroSeleccionado.email,
                        representante_legal: registroSeleccionado.representante_legal,
                        horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                        horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                        estado: registroSeleccionado.estado
                      })
                    }
                  }}
                >
                  {indiceRow?.map(ind => {
                    return (
                      <MenuItem key={ind.id} value={ind.id}>
                        {ind.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='indicativo'
                  select
                  fullWidth
                  required
                  label={t('indicative')}
                  SelectProps={{
                    MenuProps,
                    value: registroSeleccionado.indicativo,
                    onChange: e => {
                      setRegistroSeleccionado({
                        id: registroSeleccionado.id,
                        nombre: registroSeleccionado.nombre,
                        abreviacion: registroSeleccionado.abreviacion,
                        sgsss: registroSeleccionado.sgsss,
                        numero_empleados: registroSeleccionado.numero_empleados,
                        indicativo: e.target.value,
                        numero_telefonico: registroSeleccionado.numero_telefonico,
                        direccion: registroSeleccionado.direccion,
                        departamento: registroSeleccionado.departamento,
                        ciudades: registroSeleccionado.ciudades,
                        indice: registroSeleccionado.indice,
                        email: registroSeleccionado.email,
                        representante_legal: registroSeleccionado.representante_legal,
                        horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                        horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                        estado: registroSeleccionado.estado
                      })
                    }
                  }}
                >
                  {indicativos?.map(ind => {
                    return (
                      <MenuItem key={ind.pais} value={ind.codigo}>
                        {ind.pais} {ind.codigo}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='numero_telefonico'
                  fullWidth
                  required
                  type='number'
                  value={registroSeleccionado.numero_telefonico > 0 ? registroSeleccionado.numero_telefonico : ''}
                  label={t('Cell Phone')}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: registroSeleccionado.abreviacion,
                      sgsss: registroSeleccionado.sgsss,
                      numero_empleados: registroSeleccionado.numero_empleados,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: e.target.value,
                      direccion: registroSeleccionado.direccion,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the cell phone')}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='direccion'
                  fullWidth
                  required
                  value={registroSeleccionado.direccion}
                  label={t('Address')}
                  inputProps={{ maxLength: 9 }}
                  onChange={e => {
                    setRegistroSeleccionado({
                      id: registroSeleccionado.id,
                      nombre: registroSeleccionado.nombre,
                      abreviacion: registroSeleccionado.abreviacion,
                      sgsss: registroSeleccionado.sgsss,
                      numero_empleados: registroSeleccionado.numero_empleados,
                      indicativo: registroSeleccionado.indicativo,
                      numero_telefonico: registroSeleccionado.numero_telefonico,
                      direccion: e.target.value,
                      departamento: registroSeleccionado.departamento,
                      ciudades: registroSeleccionado.ciudades,
                      indice: registroSeleccionado.indice,
                      email: registroSeleccionado.email,
                      representante_legal: registroSeleccionado.representante_legal,
                      horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                      horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                      estado: registroSeleccionado.estado
                    })
                  }}
                  placeholder={t('Enter the address')}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='departamento'
                  select
                  fullWidth
                  required
                  label={t('Department')}
                  SelectProps={{
                    MenuProps,
                    value: registroSeleccionado.departamento,
                    onChange: handleChangeDep
                  }}
                >
                  {departamentoRow?.map(dep => {
                    return (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={4}>
                <CustomTextField
                  name='ciudades'
                  select
                  fullWidth
                  required
                  label={t('City')}
                  SelectProps={{
                    MenuProps,
                    value: registroSeleccionado.ciudades,
                    onChange: e => {
                      setRegistroSeleccionado({
                        id: registroSeleccionado.id,
                        nombre: registroSeleccionado.nombre,
                        abreviacion: registroSeleccionado.abreviacion,
                        sgsss: registroSeleccionado.sgsss,
                        numero_empleados: registroSeleccionado.numero_empleados,
                        indicativo: registroSeleccionado.indicativo,
                        numero_telefonico: registroSeleccionado.numero_telefonico,
                        direccion: registroSeleccionado.direccion,
                        departamento: registroSeleccionado.departamento,
                        ciudades: e.target.value,
                        indice: registroSeleccionado.indice,
                        email: registroSeleccionado.email,
                        representante_legal: registroSeleccionado.representante_legal,
                        horario_laboral_inicio: registroSeleccionado.horario_laboral_inicio,
                        horario_laboral_fin: registroSeleccionado.horario_laboral_fin,
                        estado: registroSeleccionado.estado
                      })
                    }
                  }}
                >
                  {ciudadRow?.map(ciud => {
                    return (
                      <MenuItem key={ciud.id} value={ciud.id}>
                        {ciud.nombre}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='email'
                      name='email'
                      fullWidth
                      required
                      label={t('Email')}
                      value={value}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the email')}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='representante_legal'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('Legal Representative')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the legal representative')}
                      error={Boolean(errors.representante_legal)}
                      aria-describedby='validation-schema-legal-representative'
                      {...(errors.representante_legal && { helperText: errors.representante_legal.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='horario_laboral_inicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='time'
                      value={value}
                      label={t('Start Of Work Day')}
                      onChange={onChange}
                      placeholder={t('Enter the start of work day')}
                      error={Boolean(errors.horario_laboral_inicio)}
                      {...(errors.horario_laboral_inicio && { helperText: errors.horario_laboral_inicio.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='horario_laboral_fin'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='time'
                      value={value}
                      label={t('End Of Work Day')}
                      onChange={onChange}
                      placeholder={t('Enter the end of work day')}
                      error={Boolean(errors.horario_laboral_fin)}
                      {...(errors.horario_laboral_fin && { helperText: errors.horario_laboral_fin.message })}
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
