import { render, screen, fireEvent } from '@testing-library/react'
import App from '@/App'

describe('App Component', () => {
  it('should toggle the drawer when TopBar toggle button is clicked', () => {
    render(<App />)
    const toggleButton = screen.getByRole('button', { name: /menu/i })
    expect(toggleButton).toBeInTheDocument()
    fireEvent.click(toggleButton)
  })
})
