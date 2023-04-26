import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

const schema = yup.object({
    title: yup.string().required('This field is required!'),
    description: yup.string().required('This field is required!')
})

type Task = {
    title: string,
    description: string,
    id: string,
    userId: string,
    username: string | null,
}

export const Todolist = () => {
    const [user] = useAuthState(auth);
    const [tasks, setTasks] = useState<Task[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<Task>({
        resolver: yupResolver(schema)
    });

    const tasksRef = collection(db, 'tasks');

    const q = query(collection(db, 'tasks'),where("userId", "==", user?.uid));

    const getTasks = async () => {
        const data = await getDocs(q);
        setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})) as Task[]);
    };

    useEffect(() => {
        getTasks();
    }, [])

    const onSubmit: SubmitHandler<Task> = async (data) => {
        if (!data.title || !data.description ) return;
        if (!user) return;
        setTasks((prev) => {
            return [
                ...prev,
                {
                    ...data,
                    userId: user.uid,
                    username: user.displayName,
                    id: v4()
                }
            ]
        })
        await addDoc(tasksRef, {
            ...data,
            username: user.displayName,
            userId: user.uid
        })
    };

    return (
        <>  
            <div className="tasks-bg">
                <div className="tasks-container">
                    <nav>
                        <p>All</p>
                        <p>Completed</p>
                    </nav>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" { ...register('title') } placeholder="Add a task..."/>
                        <p className="error">{errors.title?.message}</p>
                        <textarea className="textarea" { ...register('description') }  placeholder="Type a task description..."></textarea>
                        <p className="error">{errors.description?.message}</p>
                        <button type='submit'>Add Task</button>
                    </form>
                    <div>
                        {tasks?.map(task => <li key={task.id}>{task.title}<p>{task.description}</p></li>)}
                    </div>
                </div>
            </div>
        </>
    )
};