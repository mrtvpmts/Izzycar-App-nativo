import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RequestContextType {
    vehicleId: string | null;
    serviceId: string | null;
    consultantId: string | null;
    mechanicId: string | null;
    date: Date | null;
    time: string | null;
    setVehicleId: (id: string | null) => void;
    setServiceId: (id: string | null) => void;
    setConsultantId: (id: string | null) => void;
    setMechanicId: (id: string | null) => void;
    setDate: (date: Date | null) => void;
    setTime: (time: string | null) => void;
    resetRequest: () => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [vehicleId, setVehicleId] = useState<string | null>(null);
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [consultantId, setConsultantId] = useState<string | null>(null);
    const [mechanicId, setMechanicId] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);

    const resetRequest = () => {
        setVehicleId(null);
        setServiceId(null);
        setConsultantId(null);
        setMechanicId(null);
        setDate(null);
        setTime(null);
    };

    return (
        <RequestContext.Provider value={{
            vehicleId, serviceId, consultantId, mechanicId, date, time,
            setVehicleId, setServiceId, setConsultantId, setMechanicId, setDate, setTime,
            resetRequest
        }}>
            {children}
        </RequestContext.Provider>
    );
};

export const useRequest = () => {
    const context = useContext(RequestContext);
    if (!context) throw new Error('useRequest must be used within a RequestProvider');
    return context;
};
