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

    <table border="0.5">
        <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
        </tr>
        <tr
            v-for="emp in filteredEmployees"
            :key="emp.id"
        >
            <td>{{ emp.name }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.salary }}</td>
            <td>
                <button class="button-small" @click="deleteEmployee(emp.id)">
                    Delete
                </button>
            </td>
        </tr>

    </table>

    <p>Total Employees: {{ employees.length }}</p>
  </div>
</template>

<script>
export default {
  name: "EmployeeForm",

  data() {
    return {
      employee: {
        name: "",
        department: "",
        salary: null
      },

      searchText: "",

      employees: [
        {
          id: 1,
          name: "Shankar",
          department: "UI Development",
          salary: 90000
        },
        {
          id: 2,
          name: "Preety",
          department: "UI Development",
          salary: 100000
        },
        {
          id: 3,
          name: "Rahul",
          department: "UI Development",
          salary: 12000
        },
        {
          id: 4,
          name: "Rakesh",
          department: "QA",
          salary: 55000
        }
      ]
    };
  },

  computed: {
    filteredEmployees() {
      return this.employees.filter(emp =>
        emp.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    }
  },

  methods: {
    addEmployee() {
      if (
        !this.employee.name ||
        !this.employee.department ||
        !this.employee.salary
      ) {
        alert("Please fill all fields");
        return;
      }

      this.employees.push({
        id: Date.now(),
        ...this.employee
      });

      this.employee = {
        name: "",
        department: "",
        salary: null
      };
    },

    deleteEmployee(id) {
      this.employees = this.employees.filter(
        emp => emp.id !== id
      );
    }
  }
};
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