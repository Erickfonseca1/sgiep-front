import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '@/Pages/Home'
import { getActivities } from '@/Services/activities'
import { getProfessors } from '@/Services/professors'
import { getCitizens } from '@/Services/citizens'
import { BrowserRouter } from 'react-router-dom'

jest.mock('@/Services/activities', () => ({
  getActivities: jest.fn(),
}))

jest.mock('@/Services/professors', () => ({
  getProfessors: jest.fn(),
}))

jest.mock('@/Services/citizens', () => ({
  getCitizens: jest.fn(),
}))

const mockActivities = [{ id: 1, name: 'Futebol' }]
const mockProfessors = [{ id: 1, name: 'Professor A' }]
const mockCitizens = [{ id: 1, name: 'Cidadão A' }]

describe('Home Component', () => {
  beforeEach(() => {
    if ((window as any).location) {
      delete (window as any).location
    }
    ;(window as any).location = { href: '' }
    ;(getActivities as jest.Mock).mockResolvedValue(mockActivities)
    ;(getProfessors as jest.Mock).mockResolvedValue(mockProfessors)
    ;(getCitizens as jest.Mock).mockResolvedValue(mockCitizens)
  })

  it('should navigate to activities page when "Ver Atividades" button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>,
      )
    })

    const activitiesButton = screen.getByText('Ver Atividades')
    fireEvent.click(activitiesButton)

    expect(window.location.href).toContain("/activities")
  })

  it('should navigate to professor schedule page when "Agenda Professor" button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>,
      )
    })

    const professorButton = screen.getByText('Agenda Professor')
    fireEvent.click(professorButton)

    expect(window.location.href).toContain("/professorschedule")
  })

  it('should navigate to citizen schedule page when "Agenda Cidadão" button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>,
      )
    })

    const citizenButton = screen.getByText('Agenda Cidadão')
    fireEvent.click(citizenButton)

    expect(window.location.href).toContain("/citizenschedule")
  })

  // const handleNavigateTo = (route: string) => {
  //   window.location.href = route
  // }

  it('should navigate to the correct URLs when menu items are clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>,
      )
    })

    const activitiesButton = screen.getByText('Ver Atividades')
    fireEvent.click(activitiesButton)

    expect(window.location.href).toContain("/activities")

    const professorButton = screen.getByText('Agenda Professor')
    fireEvent.click(professorButton)

    expect(window.location.href).toContain("/professorschedule")

    const citizenButton = screen.getByText('Agenda Cidadão')
    fireEvent.click(citizenButton)

    expect(window.location.href).toContain("/citizenschedule")
  })
})
