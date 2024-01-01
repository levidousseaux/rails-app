import {useEffect, useState} from "react";
import {Todo} from "@/models/todo";
import Heading from "@/components/ui/heading";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import TodoDialogForm from "@/pages/todo-list/components/todo-dialog-form";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {CreatedTodoToast, ErrorToast, ExcludedTodoToast, UpdatedTodoToast} from "@/models/toast";
import {http} from "@/utils/http";

export default function TodoList() {
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [todoToUpdate, setTodoToUpdate] = useState<Todo>()
    const [todos, setTodoList] = useState<Todo[]>([]);
    const {toast} = useToast()

    useEffect(() => {
        getTodos()
    }, [])

    function getTodos() {
        http.get<Todo[]>("/api/todos")
            .then(res => setTodoList(res ?? []))
            .catch(() => toast(ErrorToast))
    }

    function openDialogForm(todo: Todo | undefined = undefined) {
        setTodoToUpdate(todo)
        setFormOpen(true)
    }

    function submitForm(todo: Todo, exclude: boolean) {
        const updating = todo.id > 0;
        const handleResponse = () => {
            setFormOpen(false);
            getTodos();
            exclude
                ? toast(ExcludedTodoToast)
                : toast(updating ? UpdatedTodoToast : CreatedTodoToast);
        }

        if (exclude) {
            http.delete<Todo>(`/api/todos/${todo.id}`)
                .then(() => handleResponse())
                .catch(() => toast(ErrorToast))

            return;
        }

        if (updating) {
            http.put<Todo>(`/api/todos/${todo.id}`, todo)
                .then(() => handleResponse())
                .catch(() => toast(ErrorToast))

            return;
        }

        http.post<Todo>("/api/todos", todo)
            .then(() => handleResponse())
            .catch(() => toast(ErrorToast));
    }

    return (
        <div>
            <div className="flex flex-row justify-between">
                <Heading title="Tarefas" description="Lista das tarefas adicionadas"/>
                <Button onClick={() => openDialogForm()}>Adicionar</Button>
            </div>

            {
                todos.map(todo => (
                    <Card
                        key={todo.id}
                        className="mb-3 cursor-pointer"
                        onClick={() => openDialogForm(todo)}
                    >
                        <CardHeader>
                            <CardTitle className="text-[18px] mb-0 flex items-center">
                                {todo.title}
                            </CardTitle>
                            <CardDescription className="flex flex-col font-medium">
                                {todo.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }

            <TodoDialogForm
                todo={todoToUpdate}
                open={formOpen}
                openChange={setFormOpen}
                onSubmit={submitForm}
            />
        </div>
    );
}