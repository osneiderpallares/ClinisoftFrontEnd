import { useState } from 'react'

// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useRouter } from 'next/router'

const moduls = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='Información Básica de Terceros' />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-1'
                aria-controls='panel-content-1'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                {/* <Icon fontSize='1.25rem' icon='tabler:file-info' /> */}
                <Typography>Infomación Personal</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fragment>
                  <List component='nav' aria-label='main mailbox'>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/propiedad-did')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Propiedad de Identificación' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Tipos de Identificación' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Género' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Identidad Género' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Ocupación' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Escolaridad' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Estado civil' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Grupos poblacionales' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Grupo Étnico' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Comunidad Étnica' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Discapacidad' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Grupo Sanguineo' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Parentesco' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Causa Muerte' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Fragment>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-1'
                aria-controls='panel-content-1'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                {/* <Icon fontSize='1.25rem' icon='tabler:file-info' /> */}
                <Typography>Profesionales</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fragment>
                  <List component='nav' aria-label='main mailbox'>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Profesionales' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Especialidades' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Tipos de profesionales' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:mail' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary='Servicios Profesionales' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Fragment>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-1'
                aria-controls='panel-content-1'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                {/* <Icon fontSize='1.25rem' icon='tabler:file-info' /> */}
                <Typography sx={{ color: 'text.secondary' }}>Ubicación</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Departamentos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Ciudades' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Barrio' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Zona Residencial' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Estrato' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='Información de Afiliación' />
          <CardContent>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipo Afiliación' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipo de usuario' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Nivel salarial' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipo Paciente' />
                </ListItemButton>
              </ListItem>
            </List>
          </CardContent>
          {/* <CardActions className='card-action-dense'>
            <Button>Read More</Button>
          </CardActions> */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='Facturación' />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Entidades</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Entidades' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Entidades Contrato' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='PLanes Entidad' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Entidades IPS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Entidad IPS' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Contrato IPS' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Servicios</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Servicios' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Servicios Grupos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Servicios Tipos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Paquetes Servicios' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='Notas Médicas' />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Agendas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Agenda' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Agendas Grupo' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipos de Cita' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipos de Consulta' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Lugar de atención' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipo de Admisión' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Modalidad de Atención' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Vias de Ingreso' />
                </ListItemButton>
              </ListItem>
            </List>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Indices</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Grupo Indice' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Indices Calidad de Vida' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='tabler:mail' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Turnos Digitales' />
                </ListItemButton>
              </ListItem>
            </List>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Incapacidades</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Incapacidades' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Incapacidades Tipo' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Diagnósticos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Diagnostico' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Diagnósticos Grupos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Diagnósticos Tipos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Estadio' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Tipos Tratamientos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Entidad que Diagnostica' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Forma de Diagnóstico' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>CAC</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Motivos Histología' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Histologías' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Bases Dx Diferenciaciones' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Objetivos de Tratamientos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Objetivos de Intervenciones' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Her2 Resultados' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='ColonRec Estadificación' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Hematologicos Estadificación' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Prostata Gleason' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Leucemia Clasificada' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Estado Fin Tto' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Motivos Fin Tto' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Quimioterapia Fases' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Tipos Tratamientos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Resultado Final' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Novedad Administratica' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Novedad Clinica' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Rtx Estados  Fin Tratamientos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Rtx Motivos Fin Tratamientos' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Medicamentos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Medicamentos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Medicamentos Grupos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Medicamentos Clases' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Medicamentos Temperaturas' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Presentaciones' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Unidades' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Formas Farmacéuticas' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Vias de aplicación' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Colores' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Laboratorios' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Grupos Terapeuticos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Vehiculos' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Insumos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Insumos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Insumos Grupos' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Insumos Tipo Riesgos' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='Seguridad' />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>Usuarios</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:mail' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Usuarios' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
moduls.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default moduls
