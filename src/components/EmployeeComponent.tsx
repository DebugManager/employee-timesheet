import React from 'react';
import { useEmployee } from '../context/EmployeeContexts';
import { Link } from 'react-router-dom';

function EmployeeList() {
    const { employees } = useEmployee();
    console.log(employees);

    return (
        <div>
            <h2>Список співробітників</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>
                                <Link to={`/employee/${employee.id}`}>{employee.firstName}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
