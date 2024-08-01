import { data } from "autoprefixer";
import { dynamicsApi } from "src/common/api/dynamicsApi";
import { HttpInstance } from "src/common/api/http";

const Http = HttpInstance(dynamicsApi);


export interface StudentInterface {
    id?: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    age?: string,
    grade?: string
}

export type StudentPayload = {
    first_name?: string,
    last_name?: string,
    email?: string,
    age?: string,
    grade?: string

}




const getAll = async (offset?: number, limit?: number) =>
    Http.get<StudentInterface[]>(`/getStudents?offset=${offset}&limit=${limit}`);


const getOne=async (id:number)=>
    Http.get<StudentInterface>(`/getStudents/${id}`)


const post = async ({ first_name, last_name, email, age, grade }: StudentPayload) =>
    Http.post<string, StudentPayload>(`/postStudent`, { first_name, last_name, email, age, grade })


const update = async ({ first_name, last_name, email, age, grade }: StudentPayload,id:number) =>
    Http.put<string, StudentPayload>(`/putStudent/${id}`, { first_name, last_name, email, age, grade })


const remove =async (id:number)=>{
    Http.put<string,any>(`/removeStudent/${id}`,null)
}

export const StudentService = {
    getAll,
    post,
    update,
    getOne,
    remove

};