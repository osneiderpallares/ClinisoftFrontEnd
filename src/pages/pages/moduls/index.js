/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

//** Elegir Idioma
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title={t('Basic Third-Party Information')} />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-1'
                aria-controls='panel-content-1'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                {/* <Icon fontSize='1.25rem' icon='tabler:file-info' /> */}
                <Typography>{t('Personal Information')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fragment>
                  <List component='nav' aria-label='main mailbox'>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/propiedad-did')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:user-circle' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Property of Identification')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/tipo-did')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:account-card-details' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Types of Identification')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/genero')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:gender-male-female' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Gender')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/identidad-genero')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:gender-transgender' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Gender Identity')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/ocupacion_grupo')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:worker' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Group Occupations')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/ocupacion')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:worker-outline' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Occupation')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/escolaridad')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:account-school' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Education Level')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/estado-civil')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:account-file-text' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Civil Status')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/grupo-poblacional')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:nature-people' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Population Groups')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/grupo-etnico')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='mdi:nature-people-outline' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Ethnic Group')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/comunidad-etnica')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='healthicons:i-groups-perspective-crowd' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Ethnic Community')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/discapacidad')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='medical-icon:accessibility' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Disability')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/grupo-sanguineo')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='ph:drop-fill' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Blood Type')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/parentesco')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='game-icons:relationship-bounds' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Relationship')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../info-personal/causa-muerte')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='tabler:ribbon-health' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Cause of Death')} />
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
                <Typography>{t('Professionals')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fragment>
                  <List component='nav' aria-label='main mailbox'>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../profesionales/profesional')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='medical-icon:i-medical-library' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Professionals')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../profesionales/especialidad')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='fluent-emoji-high-contrast:medical-symbol' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Specialties')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => handleDropdownClose('../profesionales/profesional-tipo')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='wpf:medical-doctor' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Types of professionals')} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      onClick={() => handleDropdownClose('../profesionales/profesional-servicio')}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon icon='medical-icon:interpreter-services' fontSize={20} />
                        </ListItemIcon>
                        <ListItemText primary={t('Professional Services')} />
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
                <Typography sx={{ color: 'text.secondary' }}>{t('Location')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../ubicacion/departamento')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tdesign:map-location' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Departments')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../ubicacion/ciudad')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='mdi:home-city' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Cities')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../ubicacion/barrio')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='material-symbols-light:location-home-rounded' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Neighborhood')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../ubicacion/zona-residencial')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='mdi:home-map-marker' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Residence Area')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../ubicacion/estrato')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='streamline:decent-work-and-economic-growth-solid' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Socioeconomic Levels')} />
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
          {/* <CardHeader title='Información de Afiliación' /> */}
          <CardHeader title={t('Affiliation Information')} />
          <CardContent>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../Afiliacion/tipo-afiliacion')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='mdi:wallet-membership' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Membership Type')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../Afiliacion/tipo-usuario')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='mdi:account-group' fontSize={20} />
                  </ListItemIcon>
                  {/* <ListItemText primary='Tipo de usuario' /> */}
                  <ListItemText primary={t('User type')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../Afiliacion/nivel-salarial')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='mdi:account-cash' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Salary level')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../Afiliacion/tipo-paciente')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='healthicons:outpatient' fontSize={20} />
                  </ListItemIcon>
                  {/* <ListItemText primary='Tipo Paciente' /> */}
                  <ListItemText primary={t('Patient Type')} />
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
          {/* <CardHeader title='Facturación' /> */}
          <CardHeader title={t('Billing')} />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-3'
                aria-controls='panel-content-3'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>{t('Entities')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='arcticons:sparkasse-s-identity' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Entities')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='mdi:subscriber-identity-module-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Contracting entities')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:entitlement-redemption' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Entity Plans')} />
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
                <Typography>{t('IPS Entities')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:lookup-entities' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('IPS Entity')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='teenyicons:contract-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('IPS Agreement')} />
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
                <Typography>{t('Services')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='ic:baseline-medical-services' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Services')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='medical-icon:social-services' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Service Groups')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='carbon:service-id' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Service Types')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='arcticons:services' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Service Packages')} />
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
          {/* <CardHeader title='Notas Médicas' /> */}
          <CardHeader title={t('Medical Notes')} />
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
                <ListItem disablePadding onClick={() => handleDropdownClose('../agenda/agenda')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:calendar-agenda' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Agenda' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../agenda/agenda/agenda-medica')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:calendar-agenda' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary='Agenda Médica' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../agenda/grupo-agenda')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='arcticons:todoagenda' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Group Agenda')} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/tipo-cita')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='streamline:waiting-appointments-calendar-solid' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Appointment Types')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/tipo-consulta')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='icon-park-outline:history-query' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Types of Consultation')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/lugar-atencion')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ic:baseline-note-add' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Healthcare location')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/tipo-admisiones')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='healthicons:admissions-negative' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Type of Admission')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/modalidad-atencion')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='guidance:care-staff-area' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Care Modality')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/vias-ingreso')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='maki:entrance-alt1' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Entrance pathways')} />
                </ListItemButton>
              </ListItem>
            </List>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>{t('Index')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../indices/grupo-indice')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='dashicons:index-card' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Index Group')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../indices/indices-calidad-vida')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='game-icons:life-bar' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Quality of Life Indices')} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../notas-medicas/turnos')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='game-icons:turnstile' fontSize={20} />
                  </ListItemIcon>
                  {/* <ListItemText primary='Turnos Digitales' /> */}
                  <ListItemText primary={t('Digital Appointments')} />
                </ListItemButton>
              </ListItem>
            </List>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                {/* <Typography>Incapacidades</Typography> */}
                <Typography>{t('Disabilities')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../incapacidades/incapacidades')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fontisto:paralysis-disability' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Disabilities')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../incapacidades/incapacidades-tipo')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='streamline:lift-disability-solid' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Type of Disabilities')} />
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
                {/* <Typography>Diagnósticos</Typography> */}
                <Typography>{t('Diagnoses')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/diagnosticos')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='material-symbols-light:diagnosis-outline-rounded' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Diagnoses')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/diagnosticos-grupos')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:diagnostic-data-bar-tooltip' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Diagnostic Groups')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/diagnosticos-tipos')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='streamline:medical-search-diagnosis' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Diagnostic Types')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='pajamas:unstage-all' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Stage')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/tipos-tratamientos')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:health-data-sync-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Treatment Types')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/entidad-diagnostica')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fa6-solid:kit-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Diagnosing Entity')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../diagnosticos/forma-diagnostico')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='bi:file-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Diagnostic Method')} />
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
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/motivos-histologia')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:malaria-pv-microscope' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Histology Reasons')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/histologia')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='icon-park-solid:microscope' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Histologies')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/bases-dx-diferenciaciones')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:medical-records-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Differential Dx Bases')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/objetivos-de-tratamientos')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='bi:file-earmark-medical-fill' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Treatment Objectives')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/objetivos-intervenciones')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fa6-solid:notes-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Intervention Objectives')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/her2-resultados')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='carbon:result-new' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Her2 Results')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/colonrec-estadificacion')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='carbon:result-old' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('ColonRec Staging')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/hematologicos-estadificacion')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='pajamas:search-results' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Hematological Staging')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/prostata-gleason')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:virus-research-alt-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Prostate Gleason')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/leucemia-clasificada')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:health-worker-form' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Classified Leukemia')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/estado-fin-tto')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='uil:medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('End of Treatment Status')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/motivos-fin-tto')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='uil:file-medical-alt' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Reasons For End of Treatment')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../cac/quimioterapia-fases')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='game-icons:medical-drip' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Chemotherapy Phases')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fa-solid:hand-holding-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Treatment Types')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='carbon:result-draft' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Final Result')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='tabler:report' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Administrative Novelty')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='bi:file-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Clinical novelty')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='uil:medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Rtx End Of Treatment States')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='uil:file-medical-alt' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Rtx Reasons for Treatment Completion')} />
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
                {/* <Typography>Medicamentos</Typography> */}
                <Typography>{t('Medicaments')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='game-icons:medicines' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Medicaments')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='solar:document-medicine-outline' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Drug Groups')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='covid:vaccine-protection-medicine-pill' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Drug Classes')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='carbon:temperature-max' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Drug Temperatures')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='arcticons:medicinkortet' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Presentations')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='covid:vaccine-protection-medicine-pill' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Units')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='game-icons:medicine-pills' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Pharmaceutical Forms')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='icon-park-solid:medicine-bottle' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Routes of Administration')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='gis:color' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Colors')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='healthicons:biochemistry-laboratory' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Laboratories')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fluent-mdl2:grouped-list' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Therapeutic Groups')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='material-symbols:medical-services-sharp' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Vehicles')} />
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
                {/* <Typography>Insumos</Typography> */}
                <Typography>{t('Medical Supplies')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fa6-solid:suitcase-medical' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Medical Supplies')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='medical-icon:medical-records' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Supply Groups')} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='fa6-solid:house-medical-circle-exclamation' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Risk Type Supplies')} />
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
          {/* <CardHeader title='Seguridad' /> */}
          <CardHeader title={t('Security')} />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>{t('Users')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../admisiones/admision')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='pixelarticons:users' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Users')} />
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
          {/* <CardHeader title='Seguridad' /> */}
          <CardHeader title={t('Company')} />
          <CardContent>
            <Accordion>
              <AccordionSummary
                id='panel-header-2'
                aria-controls='panel-content-2'
                expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
              >
                <Typography>{t('Company')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component='nav' aria-label='main mailbox'>
                  <ListItem disablePadding onClick={() => handleDropdownClose('../empresas/empresa')}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon icon='mdi:company' fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary={t('Company')} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding onClick={() => handleDropdownClose('../empresas/sede')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='pixelarticons:git-branch' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={t('Campus')} />
                </ListItemButton>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
// moduls.acl = {
//   action: 'read',
//   subject: 'acl-page'
// }

export default moduls
