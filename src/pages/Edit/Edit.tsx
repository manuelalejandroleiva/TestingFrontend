import React, {  useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from 'src/component/Banner/Banner';
import { Button } from 'src/component/Button/Button';
import { Input } from 'src/component/Button/Input';
import { useStudents } from 'src/hooks/useStudents';
import { useFieldControl } from 'src/lib/Forms';
import { age, grade, mail } from 'src/lib/Rules';
import { StudentPayload } from 'src/service/StudentService';


function Edit() {
    
    const { id } = useParams();
    const navigates = useNavigate();
    const { putStudent, students, getOne } = useStudents();

    // Initialize form controls
    const first_name = useFieldControl<string>("",[]);
    const last_name = useFieldControl<string>("",[]);
    const email = useFieldControl<string>("",[mail]);
    const ages = useFieldControl<string>("",[age]);
    const grades = useFieldControl<string>("",[grade]);

    // Fetch student data when component mounts or `id` changes
    useMemo(() => {
        if (id) {
            getOne(Number.parseInt(id));
        }
    }, [id, getOne]);

    // Update form fields when `students` data changes
    useEffect(() => {
        if (students) {
            first_name.handleInputValue(students.first_name || "");
            last_name.handleInputValue(students.last_name || "");
            email.handleInputValue(students.email || "");
            ages.handleInputValue(students.age || "");
            grades.handleInputValue(students.grade || "");
        }
    }, [students]);

    // Handle form submission
    const executeSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        if (id) {
            const studentsPayload: StudentPayload = {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                age: ages.value,
                grade: grades.value,
            };
            try {
                await putStudent(studentsPayload, Number.parseInt(id));
                navigates('/'); // Redirect after successful update
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Banner>
            <div className='input-container'>
                <form className='form_container' onSubmit={executeSubmit}>
                    <Input
                        label='First Name'
                        //@ts-ignore
                        name='first_name'
                        classname='input'
                        onChange={(e) => first_name.handleInputValue(e)}
                        value={first_name.value}
                        error={first_name.error}
                    />
                    <Input
                        label='Last Name'
                        //@ts-ignore
                        name='last_name'
                        classname='input'
                        onChange={(e) => last_name.handleInputValue(e)}
                        value={last_name.value}
                        error={last_name.error}
                    />
                    <Input
                        label='Email'
                        //@ts-ignore
                        name='email'
                        classname='input'
                        onChange={(e) => email.handleInputValue(e)}
                        value={email.value}
                        error={email.error}
                    />
                    <Input
                        label='Age'
                        //@ts-ignore
                        name='age'
                        classname='input'
                        onChange={(e) => ages.handleInputValue(e)}
                        value={ages.value}
                        error={ages.error}
                    />
                    <Input
                        label='Grade'
                        //@ts-ignore
                        name='grade'
                        classname='input'
                        onChange={(e) => grades.handleInputValue(e)}
                        value={grades.value}
                        error={grades.error}
                    />
                    <Button type='submit' onClick={()=>{}}>Confirm</Button>
                    <Button type='reset' onClick={() => navigates('/')}>Cancel</Button>
                </form>
            </div>
        </Banner>
    );
}

export default Edit;