import { render, screen, fireEvent } from '@testing-library/react'
import Menu from '@/utils/Menu' // Substitua pelo caminho correto do componente

jest.mock('../../assets/logotipo_sgiep.png', () => 'logo.png') // Mock da logo para evitar erros com imports

describe('Menu Component', () => {
  const toggleDrawerMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock de window.location.href para evitar navegação real
    if ((window as any).location) {
      delete (window as any).location;
    }
    (window as any).location = { href: '' };
  })

  it('should render the Menu component', () => {
    render(<Menu isOpen={true} toggleDrawer={toggleDrawerMock} />)

    expect(screen.getByText('SGIEP')).toBeInTheDocument()
    expect(screen.getByAltText('Logo SGIEP')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Agenda do Professor')).toBeInTheDocument()
    expect(screen.getByText('Agenda do Cidadão')).toBeInTheDocument()
  })

  it('should navigate to the correct URLs when menu items are clicked', () => {
    render(<Menu isOpen={true} toggleDrawer={toggleDrawerMock} />)

    fireEvent.click(screen.getByText('Home'))
    expect(toggleDrawerMock).toHaveBeenCalled()
    expect(window.location.href).toBe('/')

    fireEvent.click(screen.getByText('Agenda do Professor'))
    expect(toggleDrawerMock).toHaveBeenCalled()
    expect(window.location.href).toBe('/professorschedule')

    fireEvent.click(screen.getByText('Agenda do Cidadão'))
    expect(toggleDrawerMock).toHaveBeenCalled()
    expect(window.location.href).toBe('/citizenschedule')
  })

  it('should not render the Menu when isOpen is false', () => {
    const { queryByRole } = render(<Menu isOpen={false} toggleDrawer={toggleDrawerMock} />)
    expect(queryByRole('presentation')).toBeNull() // Verifica se o Drawer não está visível
  })
})
