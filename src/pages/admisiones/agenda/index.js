const AppPage = () => {
  return <h2>Página para agenda</h2>
}

AppPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AppPage
