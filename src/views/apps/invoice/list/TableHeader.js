/*Traducir*/
import { useTranslation } from 'react-i18next'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  const {t}=useTranslation();
  // ** Props
  const { value, selectedRows, handleFilter } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CustomTextField
        select
        defaultValue={t('Actions')}
        sx={{ mr: 4, mb: 2 }}
        SelectProps={{
           displayEmpty: true,
           disabled: selectedRows && selectedRows.length === 0,
          //  renderValue: selected => (selected?.length === 0 ? t('Actions') : selected)
          renderValue: selected => t('Actions') 
        }}
      >
        <MenuItem disabled value='Actions'>
          {t('Actions')}
        </MenuItem>
        <MenuItem value={t('Delete')}>{t('Delete')}</MenuItem>
        <MenuItem value={t('Edit')}>{t('Edit')}</MenuItem>
        <MenuItem value={t('Send')}>{t('Send')}</MenuItem>
      </CustomTextField>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('Search Invoice')}
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} component={Link} variant='contained' href='/apps/invoice/add'>
          {t('Create Invoice')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
