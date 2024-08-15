import { render, screen, fireEvent, within } from '@testing-library/react'
import CitizenSchedule from '@/Pages/CitizenSchedule'

describe('CitizenSchedule Component', () => {
  it('should render the CitizenSchedule with a list of citizens', () => {
    render(<CitizenSchedule />)

    expect(screen.getByText('Prof. João Silva')).toBeInTheDocument()
    expect(screen.getByText('Matemática')).toBeInTheDocument()

    const dateElements = screen.getAllByText('10/10/1991')
    expect(dateElements.length).toBeGreaterThan(0)
  })

  it('should call the add handler when the add button is clicked', () => {
    render(<CitizenSchedule />)

    const addButton = screen.getByRole('button', { name: /adicionar novo professor/i })
    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)
  })

  it('should call handleEdit when the correct edit button is clicked', () => {
    render(<CitizenSchedule />)

    const firstRow = screen.getByText('Prof. João Silva').closest('tr')
    expect(firstRow).toBeInTheDocument()

    const editButton = within(firstRow!).getByRole('button', { name: /edit/i })
    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)
  })

  it('should call handleDelete when the correct delete button is clicked', () => {
    render(<CitizenSchedule />)

    const firstRow = screen.getByText('Prof. João Silva').closest('tr')
    expect(firstRow).toBeInTheDocument()

    const deleteButton = within(firstRow!).getByRole('button', { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)
  })
})
