import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

const baseURL = 'http://127.0.0.1:8000/show_prodid/'

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
    field: 'estado',
    headerName: 'ESTADO'
  }
]

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const AppPage = () => {
  const [rows, setRows] = useState(null)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setRows(response.data)
    })
  }, [setRows])

  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

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

  if (!rows) return null

  return (
    <Card>
      <CardHeader title='Propiedad DID' />
      <Box sx={{ height: 500 }}>
        <DataGrid
          autoHeight
          columns={columns}
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          slots={{ toolbar: QuickSearchToolbar }}
          onPaginationModelChange={setPaginationModel}
          rows={rows}
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
    </Card>
  )
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
