
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-employee'])

const employee = ref({
  name: '',
  department: '',
  salary: null
})

const submitEmployee = () => {
  if (
    !employee.value.name ||
    !employee.value.department ||
    employee.value.salary == null ||
    employee.value.salary <= 0
  ) {
    alert('Please fill all fields')
    return
  }

  emit('add-employee', { ...employee.value })

  employee.value = {
    name: '',
    department: '',
    salary: null
  }
}
</script>

<template>
  <div class="form-section">
    <input v-model="employee.name" placeholder="Employee Name" />
    <input v-model="employee.department" placeholder="Department" />
    <input
      v-model.number="employee.salary"
      type="number"
      placeholder="Salary"
    />

    <button class="button-big" @click="submitEmployee">
      Add Employee
    </button>
  </div>
</template>
