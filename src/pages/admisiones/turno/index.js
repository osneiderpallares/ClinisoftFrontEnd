const AppPage = () => {
  return <h2>Página para turnos</h2>
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
