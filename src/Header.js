const Header = ({title}) => {
  return (
    <header style={{
      backgroundColor: 'mediumblue',
      color: '#fff'
    }}>
      <h1>Groceries List</h1>
      <h2>{title}</h2>
    </header>
  )
}

Header.defaultProps = {
  title: 'No Body Here!'
}
export default Header
