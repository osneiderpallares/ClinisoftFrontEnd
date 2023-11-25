const AppPage = () => {
  return <h2>Página para profesionales</h2>
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
