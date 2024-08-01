import { useCallback, useEffect, useState } from "react";
import { StudentInterface, StudentPayload, StudentService } from "src/service/StudentService";

export function useStudents(offset?: number, limit?: number) {
    const [studentsArray, setStudentsArray] = useState<StudentInterface[]>([]);
    const [students, setStudents] = useState<StudentInterface | undefined>(undefined);
    const [information, setInformation] = useState<string | undefined>(undefined);

    const getAll = useCallback(async () => {
        try {
            const response = await StudentService.getAll(offset, limit);
            setStudentsArray(response.data); // Set the state with fetched data
        } catch (error) {
            console.error("Failed to fetch students", error);
        }
    }, [offset, limit]); // Added dependencies

    const getOne = useCallback(async (id: number) => {
        try {
            const response = await StudentService.getOne(id);
            setStudents(response.data); // Set the state with fetched data
        } catch (error) {
            console.error("Failed to fetch student", error);
        }
    }, []);

    const postStudent = useCallback(async (element: StudentPayload) => {
        try {
            const response = await StudentService.post(element);
            const { data, status } = response;
            if (status === 200) setInformation(data);
        } catch (error) {
            //@ts-ignore
            setInformation(error.message || 'Error occurred');
        }
    }, []);

    const putStudent = useCallback(async (element: StudentPayload, id: number) => {
        try {
            const response = await StudentService.update(element, id);
            const { data, status } = response;
            if (status === 200) setInformation(data);
        } catch (error) {
            //@ts-ignore
            setInformation(error.message || 'Error occurred');
        }
    }, []);


    const removeStudent = useCallback(async (id: number) => {


        try {
            await StudentService.remove(id);

            
            setStudentsArray(prevStudents => {
               
                const updatedStudents = prevStudents.filter(student => student.id !== id);
               
                return updatedStudents;
            });

        } catch (error) {
            //@ts-ignore
            setInformation(error.message || 'Error occurred');
        }
    }, [studentsArray]);





    useEffect(() => {
        getAll();
    }, [getAll]);


    return {
        studentsArray,
        information,
        students,
        setStudentsArray,
        getAll,
        postStudent,
        putStudent,
        getOne,
        removeStudent
    };
}