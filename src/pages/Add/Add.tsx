import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from 'src/component/Banner/Banner';
import { Button } from 'src/component/Button/Button';
import { Input } from 'src/component/Button/Input';
import { useStudents } from 'src/hooks/useStudents';
import { useFieldControl } from 'src/lib/Forms';
import { age, grade, mail } from 'src/lib/Rules';
import {  StudentPayload } from 'src/service/StudentService';




function Add() {
    const navigate = useNavigate();


    const { postStudent } = useStudents();
    const studentInput = {
        first_name: useFieldControl<string>("", []),
        last_name: useFieldControl<string>("", []),
        email: useFieldControl<string>("", [mail]),
        age: useFieldControl<string>("", [age]),
        grade: useFieldControl<string>("", [grade]),

    }



    const excecuteSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const studentsPayload: StudentPayload = {
            first_name: studentInput.first_name.value,
            last_name: studentInput.last_name.value,
            age: studentInput.age.value,
            email: studentInput.email.value,
            grade: studentInput.grade.value
        }
        try {
            await postStudent(studentsPayload); // Use the local state for posting
            navigate('/'); // Redirect after successful update

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Banner>
            <div className='input-container'>
                <form
                    className='form_container'
                    onSubmit={excecuteSubmit}
                >
                    

                    <Input
                        label='First Name'
                        //@ts-ignore
                        name='first_name'
                        classname='input'
                        //@ts-ignore
                        onChange={(s) => studentInput.first_name.handleInputValue(s)}
                        value={studentInput.first_name.value || ""}
                        
                        
                    />
                    <Input
                        label='Last Name'
                        //@ts-ignore
                        name='last_name'
                        classname='input'
                        onChange={(s) => studentInput.last_name.handleInputValue(s)}
                        value={studentInput.last_name.value || ""}
                    />
                    <Input
                        label='Email'
                        //@ts-ignore
                        name='email'
                        classname='input'
                        onChange={(s) => studentInput.email.handleInputValue(s)}
                        value={studentInput.email.value || ""}
                        error={studentInput.email.error}
                    />
                    <Input
                        label='Age'
                        //@ts-ignore
                        name='age'
                        classname='input'
                        onChange={(s) => studentInput.age.handleInputValue(s)}
                        value={studentInput.age.value || ""}
                        error={studentInput.age.error}
                    />
                    <Input
                        label='Grade'
                        //@ts-ignore
                        name='grade'
                        classname='input'
                        onChange={(s) => studentInput.grade.handleInputValue(s)}
                        value={studentInput.grade.value || ""}
                        error={studentInput.grade.error}
                    />

                    <Button type='submit' onClick={() => { }}>
                        Confirm
                    </Button>
                    <Button
                        type='reset'
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </Banner>
    );
}

export default Add;