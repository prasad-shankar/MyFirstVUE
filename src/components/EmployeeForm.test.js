import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import EmployeeForm from './EmployeeForm.vue'

describe('EmployeeForm Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should render employee management heading', () => {
    const wrapper = mount(EmployeeForm, {
      global: {
        plugins: [createPinia()]
      }
    })

    expect(wrapper.find('h2').text()).toBe('Employee Management')
  })

  it('should load employees on mount', async () => {
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

    const wrapper = mount(EmployeeForm, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Shankar')
    expect(wrapper.text()).toContain('90000')
  })

  it('should search employee by name', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'Shankar',
          department: 'UI Development',
          salary: 90000
        },
        {
          id: 2,
          name: 'Rahul',
          department: 'QA',
          salary: 50000
        }
      ]
    })

    const wrapper = mount(EmployeeForm, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    const searchInput = wrapper.findAll('input')[3]

    await searchInput.setValue('Shankar')

    expect(wrapper.text()).toContain('Shankar')
    expect(wrapper.text()).not.toContain('Rahul')
  })

  it('should add employee', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 5,
          name: 'Amit',
          department: 'IT',
          salary: 50000
        })
      })

    const wrapper = mount(EmployeeForm, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Amit')
    await inputs[1].setValue('IT')
    await inputs[2].setValue('50000')

    await wrapper.find('button.button-big').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toContain('Amit')
    expect(wrapper.text()).toContain('50000')
  })

  it('should delete employee', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'Shankar',
            department: 'UI Development',
            salary: 90000
          }
        ]
      })
      .mockResolvedValueOnce({
        ok: true
      })

    const wrapper = mount(EmployeeForm, {
      global: {
        plugins: [createPinia()]
      }
    })

    await flushPromises()

    await wrapper.find('button.button-small').trigger('click')

    await flushPromises()

    expect(wrapper.text()).not.toContain('Shankar')
  })
})