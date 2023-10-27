import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContexts';
import { useParams } from 'react-router-dom';

type Timesheet = {
    id: string;
    assessment: number;
    month?: string;
    breakMinutes: number;
    minutes: number;
    startTime: string;
    endTime: string;
    note: string | null;
    status: string;
    locationChecked: boolean;
    approvalPersonId: string | null;
    userId: string;
    companyId: string;
};

const availableMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function convertUTCDateToLocalDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

function TimesheetDetail() {
    const { employees, timesheets } = useEmployee();
    const { employeeId } = useParams<{ employeeId: string }>();

    const [selectedMonth, setSelectedMonth] = useState<string>('');

    if (!employeeId) {
        return <div>User not found</div>;
    }

    const employee = employees.find((emp) => emp.id === employeeId);

    if (!employee) {
        return <div>User not found</div>;
    }

    const filterTimesheetsByMonth = (timesheets: Timesheet[], selectedMonth: string) => {
        selectedMonth = selectedMonth.toLowerCase();
        return selectedMonth === '' ? timesheets : timesheets.filter((ts) => {
            const tsDate = new Date(ts.startTime);
            const tsMonth = availableMonths[tsDate.getMonth()].toLowerCase();
            return tsMonth === selectedMonth;
        });
    }

    const employeeTimesheets = filterTimesheetsByMonth(timesheets, selectedMonth);

    return (
        <div>
            <h2>Date data for {employee.firstName} {employee.lastName}</h2>

            <div>
                <label>Choose month </label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All months</option>
                    {availableMonths.map((month, index) => (
                        <option key={index} value={month.toLowerCase()}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeTimesheets.map((timesheet) => (
                        <tr key={timesheet.startTime}>
                            <td>{convertUTCDateToLocalDate(timesheet.startTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TimesheetDetail;
