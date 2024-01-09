import { useState, useEffect, forwardRef, Fragment } from 'react'
// import Select from 'react-select'
// import Async from 'react-select/async'
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios'
//traduce campo fecha del formulario
import DatePicker, { registerLocale } from "react-datepicker"
import { en } from 'date-fns/locale'
import { es } from 'date-fns/locale'
import { fr } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
registerLocale('en', en);
registerLocale('es', es);
registerLocale('fr', fr);

import "react-datepicker/dist/react-datepicker.css";


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

const endPoint = 'http://127.0.0.1:8000/show_incapacidad/'
const endPoint_sede = 'http://127.0.0.1:8000/show_sede/'
const endPoint_paciente = 'http://127.0.0.1:8000/show_paciente/'
const endPoint_entidad = 'http://127.0.0.1:8000/show_entidades/'

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
      field: 'sede',
      headerName: t('Headquarters')
    },
    // {
    //   flex: 0.25,
    //   minWidth: 230,
    //   field: 'fecha',
    //   headerName: t('Emission date')
    // },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'fecha',
        headerName: t('Emission date'),
        valueFormatter: function(params) {
            return new Date(params.value).toISOString().split('T')[0];
        }
     }, 
    {
        flex: 0.25,
        minWidth: 230,
        field: 'paciente',
        headerName: t('Patient')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'entidad',
        headerName: t('Entity')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'incapacidades_tipos',
        headerName: t('Type of Disabilities')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'dias',
        headerName: t('Days')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'fecha_inicio',
        headerName: t('Start Date'),
        valueFormatter: function(params) {
            return new Date(params.value).toISOString().split('T')[0];
        }
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'fecha_termina',
        headerName: t('End Date'),
        valueFormatter: function(params) {
            return new Date(params.value).toISOString().split('T')[0];
        }
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'servicio',
        headerName: t('Service')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'profesional',
        headerName: t('Professional')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'nombre_usuario',
        headerName: t('User')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'observacion',
        headerName: t('Observation')
    }, 
    {
        flex: 0.25,
        minWidth: 230,
        field: 'rips_modalidad',
        headerName: t('Rips_Modality')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'rips_servicio',
        headerName: t('Rips_Service')
    },
    {
        flex: 0.25,
        minWidth: 230,
        field: 'prorroga',
        headerName: t('Extension')
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
  const [sedeRows, setsedeRows] = useState(null)
  const [pacienteRows, setpacienteRows] = useState(null)
  const [entidadRows, setentidadRows] = useState(null)
  const [pagina, setPage] = useState(0);
  const n = 10000;
  const [numItemsShown, setNumItemsShown] = useState(10);

  const peticionGet = async () => {
    await axios.get(endPoint).then(response => {
      setRows(response.data)
    })
    await axios.get(endPoint_sede).then(response => {
        setsedeRows(response.data)
    })
    await axios.get(endPoint_paciente).then(response => {
        setpacienteRows(response.data)
    })
    await axios.get(endPoint_entidad).then(response => {
        setentidadRows(response.data)
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
    sede: '',
    fecha: '',
    paciente: '',
    entidad: '',
    incapacidades_tipos: '',
    dias: '',
    fecha_inicio: '',
    fecha_termina: '',
    servicio: '',
    profesional: '',
    usuario: '',
    observacion: '',
    rips_modalidad: '',
    rips_servicio: '',
    prorroga: '',
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
    if (deleteRow(registroSeleccionado.id, '/update_incapacidad/')) {
      toast.success(t('Record deleted successfully!'))
      router.push('./incapacidades')
    } else {
      toast.error(t('Error when trying to delete the registry'))
    }
    setOpen(false)
  }

  //** Guardar registro y validar
  const schema = yup.object().shape({
    id: yup.number(),
    sede: yup
    .number()
    .min(1, obj => showErrors(t('headquarters'), obj.value.length, obj.min))
    .required(),
    fecha: yup
    .string()
    .min(1, obj => showErrors(t('emission date'), obj.value.length, obj.min))
    .required(),
    paciente: yup
    .number()
    .min(1, obj => showErrors(t('patient'), obj.value.length, obj.min))
    .required(),
    entidad: yup
    .number()
    .min(1, obj => showErrors(t('entity'), obj.value.length, obj.min))
    .required(),
    incapacidades_tipos: yup
    .number()
    .min(1, obj => showErrors(t('type of disabilities'), obj.value.length, obj.min))
    .required(),
    dias: yup
    .number()
    .min(1, obj => showErrors(t('days'), obj.value.length, obj.min))
    .required(),
    fecha_inicio: yup
    .string()
    .min(1, obj => showErrors(t('start date'), obj.value.length, obj.min))
    .required(),
    fecha_termina: yup
    .string()
    .min(1, obj => showErrors(t('end date'), obj.value.length, obj.min))
    .required(),
    servicio: yup
    .number()
    .min(1, obj => showErrors(t('service'), obj.value.length, obj.min))
    .required(),
    profesional: yup
    .number()
    .min(1, obj => showErrors(t('professional'), obj.value.length, obj.min))
    .required(),
    usuario: yup
    .number()
    .min(1, obj => showErrors(t('user'), obj.value.length, obj.min))
    .required(),
    observacion: yup
    .string()
    .min(1, obj => showErrors(t('observation'), obj.value.length, obj.min))
    .required(),
    rips_modalidad: yup
    .number()
    .min(1, obj => showErrors(t('rips_modality'), obj.value.length, obj.min))
    .required(),
    rips_servicio: yup
    .number()
    .min(1, obj => showErrors(t('rips_service'), obj.value.length, obj.min))
    .required(),
    prorroga: yup
    .string()
    .min(1, obj => showErrors(t('extension'), obj.value.length, obj.min))
    .required(),
    estado: yup.string()
  })

  const defaultValues = {
    sede: '',
    fecha: '',
    paciente: '',
    entidad: '',
    incapacidades_tipos: '',
    dias: '',
    fecha_inicio: '',
    fecha_termina: '',
    servicio: '',
    profesional: '',
    usuario: '',
    observacion: '',
    rips_modalidad: '',
    rips_servicio: '',
    prorroga: '',
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
        alert("error")
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
    if (saveRow(data, '/store_incapacidad/')) {
      toast.success(t('Log saved successfully!'))
      router.push('./incapacidades')
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
    if (saveRow(registroSeleccionado, '/store_incapacidad/')) {
      toast.success(t('Registration successfully updated!'))
      router.push('./incapacidades')
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
      columnVisibilityModel={{ id: false,sede:false,prorroga:false,dias:false,entidad:false,profesional:false,nombre_usuario:false,observacion:false,rips_modalidad:false,rips_servicio:false,paciente:false, create_up: false }}
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

  
  
   
    const handleShowMore = () => {
      setNumItemsShown(prevNum => prevNum + 10);
    };
  return (
    <Card>
      <CardHeader
        title={t('Disabilities')}
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
              <Grid item sm={4} xs={4}>
                <Controller
                  name='sede'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label={t('Headquarters')}
                      SelectProps={{
                        MenuProps,
                        value: value,
                        onChange:onChange
                      }}
                      error={Boolean(errors.sede)}
                      aria-describedby='validation-schema-headquarters'
                      {...(errors.sede && { helperText: errors.sede.message })}
                      >
                      {sedeRows?.map(sed => {
                        return (
                          <MenuItem key={sed.id} value={sed.id}>
                            {sed.nombre}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              {/* <Grid item sm={3} xs={3}>
                <Controller
                  name='paciente'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label={t('Patient')}
                      SelectProps={{
                        MenuProps,
                        value:value,
                        onChange:onChange
                      }}
                      error={Boolean(errors.paciente)}
                      aria-describedby='validation-schema-patient'
                      {...(errors.paciente && { helperText: errors.paciente.message })}
                      >
                      {pacienteRows?.map(pac => { 
                          return (
                          <MenuItem key={pac.id} value={pac.id}>
                            {pac.nombre1}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>  */}
             
{/* <Grid item sm={3} xs={3}>
 <Controller
  name='paciente'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <Select
      options={pacienteRows ? pacienteRows.map(pac => ({ value: pac.id, label: pac.nombre1 })) : []}
      value={value ? { value: value, label: pacienteRows.find(pac => pac.id === value).nombre1 } : null}
      onChange={option => onChange(option.value)}
      isClearable
      placeholder={t('Patient')}
      error={Boolean(errors.paciente)}
      aria-describedby='validation-schema-patient'
      {...(errors.paciente && { helperText: errors.paciente.message })}
    />
  )}
 />
</Grid> */}
{/* <Grid item sm={3} xs={3}>
    {t('Patient')}
 <Controller
 name='paciente'
 control={control}
 rules={{ required: true }}
 render={({ field: { value, onChange } }) => (
   <AutoSizer disableHeight>
     {({ width }) => (
       <List
         height={40} // Ajusta esto a la altura deseada
         itemCount={pacienteRows ? pacienteRows.length : 0}
         itemSize={35} // Ajusta esto al tamaño deseado de cada elemento
         width={width}
       >
         {({ index, style }) => (
           <div style={style}>
             <MenuItem
               selected={value === pacienteRows[index].id}
               onClick={() => onChange(pacienteRows[index].id)}
             >
               {pacienteRows[index].nombre1}
             </MenuItem>
           </div>
         )}
       </List>
     )}
   </AutoSizer>
 )}
 />
</Grid> */}
 {/* <Grid item sm={4} xs={4}>
<Autocomplete
     freeSolo
     options={pacienteRows}
     getOptionLabel={(option) => option.nombre1}
     renderInput={(params) => <TextField {...params} label="Paciente" margin="normal" variant="outlined" />}
   />
   </Grid> */}
   <Grid item sm={3} xs={3}>
     <Controller
       name='paciente'
       control={control}
       rules={{ required: true }}
       render={({ field: { value, onChange } }) => (
         <CustomTextField
           select
           fullWidth
           value={value}
           label={t('Patient')}
           SelectProps={{
             MenuProps,
             value:value,
             onChange:onChange
           }}
           error={Boolean(errors.paciente)}
           aria-describedby='validation-schema-patient'
           {...(errors.paciente && { helperText: errors.paciente.message })}
           >
           {pacienteRows.slice(0, numItemsShown).map(pac => { 
               return (
               <MenuItem key={pac.id} value={pac.id}>
                {pac.nombre1}
               </MenuItem>
             )
           })}
           {numItemsShown < pacienteRows.length && (
             <MenuItem onClick={handleShowMore}>
               Mostrar más
             </MenuItem>
           )}
         </CustomTextField>
       )}
     />
   </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='entidad'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label={t('Entity')}
                      SelectProps={{
                        MenuProps,
                        value:value,
                        onChange:onChange
                      }}
                      error={Boolean(errors.entidad)}
                      aria-describedby='validation-schema-entity'
                      {...(errors.entidad && { helperText: errors.entidad.message })}
                      >
                      {entidadRows?.map(ent => {
                        return (
                          <MenuItem key={ent.id} value={ent.id}>
                            {ent.nombre}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='incapacidades_tipos'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='incapacidades_tipos'
                      fullWidth
                      value={value}
                      label={t('Type of Disabilities')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the type of disabilities')}
                      error={Boolean(errors.incapacidades_tipos)}
                      aria-describedby='validation-schema-type of disabilities'
                      {...(errors.incapacidades_tipos && { helperText: errors.incapacidades_tipos.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={3}>
                <Controller
                  name='dias'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='dias'
                      fullWidth
                      value={value}
                      label={t('Days')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the days')}
                      error={Boolean(errors.dias)}
                      aria-describedby='validation-schema-days'
                      {...(errors.dias && { helperText: errors.dias.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='fecha_inicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='fecha_inicio'
                      fullWidth
                      value={value}
                      label={t('Start Date')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the start date')}
                      error={Boolean(errors.fecha_inicio)}
                      aria-describedby='validation-schema-start date'
                      {...(errors.fecha_inicio && { helperText: errors.fecha_inicio.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='fecha_termina'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='fecha_termina'
                      fullWidth
                      value={value}
                      label={t('End Date')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the end date')}
                      error={Boolean(errors.fecha_termina)}
                      aria-describedby='validation-schema-end date'
                      {...(errors.fecha_termina && { helperText: errors.fecha_termina.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='servicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='servicio'
                      fullWidth
                      value={value}
                      label={t('Service')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the service')}
                      error={Boolean(errors.servicio)}
                      aria-describedby='validation-schema-service'
                      {...(errors.servicio && { helperText: errors.servicio.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='profesional'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='profesional'
                      fullWidth
                      value={value}
                      label={t('Professional')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the professional')}
                      error={Boolean(errors.profesional)}
                      aria-describedby='validation-schema-professional'
                      {...(errors.profesional && { helperText: errors.profesional.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='usuario'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='usuario'
                      fullWidth
                      value={value}
                      label={t('User')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the user')}
                      error={Boolean(errors.usuario)}
                      aria-describedby='validation-schema-user'
                      {...(errors.usuario && { helperText: errors.usuario.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='observacion'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='observacion'
                      fullWidth
                      value={value}
                      label={t('Observation')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the observation')}
                      error={Boolean(errors.observacion)}
                      aria-describedby='validation-schema-observation'
                      {...(errors.observacion && { helperText: errors.observacion.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <Controller
                  name='rips_modalidad'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='rips_modalidad'
                      fullWidth
                      value={value}
                      label={t('Rips_Modality')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the rips_modality')}
                      error={Boolean(errors.rips_modalidad)}
                      aria-describedby='validation-schema-rips_modality'
                      {...(errors.rips_modalidad && { helperText: errors.rips_modalidad.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='rips_servicio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='rips_servicio'
                      fullWidth
                      value={value}
                      label={t('Rips_Service')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the rips_service')}
                      error={Boolean(errors.rips_servicio)}
                      aria-describedby='validation-schema-rips_service'
                      {...(errors.rips_servicio && { helperText: errors.rips_servicio.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='prorroga'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      id='prorroga'
                      fullWidth
                      value={value}
                      label={t('Extension')}
                      inputProps={{ maxLength: 200 }}
                      onChange={onChange}
                      placeholder={t('Enter the extension')}
                      error={Boolean(errors.prorroga)}
                      aria-describedby='validation-schema-extension'
                      {...(errors.prorroga && { helperText: errors.prorroga.message })}
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
              <Grid item sm={3} xs={6}>
              {t('Emission date')}
                <Controller
                name='fecha'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText={t("Emission date")}
                    isClearable
                    showDisabledMonthNavigation
                    disabledKeyboardNavigation
                    locale={i18n.language}
                />
                )}
                />
              </Grid>
              <Grid item sm={3} xs={3}></Grid>
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
                  inputProps={{ maxLength: 200 }}
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
                  inputProps={{ maxLength: 50 }}
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

// AppPage.acl = {
//   action: 'read',
//   subject: 'acl-page'
// }

export default AppPage
