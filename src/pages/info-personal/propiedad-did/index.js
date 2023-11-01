import { useState, useEffect, forwardRef, Fragment } from 'react'

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

//import TableBasic from 'src/pages/info-personal/propiedad-did/table/index.js'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Fab from '@mui/material/Fab'
import { right } from '@popperjs/core'

//import { textAlign } from '@mui/system'
import { CardContent, TextField } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { savePropiedadDid } from './peticiones.js'
import { deletePropiedadDid } from './peticiones.js'
import { getPropiedadDid } from './peticiones.js'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const baseURL = 'http://127.0.0.1:8000/show_prodid/'

//const baseUrl = process.env.REACT_APP_BASE_URL

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
  //DataGrid
  const [rows, setRows] = useState(null)

  const peticionGet = async () => {
    await axios.get(baseURL).then(response => {
      setRows(response.data)
    })
  }
  useEffect(() => {
    peticionGet()
  }, [])

  const [show, setShow] = useState(false)

  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [languages, setLanguages] = useState([])

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
      field: 'estado_nombre',
      headerName: 'ESTADO'
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'acciones',
      headerName: 'Acciones',

      renderCell: params => {
        return (
          <Grid container spacing={2}>
            <Grid item sm={4} xs={4}>
              <Fab color='warning' aria-label='Editar' size='small' onClick={() => Edit(params)}>
                <Icon icon='tabler:pencil' />
              </Fab>
            </Grid>
            <Grid item sm={4} xs={4}>
              <Fab color='error' aria-label='Eliminar' size='small' onClick={() => Delete(params)}>
                <Icon icon='tabler:trash' />
              </Fab>
            </Grid>
          </Grid>
        )
      }
    }
  ]

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

  //Eliminar registro
  const [registroSeleccionado, setRegistroSeleccionado] = useState({
    id: null,
    nombre: '',
    abreviacion: '',
    estado: '1'
  })

  const handleChange = e => {
    const [name, value] = e.target
    setRegistroSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // const [id, setId] = useState(null)
  // const [nombre, setNombre] = useState('')
  // const [abreviacion, setAbreviacion] = useState('')
  // const [estado, setEstado] = useState('')

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
    if (deletePropiedadDid(registroSeleccionado.id)) {
      toast.success('Registro eliminado correctamente!')
    }
    setOpen(false)
    axios.get(baseURL).then(response => {
      setRows(response.data)
    })
  }

  //Editar registro
  const [modoEdit, setModoEdit] = useState(false)

  const Edit = params => {
    setModoEdit(true)
    setShow(true)

    setRegistroSeleccionado(params.row)
    console.log(params.row)

    // setId(params.row.id)
    // setNombre(params.row.nombre)
    // setAbreviacion(params.row.abreviacion)
    // setEstado(params.row.estado)
  }

  //Guardar registro y validar
  const schema = yup.object().shape({
    nombre: yup
      .string()
      .min(3, obj => showErrors('nombre', obj.value.length, obj.min))
      .required(),
    abreviacion: yup
      .string()
      .min(1, obj => showErrors('abreviacion', obj.value.length, obj.min))
      .required(),
    estado: yup.string()
  })

  // const defaultValues = {
  //   nombre: '',
  //   abreviacion: '',
  //   estado: '1'
  // }

  const openModal = () => {
    registroSeleccionado.id = null
    setModoEdit(false)

    // setId(null)
    // setNombre('')
    // setAbreviacion('')
    // setEstado('1')
    setShow(true)
  }

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `El campo ${field} es requerido`
    } else if (valueLen > 0 && valueLen < min) {
      return `El campo ${field} al menos debe tener ${min} caracteres`
    } else {
      return ''
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // //defaultValues,
    //handleChange,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    setShow(false)
    if (modoEdit) {
      data.id = registroSeleccionado.id
    }
    console.log(data)
    if (registroSeleccionado.id != null) {
      if (savePropiedadDid(data)) {
        axios.get(baseURL).then(response => {
          setRows(response.data)
        })
        toast.success('Registro actualizado correctamente!')
        setModoEdit(false)
      } else {
        toast.error('Hubo un error al actualizar el registro')
        setModoEdit(false)
      }
    } else {
      if (savePropiedadDid(data)) {
        axios.get(baseURL).then(response => {
          setRows(response.data)
        })
        toast.success('Registro guardado correctamente!')
      } else {
        toast.error('Hubo un error al guardar el registro')
      }
    }
  }

  if (!rows) return null

  return (
    <Card>
      <CardHeader title='Propiedad DID' />
      <CardContent>
        <Box sx={{ textAlign: right }}>
          <Fab color='primary' aria-label='add' size='small' onClick={openModal}>
            <Icon icon='tabler:plus' />
          </Fab>
        </Box>
        <Box sx={{ height: 500 }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
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
                Ingresar Registro Propiedad DID
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Ingresa la información requerida</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={6}>
                <Controller
                  name='id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value = registroSeleccionado && registroSeleccionado.id, onChange } }) => (
                    <input type='text' value={value} onChange={onChange}></input>
                  )}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value = registroSeleccionado && registroSeleccionado.nombre, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nombre'
                      onChange={onChange}
                      placeholder='Escriba Nombre'
                      error={Boolean(errors.nombre)}
                      aria-describedby='validation-schema-nombre'
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
                  render={({
                    field: { value = registroSeleccionado && registroSeleccionado.abreviacion, onChange }
                  }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Abreviación'
                      onChange={onChange}
                      placeholder='Escriba Abreviación'
                      error={Boolean(errors.abreviacion)}
                      aria-describedby='validation-schema-abreviacion'
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
                  render={({ field: { value = registroSeleccionado && registroSeleccionado.estado, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Estado'
                      SelectProps={{
                        value: value,
                        onChange: onChange
                      }}
                      id='estado'
                      error={Boolean(errors.estado)}
                      aria-describedby='validation-basic-estado'
                      {...(errors.estado && { helperText: 'Este campo es requerido' })}
                    >
                      <MenuItem value='1'>Activo</MenuItem>
                      <MenuItem value='2'>Inactivo</MenuItem>
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
              Guardar
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
            <DialogContentText id='alert-dialog-description'>¿Desea eliminar el registro?</DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button onClick={handleSi}>Si</Button>
            <Button onClick={handleNo}>No</Button>
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
