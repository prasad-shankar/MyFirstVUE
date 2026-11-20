import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EmployeeList from './EmployeeList.vue'

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

describe('EmployeeList', () => {
  it('renders the employee list heading and table headers', () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees,
        totalEmployees: 2
      }
    })

    expect(wrapper.find('h3').text()).toBe('Employee List')
    expect(wrapper.findAll('th').map(header => header.text())).toEqual([
      'Employee Name',
      'Department',
      'Salary',
      'Action'
    ])
  })

  it('renders employee details and the total employee count', () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees,
        totalEmployees: 2
      }
    })

    const rows = wrapper.findAll('tbody tr')

    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('Shankar')
    expect(rows[0].text()).toContain('UI Development')
    expect(rows[0].text()).toContain('90000')
    expect(rows[1].text()).toContain('Amit')
    expect(wrapper.text()).toContain('Total Employees: 2')
  })

  it('shows a loading state instead of the employee table', () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees: [],
        loading: true,
        totalEmployees: 0
      }
    })

    expect(wrapper.text()).toContain('Loading employees...')
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('renders an error message', () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees: [],
        error: 'Failed to fetch employees',
        totalEmployees: 0
      }
    })

    expect(wrapper.text()).toContain('Failed to fetch employees')
  })

  it('shows a message when no employees are found', () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees: [],
        totalEmployees: 0
      }
    })

    expect(wrapper.text()).toContain('No employees found.')
  })

  it('emits the employee id when Delete is clicked', async () => {
    const wrapper = mount(EmployeeList, {
      props: {
        employees,
        totalEmployees: 2
      }
    })

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('delete-employee')).toBeTruthy()
    expect(wrapper.emitted('delete-employee')[0]).toEqual([1])
  })
})