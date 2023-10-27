import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import users from '../data/users.json';
import timesheetsData from '../data/timesheets.json';

type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    phone: string;
    roleId: number;
    managerId: string | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    subDepartment: { id: string; title: string } | null;
    manager: {
        id: string;
        firstName: string;
        lastName: string;
        archivedAt: string | null;
        email: string;
        phone: string;
        position: string;
        avatar: {
            link: string;
        } | null;
    };
    avatar: {
        link: string;
    };
    department: {
        id: string;
        title: string;
        managerId: string;
    };
    group: null;
    division: null;
};


type Timesheet = {
    id: string;
    assessment: number;
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

type EmployeeContextType = {
    employees: Employee[];
    timesheets: Timesheet[];
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const employeesData: Employee[] = users.map(user => {
        return {
            id: user.id || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            position: user.position || '',
            phone: user.phone || '',
            roleId: user.roleId || 0,
            managerId: user.managerId || '',
            address: user.address || '',
            postalCode: user.postalCode || '',
            city: user.city || '',
            country: user.country || '',
            subDepartment: user.subDepartment || null,
            manager: {
                id: user.manager?.id || '',
                firstName: user.manager?.firstName || '',
                lastName: user.manager?.lastName || '',
                archivedAt: user.manager?.archivedAt || '',
                email: user.manager?.email || '',
                phone: user.manager?.phone || '',
                position: user.manager?.position || '',
                avatar: {
                    link: user.manager?.avatar?.link || '',
                },
            },
            avatar: {
                link: user.avatar.link || '',
            },
            department: {
                id: user.department.id || '',
                title: user.department.title || '',
                managerId: user.department.managerId || '',
            },
            group: null,
            division: null,
        };
    });

    const [employees, setEmployees] = useState<Employee[]>(employeesData);

    const [timesheets, setTimesheets] = useState<Timesheet[]>(timesheetsData);


    return (
        <EmployeeContext.Provider value={{ employees, timesheets }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployee() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployee must be used within an EmployeeProvider');
    }
    return context;
}
