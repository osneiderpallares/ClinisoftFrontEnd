import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Tab,
  TextField,
  Typography
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useRouter } from 'next/router'
import axios from 'axios'

import calcularDV from 'src/@fake-db/funciones/calcular-dv'
import toast from 'react-hot-toast'

import { saveRow } from 'src/@fake-db/requests/peticiones.js'

import { handleValid } from 'src/@fake-db/table/constants'

const AppPage = ({}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [value, setValue] = useState('details')
  const [disabled, setDisabled] = useState(true)

  const [tiposDid, setTiposDid] = useState(null)
  const [company, setCompany] = useState(null)
  const [responsabilidadRow, setResponsabilidadRow] = useState(null)

  const [error, setError] = useState({
    nombre: '',
    razon_social: '',
    abreviacion: '',
    tipo_did: '',
    did: '',
    digito_verificacion: '',
    persona: '',
    fe_pass_correo: '',
    fe_tipo_servidor: '',
    codigo_rips: '',
    representante_legal: '',
    did_rp: '',
    email: '',
    responsabilidad: ''
  })

  const [responsabilidades, setResponsabilidades] = useState([])

  const peticionGet = async () => {
    await axios.get('http://127.0.0.1:8000/show_empresa/').then(response => {
      setCompany(response.data[0])
      setResponsabilidades(response.data[0].resp_codigo?.split(','))
    })
    await axios.get('http://127.0.0.1:8000/show_tiposdid/').then(response => {
      setTiposDid(response.data)
    })
    await axios.get('http://127.0.0.1:8000/show_responsabilidad/').then(response => {
      setResponsabilidadRow(response.data)
    })
  }
  useEffect(() => {
    peticionGet()
  }, [])

  const handleClickCalculate = did => {
    let isNitValid = did >>> 0 === parseFloat(did) ? true : false
    if (isNitValid) {
      company.digito_verificacion = calcularDV(did)
      setError({
        nombre: error.nombre,
        razon_social: error.razon_social,
        abreviacion: error.abreviacion,
        did: '',
        digito_verificacion: '',
        fe_pass_correo: error.fe_pass_correo,
        fe_tipo_servidor: error.fe_tipo_servidor,
        codigo_rips: error.codigo_rips,
        representante_legal: error.representante_legal,
        did_rp: error.did_rp,
        email: error.email,
        responsabilidad: error.responsabilidad
      })
    } else {
      company.digito_verificacion = 0
      setError({
        nombre: error.nombre,
        razon_social: error.razon_social,
        abreviacion: error.abreviacion,
        did: `${t(`The NIT ${did} is not valid`)}`,
        digito_verificacion: `${t('The DV does not correspond to the reported NIT')}`,
        fe_pass_correo: error.fe_pass_correo,
        fe_tipo_servidor: error.fe_tipo_servidor,
        codigo_rips: error.codigo_rips,
        representante_legal: error.representante_legal,
        did_rp: error.did_rp,
        email: error.email,
        responsabilidad: error.responsabilidad
      })
    }
  }

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleCancel = () => {
    setDisabled(!disabled)
    peticionGet()
    setError({
      nombre: '',
      razon_social: '',
      abreviacion: '',
      tipo_did: '',
      did: '',
      digito_verificacion: '',
      persona: '',
      fe_pass_correo: '',
      fe_tipo_servidor: '',
      codigo_rips: '',
      representante_legal: '',
      did_rp: '',
      email: '',
      responsabilidad: ''
    })
  }

  function validaciones() {
    let invoice = [`${t('password')}`, `${t('email')}`, `${t('server')}`]
    let representative = [`${t('representative')}`, `${t('code')}`]

    let detail = [
      `${t('tradename')}`,
      `${t('name')}`,
      `${t('abbreviation')}`,
      `${t('company')}`,
      `${t('NIT')}`,
      `${t('responsibility')}`
    ]

    for (let i in error) {
      if (error[i]) {
        toast.error(t(`Error: ${error[i]}`))

        for (let j in invoice) {
          let contained = error[i].includes(invoice[j])
          if (contained) {
            setValue('invoicing')

            return true
          }
        }
        for (let j in representative) {
          let contained = error[i].includes(representative[j])
          if (contained) {
            setValue('legal-representative')

            return true
          }
        }
        for (let j in detail) {
          let contained = error[i].includes(detail[j])
          if (contained) {
            setValue('details')

            return true
          }
        }
      }
    }

    return false
  }

  const onSubmit = e => {
    e.preventDefault()

    //**Calcular el dv si el NIT está correcto */
    handleClickCalculate(company.did)

    if (validaciones() == false) {
      if (saveRow(company, '/store_empresa/')) {
        toast.success(t('Registration successfully updated!'))
      } else {
        toast.error(t('Error updating registry'))
      }

      setDisabled(!disabled)
    }
  }

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

  if (!company) return null

  if (!tiposDid) return null

  if (!responsabilidadRow) return null

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='details' label={t('Details')} />
          <Tab value='legal-representative' label={t('Legal Representative')} />
          <Tab value='invoicing' label={t('Invoicing')} />
        </TabList>
        <form onSubmit={onSubmit}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='details'>
              <Grid container spacing={5}>
                <input name='id' type='hidden' value={company.id} disabled></input>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    name='nombre'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Tradename')}
                    value={company.nombre}
                    inputProps={{ maxLength: 200 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: e.target.value,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.nombre = e.target.value ? '' : `${t('The tradename is required')}`
                    }}
                    placeholder={t('Enter the tradename')}
                    error={Boolean(error.nombre)}
                    {...(error.nombre && { helperText: error.nombre })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    name='razon_social'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Business Name')}
                    value={company.razon_social}
                    inputProps={{ maxLength: 200 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: e.target.value,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.razon_social = e.target.value ? '' : `${t('The name is required')}`
                    }}
                    placeholder={t('Enter the business name')}
                    error={Boolean(error.razon_social)}
                    {...(error.razon_social && { helperText: error.razon_social })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    name='abreviacion'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Abbreviation')}
                    value={company.abreviacion}
                    inputProps={{ maxLength: 20 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: e.target.value,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.abreviacion = e.target.value ? '' : `${t('The abbreviation is required')}`
                    }}
                    placeholder={t('Enter the abbreviation')}
                    error={Boolean(error.abreviacion)}
                    {...(error.abreviacion && { helperText: error.abreviacion })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    select
                    fullWidth
                    label={t('ID Type')}
                    disabled={disabled ? true : false}
                    id='tipo_did'
                    name='tipo_did'
                    SelectProps={{
                      MenuProps,
                      value: company.tipo_did,
                      onChange: e => {
                        setCompany({
                          id: company.id,
                          nombre: company.nombre,
                          razon_social: company.razon_social,
                          abreviacion: company.abreviacion,
                          tipo_did: e.target.value,
                          did: company.did,
                          digito_verificacion: company.digito_verificacion,
                          persona: company.persona,
                          regimen: company.regimen,
                          estado: company.estado,
                          representante_legal: company.representante_legal,
                          tipo_did_rp: company.tipo_did_rp,
                          did_rp: company.did_rp,
                          codigo_rips: company.codigo_rips,
                          fe_correo: company.fe_correo,
                          fe_pass_correo: company.fe_pass_correo,
                          fe_tipo_servidor: company.fe_tipo_servidor,
                          responsabilidad: company.responsabilidad
                        })
                      }
                    }}
                  >
                    {tiposDid?.map(tipoDid => {
                      return (
                        <MenuItem key={tipoDid.id} value={tipoDid.id}>
                          {tipoDid.nombre}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    id='did'
                    name='did'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Id')}
                    value={company.did}
                    inputProps={{ maxLength: 9 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: e.target.value,
                        digito_verificacion: handleClickCalculate(e.target.value),
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                    }}
                    placeholder={t('Enter company id')}
                    error={Boolean(error.did)}
                    {...(error.did && { helperText: error.did })}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <CustomTextField
                    id='digito_verificacion'
                    name='digito_verificacion'
                    fullWidth
                    type='number'
                    required
                    disabled={disabled ? true : false}
                    label={t('DV')}
                    value={company.digito_verificacion || 0}
                    readOnly={true}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: (e.target.value = Math.max(0, e.target.value).toString().slice(0, 2)),
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                    }}
                    placeholder={t('Enter the dv')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Tooltip title={t('Calculate dv')}>
                            <IconButton
                              edge='end'
                              onClick={() => handleClickCalculate(company.did)}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <Icon fontSize='1.25rem' icon='entypo:calculator' />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(error.digito_verificacion)}
                    {...(error.digito_verificacion && { helperText: error.digito_verificacion })}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ color: 'text.secondary' }}>{t('Person')}</Typography>
                  <RadioGroup
                    row
                    value={company.persona}
                    name='persona'
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: e.target.value,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                    }}
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label={t('Legal')}
                      disabled={disabled ? true : false}
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label={t('Natural')}
                      disabled={disabled ? true : false}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ color: 'text.secondary' }}>{t('Regime')}</Typography>
                  <RadioGroup
                    row
                    value={company.regimen}
                    name='regimen'
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: e.target.value,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                    }}
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label={t('Responsible IVA')}
                      disabled={disabled ? true : false}
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label={t('Not Responsible IVA')}
                      disabled={disabled ? true : false}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    select
                    required
                    fullWidth
                    disabled={disabled ? true : false}
                    label={t('Responsibility')}
                    id='responsabilidad'
                    name='responsabilidad'
                    SelectProps={{
                      MenuProps,
                      multiple: true,
                      value: responsabilidades,
                      onChange: e => {
                        setCompany({
                          id: company.id,
                          nombre: company.nombre,
                          razon_social: company.razon_social,
                          abreviacion: company.abreviacion,
                          tipo_did: company.tipo_did,
                          did: company.did,
                          digito_verificacion: company.digito_verificacion,
                          persona: company.persona,
                          regimen: company.regimen,
                          estado: company.estado,
                          representante_legal: company.representante_legal,
                          tipo_did_rp: company.tipo_did_rp,
                          did_rp: company.did_rp,
                          codigo_rips: company.codigo_rips,
                          fe_correo: company.fe_correo,
                          fe_pass_correo: company.fe_pass_correo,
                          fe_tipo_servidor: company.fe_tipo_servidor,
                          responsabilidad: e.target.value
                        })
                        setResponsabilidades(e.target.value)
                        error.responsabilidad =
                          e.target.value.length != 0 ? '' : `${t('The responsibility is required')}`
                      },
                      renderValue: selected => selected.join(',')
                    }}
                    error={Boolean(error.responsabilidad)}
                    {...(error.responsabilidad && { helperText: error.responsabilidad })}
                  >
                    {responsabilidadRow?.map(o => (
                      <MenuItem key={o.id} value={o.codigo}>
                        <Checkbox checked={responsabilidades?.indexOf(o.codigo) > -1} />
                        <ListItemText primary={o.codigo + ' ' + o.nombre} />
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    select
                    fullWidth
                    id='estado'
                    name='estado'
                    label={t('State')}
                    disabled={disabled ? true : false}
                    SelectProps={{
                      value: company.estado,
                      onChange: e => {
                        setCompany({
                          id: company.id,
                          nombre: company.nombre,
                          razon_social: company.razon_social,
                          abreviacion: company.abreviacion,
                          tipo_did: company.tipo_did,
                          did: company.did,
                          digito_verificacion: company.digito_verificacion,
                          persona: company.persona,
                          regimen: company.regimen,
                          estado: e.target.value,
                          representante_legal: company.representante_legal,
                          tipo_did_rp: company.tipo_did_rp,
                          did_rp: company.did_rp,
                          codigo_rips: company.codigo_rips,
                          fe_correo: company.fe_correo,
                          fe_pass_correo: company.fe_pass_correo,
                          fe_tipo_servidor: company.fe_tipo_servidor,
                          responsabilidad: company.responsabilidad
                        })
                      }
                    }}
                  >
                    <MenuItem value='1'>{t('Active')}</MenuItem>
                    <MenuItem value='2'>{t('Inactive')}</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='legal-representative'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label={t('ID Type')}
                    disabled={disabled ? true : false}
                    name='tipo_did_rp'
                    SelectProps={{
                      MenuProps,
                      value: company.tipo_did_rp,
                      onChange: e => {
                        setCompany({
                          id: company.id,
                          nombre: company.nombre,
                          razon_social: company.razon_social,
                          abreviacion: company.abreviacion,
                          tipo_did: company.tipo_did,
                          did: company.did,
                          digito_verificacion: company.digito_verificacion,
                          persona: company.persona,
                          regimen: company.regimen,
                          estado: company.estado,
                          representante_legal: company.representante_legal,
                          tipo_did_rp: e.target.value,
                          codigo_rips: company.codigo_rips,
                          fe_correo: company.fe_correo,
                          fe_pass_correo: company.fe_pass_correo,
                          fe_tipo_servidor: company.fe_tipo_servidor,
                          responsabilidad: company.responsabilidad
                        })
                      }
                    }}
                  >
                    {tiposDid?.map(tipoDid => {
                      return (
                        <MenuItem key={tipoDid.id} value={tipoDid.id}>
                          {tipoDid.nombre}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CustomTextField
                    id='did_rp'
                    name='did_rp'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Id')}
                    value={company.did_rp}
                    inputProps={{ maxLength: 9 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: e.target.value,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.did_rp = e.target.value
                        ? ''
                        : `${t('Identification of the legal representative is required')}`
                    }}
                    placeholder={t('Enter the id')}
                    error={Boolean(error.did_rp)}
                    {...(error.did_rp && { helperText: error.did_rp })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    name='representante_legal'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t("Representative's name")}
                    value={company.representante_legal}
                    inputProps={{ maxLength: 200 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: e.target.value,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.representante_legal = e.target.value
                        ? ''
                        : `${t('The name of the legal representative is required')}`
                    }}
                    placeholder={t('Enter the name of the legal representative')}
                    error={Boolean(error.representante_legal)}
                    {...(error.representante_legal && { helperText: error.representante_legal })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    id='codigo_rips'
                    name='codigo_rips'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('SGSSS Code')}
                    value={company.codigo_rips}
                    inputProps={{ maxLength: 20 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: e.target.value,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.codigo_rips = e.target.value ? '' : `${t('The SGSSS Code is required')}`
                    }}
                    placeholder={t('Enter the sgsss code')}
                    error={Boolean(error.codigo_rips)}
                    {...(error.codigo_rips && { helperText: error.codigo_rips })}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='invoicing'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={5}>
                  <CustomTextField
                    id='fe_correo'
                    name='fe_correo'
                    fullWidth
                    type='email'
                    required
                    disabled={disabled ? true : false}
                    label={t('Invoice Email')}
                    value={company.fe_correo}
                    inputProps={{ maxLength: 100 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: e.target.value,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.email = t(`${handleValid(e.target.value)}`)
                    }}
                    placeholder={t('Enter the invoice email')}
                    error={Boolean(error.email)}
                    {...(error.email && { helperText: error.email })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    id='fe_pass_correo'
                    name='fe_pass_correo'
                    fullWidth
                    type='password'
                    required
                    disabled={disabled ? true : false}
                    label={t('Password Email')}
                    value={company.fe_pass_correo}
                    inputProps={{ maxLength: 40 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: e.target.value,
                        fe_tipo_servidor: company.fe_tipo_servidor,
                        responsabilidad: company.responsabilidad
                      })
                      error.fe_pass_correo = e.target.value ? '' : `${t('The password email is required')}`
                    }}
                    placeholder={t('Enter the password email')}
                    error={Boolean(error.fe_pass_correo)}
                    {...(error.fe_pass_correo && { helperText: error.fe_pass_correo })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    id='fe_tipo_servidor'
                    name='fe_tipo_servidor'
                    fullWidth
                    required
                    disabled={disabled ? true : false}
                    label={t('Server Type')}
                    value={company.fe_tipo_servidor}
                    inputProps={{ maxLength: 40 }}
                    onChange={e => {
                      setCompany({
                        id: company.id,
                        nombre: company.nombre,
                        razon_social: company.razon_social,
                        abreviacion: company.abreviacion,
                        tipo_did: company.tipo_did,
                        did: company.did,
                        digito_verificacion: company.digito_verificacion,
                        persona: company.persona,
                        regimen: company.regimen,
                        estado: company.estado,
                        representante_legal: company.representante_legal,
                        tipo_did_rp: company.tipo_did_rp,
                        did_rp: company.did_rp,
                        codigo_rips: company.codigo_rips,
                        fe_correo: company.fe_correo,
                        fe_pass_correo: company.fe_pass_correo,
                        fe_tipo_servidor: e.target.value,
                        responsabilidad: company.responsabilidad
                      })
                      error.fe_tipo_servidor = e.target.value ? '' : `${t('The server type is required')}`
                    }}
                    placeholder={t('Enter the server type')}
                    error={Boolean(error.fe_tipo_servidor)}
                    {...(error.fe_tipo_servidor && { helperText: error.fe_tipo_servidor })}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button type='submit' sx={{ mr: 2 }} variant='contained' color='success' disabled={disabled ? true : false}>
              {t('Save')}
            </Button>
            <Button
              sx={{ mr: 2 }}
              variant='contained'
              color='warning'
              disabled={disabled ? false : true}
              onClick={() => setDisabled(!disabled)}
            >
              {t('Edit')}
            </Button>
            <Button
              type='reset'
              variant='contained'
              color='secondary'
              disabled={disabled ? true : false}
              onClick={handleCancel}
            >
              {t('Cancel')}
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
