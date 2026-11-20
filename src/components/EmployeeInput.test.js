import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EmployeeInput from './EmployeeInput.vue'

describe('EmployeeInput', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  it('renders three employee inputs and an add button', () => {
    const wrapper = mount(EmployeeInput)

    expect(wrapper.findAll('input')).toHaveLength(3)
    expect(wrapper.find('button').text()).toBe('Add Employee')
  })

  it('alerts and does not emit when required fields are missing', async () => {
    const wrapper = mount(EmployeeInput)

    await wrapper.find('button').trigger('click')

    expect(alert).toHaveBeenCalledWith('Please fill all fields')
    expect(wrapper.emitted('add-employee')).toBeUndefined()
  })

  it('does not emit for a zero or negative salary', async () => {
    const wrapper = mount(EmployeeInput)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Amit')
    await inputs[1].setValue('IT')
    await inputs[2].setValue('0')
    await wrapper.find('button').trigger('click')

    expect(alert).toHaveBeenCalledWith('Please fill all fields')
    expect(wrapper.emitted('add-employee')).toBeUndefined()
  })

  it('emits a complete employee and resets the form', async () => {
    const wrapper = mount(EmployeeInput)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Amit')
    await inputs[1].setValue('IT')
    await inputs[2].setValue('50000')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('add-employee')).toEqual([
      [{ name: 'Amit', department: 'IT', salary: 50000 }]
    ])
    expect(inputs[0].element.value).toBe('')
    expect(inputs[1].element.value).toBe('')
    expect(inputs[2].element.value).toBe('')
  })
})
