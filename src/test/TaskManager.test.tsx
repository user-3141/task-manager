import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import TaskManager from '../components/TaskManager'

// Reset localStorage before each test
beforeEach(() => {
  localStorage.clear()
})

describe('TaskManager', () => {
  it('renders the header', () => {
    render(<TaskManager />)
    expect(screen.getByText(/Menedżer Zadań/i)).toBeInTheDocument()
  })

  it('allows adding a task', async () => {
    render(<TaskManager />)

    const input = screen.getByPlaceholderText(/Dodaj nowe zadanie/i)
    const addButton = screen.getByLabelText('Add task')

    await userEvent.type(input, 'Nowe zadanie')
    fireEvent.click(addButton)

    expect(screen.getByText('Nowe zadanie')).toBeInTheDocument()
  })

  it('marks a task as completed', async () => {
    render(<TaskManager />)

    const input = screen.getByPlaceholderText(/Dodaj nowe zadanie/i)
    const addButton = screen.getByLabelText('Add task')

    await userEvent.type(input, 'Zadanie testowe')
    fireEvent.click(addButton)

    const toggleButton = screen.getByLabelText('Toggle task')
    fireEvent.click(toggleButton)

    expect(screen.getByText('Zadanie testowe')).toHaveClass('line-through')
  })

  it('deletes a task', async () => {
    render(<TaskManager />)

    const input = screen.getByPlaceholderText(/Dodaj nowe zadanie/i)
    const addButton = screen.getByLabelText('Add task')

    await userEvent.type(input, 'Do usunięcia')
    fireEvent.click(addButton)

    const deleteButton = screen.getByLabelText('Delete task') // Trash button
    fireEvent.click(deleteButton)

    expect(screen.queryByText('Do usunięcia')).not.toBeInTheDocument()
  })

  it('filters tasks correctly', async () => {
    render(<TaskManager />)

    const input = screen.getByPlaceholderText(/Dodaj nowe zadanie/i)
    const addButton = screen.getByLabelText('Add task')

    // Add one completed and one active task
    await userEvent.type(input, 'Zrobione')
    fireEvent.click(addButton)
    const toggleButton = screen.getAllByLabelText('Toggle task')[0]
    fireEvent.click(toggleButton)

    await userEvent.type(input, 'Do zrobienia')
    fireEvent.click(addButton)

    // Switch to completed
    fireEvent.click(screen.getByLabelText('completed'))
    expect(screen.getByText('Zrobione')).toBeInTheDocument()
    expect(screen.queryByText('Do zrobienia')).not.toBeInTheDocument()

    // Switch to active
    fireEvent.click(screen.getByLabelText('active'))
    expect(screen.getByText('Do zrobienia')).toBeInTheDocument()
    expect(screen.queryByText('Zrobione')).not.toBeInTheDocument()
  })
})
