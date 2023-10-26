import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [isNameSortable, setIsNameSortable] = useState(true)
  const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const columns = [
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Nombre',
      field: 'nombre',
      sortable: isNameSortable,
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.start_date}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Nombre de usuario',
      field: 'nombre_usuario',
      sortable: isNameSortable,
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.start_date}
        </Typography>
      )
    }
  ]

  const fetchUsers = async (start = 0, end = 10) => {
    const response = await axios.get('http://127.0.0.1:8000/api/login/')
    console.log(response.data.slice(start, end))
    setData(response.data.slice(start, end))
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='App'>
      <Card>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </div>
  )
}

App.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default App
