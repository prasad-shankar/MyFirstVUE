<template>
  <div class="container">
    <h2>Employee Management</h2>

    <!-- Employee Form -->
    <div class="form-section">
      <input
        v-model="employee.name"
        placeholder="Employee Name"
      />

      <input
        v-model="employee.department"
        placeholder="Department"
      />

      <input
        v-model.number="employee.salary"
        type="number"
        placeholder="Salary"
      />

      <button class="button-big" @click="addEmployee">
        Add Employee
      </button>
    </div>

    <!-- Search -->
    <h3>Search Employee</h3>

    <div class="search-section">
      <input
        v-model="searchText"
        placeholder="Search employee..."
      />
    </div>

    <!-- Employee List -->
    <h3>Employee List</h3>

    <p v-if="employeeStore.loading">
      Loading employees...
    </p>

    <p v-if="employeeStore.error">
      {{ employeeStore.error }}
    </p>

    <table border="0.5" v-if="!employeeStore.loading">

    <!-- Table Header -->
    <thead>
      <tr>
        <th>Employee Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Action</th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody>
      <tr
        v-for="emp in filteredEmployees"
        :key="emp.id"
      >
        <td>{{ emp.name }}</td>
        <td>{{ emp.department }}</td>
        <td>{{ emp.salary }}</td>
        <td>
          <button
            class="button-small"
            @click="deleteEmployee(emp.id)"
          >
            Delete
          </button>
        </td>
      </tr>

      <!-- Empty State -->
      <tr v-if="filteredEmployees.length === 0">
        <td colspan="4">
          No employees found.
        </td>
      </tr>
    </tbody>

  </table>

    <p>Total Employees: {{ employeeStore.totalEmployees }}</p>
  </div>
</template>

<script>
import { useEmployeeStore } from '../stores/employeeStore'

export default {
  name: 'EmployeeForm',

  data() {
    return {
      employee: {
        name: '',
        department: '',
        salary: null
      },

      searchText: ''
    }
  },

  computed: {
    employeeStore() {
      return useEmployeeStore()
    },

    filteredEmployees() {
      return this.employeeStore.employees.filter(emp =>
        emp.name.toLowerCase().includes(
          this.searchText.toLowerCase()
        )
      )
    }
  },

  mounted() {
    this.employeeStore.fetchEmployees()
  },

  methods: {
    async addEmployee() {
      if (
        !this.employee.name ||
        !this.employee.department ||
        !this.employee.salary
      ) {
        alert('Please fill all fields')
        return
      }

      try {
        await this.employeeStore.addEmployee({
          name: this.employee.name,
          department: this.employee.department,
          salary: this.employee.salary
        })

        this.employee = {
          name: '',
          department: '',
          salary: null
        }
      } catch (error) {
        alert(error.message)
      }
    },

    async deleteEmployee(id) {
      try {
        await this.employeeStore.deleteEmployee(id)
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style>
.container {
  width: 1024px;
  margin: auto;
  font-family: Arial;
}

input {
  margin: 5px;
  padding: 8px;
}

button {
  margin-left: 10px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
  padding: 4px 16px;
}

th, td {
  padding: 8px;
}

.button-big {
  padding: 8px 16px;
}

.button-small {
  padding: 4px 8px;
}
</style>