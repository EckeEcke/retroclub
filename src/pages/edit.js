import ThemeDropdown from '../components/ThemeDropdown'
import EditList from '../components/EditList'

function IndexPage() {
  return (
    <div class="container">
        <ThemeDropdown />
        <h2>Bewertungen bearbeiten</h2>
        <EditList />
  </div>
  )
}

export default IndexPage