import { defineStore } from 'pinia'

const API_URL = 'http://localhost:3000/employees'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    loading: false,
    error: null
  }),

  getters: {
    totalEmployees: (state) => state.employees.length
  },

  actions: {
    // GET employees
    async fetchEmployees() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch employees')
        }

        this.employees = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    // POST employee
    async addEmployee(employee) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(employee)
        })

        if (!response.ok) {
          throw new Error('Failed to add employee')
        }

        const newEmployee = await response.json()

        this.employees.push(newEmployee)
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    // DELETE employee
    async deleteEmployee(id) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Failed to delete employee')
        }

        this.employees = this.employees.filter(
          emp => emp.id !== id
        )
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})