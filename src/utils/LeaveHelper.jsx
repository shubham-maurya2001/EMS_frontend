import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: '$ NO',
    selector: (row) => row.sno,
    width: '70px',
    center: 'true',
  },
  {
    name: 'LEAVE TYPE',
    selector: (row) => row.leaveType,
    width: '150px',
    center: 'true',
  },
  {
    name: 'FROM',
    selector: (row) => row.startDate,
    width: '100px',
    center: 'true',
  },
  {
    name: 'TO',
    selector: (row) => row.endDate,
    width: '100px',
    center: 'true',
  },
  {
    name: 'DESCRIPTION',
    selector: (row) => row.reason,
    width: '120px',
    center: 'true',
  },
  {
    name: 'APPLIED DATE',
    selector: (row) => row.appliedAt,
    width: '150px',
    center: 'true',
  },
  {
    name: 'STATUS',
    selector: (row) => row.status,
    center: 'true',
  },
];


export const leaveColumns = [
  {
    name: '$ No',
    selector: (row) => row.sno,
    center: 'true',
    width: '70px',
  },
  {
    name: 'NAME',
    selector: (row) => row.name,
    center: 'true',
    width: '120px',
  },
  {
    name: 'EMP ID',
    selector: (row) => row.employeeId,
    center: 'true',
    width: '120px',
  },
  {
    name: 'LEAVE TYPE',
    selector: (row) => row.leaveType,
    center: 'true',
    width: '140px',
  },
  {
    name: 'DEPARTMENT',
    selector: (row) => row.department,
    center: 'true',
    width: '170px',
  },
  {
    name: 'DAYS',
    selector: (row) => row.days,
    center: 'true',
    width: '80px',
    sortable: true
  },
  {
    name: 'STATUS',
    selector: (row) => row.status,
    center: 'true',
    width: '120px',
  },
  {
    name: 'ACTION',
    selector: (row) => row.action,
    center: 'true',
  },
];


export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button className="px-4 py-1 bg-cyan-500 text-white rounded-md hover:bg-cyan-700"
      onClick={() => handleView(Id)}>View</button>
  );
};