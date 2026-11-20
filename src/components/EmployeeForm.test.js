import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import EmployeeForm from './EmployeeForm.vue'

const employees = [
  {
    id: 1,
    name: 'Shankar',
    department: 'UI Development',
    salary: 90000
  },
  {
    id: 2,
    name: 'Amit',
    department: 'IT',
    salary: 50000
  }
]

describe('EmployeeForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
    vi.stubGlobal('alert', vi.fn())
  })

  it('renders the employee management heading', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })

    const wrapper = mount(EmployeeForm)

    expect(wrapper.find('h2').text()).toBe('Employee Management')
  })

  it('fetches and renders employees on mount', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => employees
    })

    const wrapper = mount(EmployeeForm)

    await flushPromises()

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/employees')
    expect(wrapper.text()).toContain('Shankar')
    expect(wrapper.text()).toContain('Amit')
  })

  it('filters employees by name', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => employees
    })

    const wrapper = mount(EmployeeForm)

    await flushPromises()

    await wrapper.find('input[placeholder="Search employee..."]').setValue('Amit')

    expect(wrapper.text()).toContain('Amit')
    expect(wrapper.text()).not.toContain('Shankar')
  })

  it('adds an employee through the employee input', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 3,
          name: 'Rahul',
          department: 'QA',
          salary: 60000
        })
      })

    const wrapper = mount(EmployeeForm)

    await flushPromises()

    const inputs = wrapper.findAll('.form-section input')
    await inputs[0].setValue('Rahul')
    await inputs[1].setValue('QA')
    await inputs[2].setValue('60000')
    await wrapper.find('button.button-big').trigger('click')
    await flushPromises()

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Rahul',
          department: 'QA',
          salary: 60000
        })
      })
    )
    expect(wrapper.text()).toContain('Rahul')
  })

  it('deletes an employee', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [employees[0]]
      })
      .mockResolvedValueOnce({
        ok: true
      })

    const wrapper = mount(EmployeeForm)

    await flushPromises()
    await wrapper.find('button.button-small').trigger('click')
    await flushPromises()

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/employees/1',
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(wrapper.text()).not.toContain('Shankar')
  })

  it('shows an alert when adding an employee fails', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockResolvedValueOnce({
        ok: false
      })

    const wrapper = mount(EmployeeForm)

    await flushPromises()

    const inputs = wrapper.findAll('.form-section input')
    await inputs[0].setValue('Amit')
    await inputs[1].setValue('IT')
    await inputs[2].setValue('50000')
    await wrapper.find('button.button-big').trigger('click')
    await flushPromises()

    expect(alert).toHaveBeenCalledWith('Failed to add employee')
  })
})
