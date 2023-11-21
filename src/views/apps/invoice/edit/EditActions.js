/*Traducir*/
import { useTranslation } from 'react-i18next'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OptionsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const EditActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }) => {
  const {t}=useTranslation();
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' onClick={toggleSendInvoiceDrawer} sx={{ mb: 2, '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              {t('Send Invoice')}
            </Button>
            <Box sx={{ mb: 2, gap: 4, display: 'flex', alignItems: 'center' }}>
              <Button fullWidth variant='tonal' component={Link} color='secondary' href={`/apps/invoice/preview/${id}`}>
                {t('Preview')}
              </Button>
              <Button fullWidth color='secondary' variant='tonal'>
                {t('Save')}
              </Button>
            </Box>
            <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={toggleAddPaymentDrawer}>
              <Icon fontSize='1.125rem' icon='tabler:currency-dollar' />
              {t('Add Payment')}
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          select
          fullWidth
          label={t('Accept payments via')}
          defaultValue='Internet Banking'
          sx={{
            mb: 4,
            '& .MuiInputLabel-root': {
              fontSize: theme => theme.typography.body1.fontSize,
              lineHeight: theme => theme.typography.body1.lineHeight
            }
          }}
        >
          <MenuItem value='Internet Banking'>{t('Internet Banking')}</MenuItem>
          <MenuItem value='Debit Card'>{t('Debit Card')}</MenuItem>
          <MenuItem value='Credit Card'>{t('Credit Card')}</MenuItem>
          <MenuItem value='Paypal'>{t('Paypal')}</MenuItem>
          <MenuItem value='UPI Transfer'>{t('UPI Transfer')}</MenuItem>
        </CustomTextField>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer', lineHeight: 1.467 }} htmlFor='invoice-edit-payment-terms'>
            {t('Payment Terms')}
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer', lineHeight: 1.467 }} htmlFor='invoice-edit-client-notes'>
            {t('Client Notes')}
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </OptionsWrapper>
        <OptionsWrapper>
          <InputLabel sx={{ cursor: 'pointer', lineHeight: 1.467 }} htmlFor='invoice-edit-payment-stub'>
            {t('Payment Stub')}
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </OptionsWrapper>
      </Grid>
    </Grid>
  )
}

export default EditActions
