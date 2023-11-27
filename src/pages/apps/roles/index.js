/*Traducir*/
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import RoleCards from 'src/views/apps/roles/RoleCards'

const RolesComponent = () => {
  const {t}=useTranslation()
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4' sx={{ mb: 6 }}>
           {t('Roles List')}
          </Typography>
        }
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            A role provided access to predefined menus and features so that depending on <br /> assigned role an
            administrator can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12}>
        <RoleCards />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
