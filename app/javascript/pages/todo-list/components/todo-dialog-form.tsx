import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Todo} from "@/models/todo";
import {SetStateAction, useEffect, useState} from "react";
import {cn} from "@/utils/cn-merge";

type TodoDialogFormProps = {
    todo: Todo | undefined;
    open: boolean;
    openChange: (value: SetStateAction<boolean>) => void;
    onSubmit: (todo: Todo, exclude: boolean) => void;
}

export default function TodoDialogForm({todo, open, openChange, onSubmit}: TodoDialogFormProps) {
    const title = todo ? 'Atualizar Tarefa' : 'Adicionar Tarefa';
    const description = todo ? 'Altere os dados da tarefa' : 'Adicione uma nova tarefa em sua lista';

    const [todoTitle, setTodoTitle] = useState(todo?.title ?? '');
    const [todoDescription, setTodoDescription] = useState(todo?.description ?? '');

    useEffect(() => {
        setTodoTitle(todo?.title ?? "")
        setTodoDescription(todo?.description ?? "")
    }, [todo])

    function submitForm(exclude: boolean) {
        onSubmit({
            id: todo?.id ?? 0,
            title: todoTitle,
            description: todoDescription,
            createdAt: todo?.createdAt ?? new Date(),
            completed: todo?.completed ?? false
        }, exclude)
    }

    return (
        <Dialog onOpenChange={openChange} open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="flex flex-col mb-3">
                        <Label htmlFor="title" className="mb-2">Título</Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            defaultValue={todo?.title}
                            onChange={(e: any) => setTodoTitle(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <Label htmlFor="description" className="mb-2">Descrição</Label>
                        <Input
                            id="description"
                            className="col-span-3"
                            defaultValue={todo?.description}
                            onChange={(e: any) => setTodoDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className={cn(todo ? "mr-auto w-full md:w-auto" : '')} onClick={() => openChange(false)} variant="outline">Cancelar</Button>
                    {todo && <Button onClick={() => submitForm(true)} className="mb-2 md:mb-0" variant="destructive">Excluir</Button>}
                    <Button onClick={() => submitForm(false)} className="mb-2 md:mb-0">Concluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}