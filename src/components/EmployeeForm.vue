
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '../stores/employeeStore'

import EmployeeInput from './EmployeeInput.vue'
import EmployeeList from './EmployeeList.vue'

const employeeStore = useEmployeeStore()

const searchText = ref('')

const filteredEmployees = computed(() => {
  return employeeStore.employees.filter(emp =>
    emp.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const addEmployee = async (employee) => {
  try {
    await employeeStore.addEmployee(employee)
  } catch (error) {
    alert(error.message)
  }
}

const deleteEmployee = async (id) => {
  try {
    await employeeStore.deleteEmployee(id)
  } catch (error) {
    alert(error.message)
  }
}

onMounted(() => {
  employeeStore.fetchEmployees()
})
</script>

<template>
  <div class="container">
    <h2>Employee Management</h2>

    <EmployeeInput @add-employee="addEmployee" />

    <h3>Search Employee</h3>

    <div class="search-section">
      <input
        v-model="searchText"
        placeholder="Search employee..."
      />
    </div>

    <EmployeeList
      :employees="filteredEmployees"
      :loading="employeeStore.loading"
      :error="employeeStore.error"
      :total-employees="employeeStore.totalEmployees"
      @delete-employee="deleteEmployee"
    />
  </div>
</template>

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