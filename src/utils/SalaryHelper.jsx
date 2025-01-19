

export const columns = [
  {
    name: '$ NO',
    selector: (row) => row.sno,
    center: 'true'
  },
  {
    name: 'EMP ID',
    selector: (row) => row.employeeId,
    sortable: true,
    center: 'true'
  },
  {
    name: 'SALARY',
    selector: (row) => row.basicSalary,
    center: 'true'
  },
  {
    name: 'ALLOWANCES',
    selector: (row) => row.allowances,
    center: 'true',
  },
  {
    name: 'DEDUCTIONS',
    selector: (row) => row.deductions,
    center: 'true',
  },
  {
    name: 'TOTAL',
    selector: (row) => row.netSalary,
    center: 'true',
  },
  {
    name: 'PAY DATE',
    selector: (row) => row.payDate,
    center: 'true'
  },
]