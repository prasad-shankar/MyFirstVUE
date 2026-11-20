
<script setup>
defineProps({
  employees: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  error: String,
  totalEmployees: Number
})

const emit = defineEmits(['delete-employee'])
</script>

<template>
  <h3>Employee List</h3>

  <p v-if="loading">Loading employees...</p>
  <p v-if="error">{{ error }}</p>

  <table v-if="!loading">
    <thead>
      <tr>
        <th>Employee Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="emp in employees" :key="emp.id">
        <td>{{ emp.name }}</td>
        <td>{{ emp.department }}</td>
        <td>{{ emp.salary }}</td>
        <td>
          <button
            class="button-small"
            @click="emit('delete-employee', emp.id)"
          >
            Delete
          </button>
        </td>
      </tr>

      <tr v-if="employees.length === 0">
        <td colspan="4">No employees found.</td>
      </tr>
    </tbody>
  </table>

  <p>Total Employees: {{ totalEmployees }}</p>
</template>
