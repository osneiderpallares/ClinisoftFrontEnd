/*Traducir*/
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
//import { t } from 'i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  const {t}=useTranslation()
  // ** Props 
  const { plan, handlePlanChange, handleFilter, value } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('Search User')}
          onChange={e => handleFilter(e.target.value)}
        />
        <CustomTextField
          select
          value={plan}
          sx={{ mr: 2, mb: 2}}
          defaultValue={t('Select Plan')}
          SelectProps={{displayEmpty: true, value: plan, onChange: e => handlePlanChange(e),style: { minWidth: '160px' } }}
        >
          <MenuItem value=''>{t('Select Plan')}</MenuItem>
          <MenuItem value='basic'>{t('Basic')}</MenuItem>
          <MenuItem value='company'>{t('Company')}</MenuItem>
          <MenuItem value='enterprise'>{t('Enterprise')}</MenuItem>
          <MenuItem value='team'>{t('Team')}</MenuItem>
        </CustomTextField>
      </Box>
    </Box>
  )
}

export default TableHeader
