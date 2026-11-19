import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useEmployeeStore } from './employeeStore'

describe('Employee Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn()
  })

  it('should fetch employees successfully', async () => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Shankar',
        department: 'UI Development',
        salary: 90000
      }
    ]

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockEmployees
    })

    const store = useEmployeeStore()

    await store.fetchEmployees()

    expect(store.employees).toEqual(mockEmployees)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees'
    )
    expect(store.loading).toBe(false)
  })

  it('should add employee successfully', async () => {
    const newEmployee = {
      name: 'Amit',
      department: 'IT',
      salary: 50000
    }

    const savedEmployee = {
      id: 5,
      ...newEmployee
    }

    fetch.mockResolvedValue({
      ok: true,
      json: async () => savedEmployee
    })

    const store = useEmployeeStore()

    await store.addEmployee(newEmployee)

    expect(store.employees).toContainEqual(savedEmployee)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees',
      expect.objectContaining({
        method: 'POST'
      })
    )
  })

  it('should delete employee successfully', async () => {
    const store = useEmployeeStore()

    store.employees = [
      { id: 1, name: 'Shankar' },
      { id: 2, name: 'Amit' }
    ]

    fetch.mockResolvedValue({
      ok: true
    })

    await store.deleteEmployee(1)

    expect(store.employees).toHaveLength(1)
    expect(store.employees[0].id).toBe(2)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees/1',
      expect.objectContaining({
        method: 'DELETE'
      })
    )
  })

  it('should return total employee count', () => {
    const store = useEmployeeStore()

    store.employees = [
      { id: 1, name: 'Shankar' },
      { id: 2, name: 'Amit' }
    ]

    expect(store.totalEmployees).toBe(2)
  })

  it('should handle fetch API failure', async () => {
    fetch.mockRejectedValue(new Error('Network error'))

    const store = useEmployeeStore()

    await store.fetchEmployees()

    expect(store.error).toBe('Network error')
    expect(store.loading).toBe(false)
  })
})