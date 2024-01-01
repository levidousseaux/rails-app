type Toast = {
    title?: string;
    description: string;
    variant: "success" | "destructive";
    duration: number | undefined;
};

const defaultDuration = 3000;

export const ErrorToast: Toast = {
    title: "Estamos enfrentando problemas",
    description: "Tente novamente mais tarde",
    variant: "destructive",
    duration: defaultDuration,
};

export const UpdatedTodoToast: Toast = {
    description: "Tarefa atualizada com sucesso",
    duration: defaultDuration,
    variant: "success",
};

export const ExcludedTodoToast: Toast = {
    description: "Tarefa excluída com sucesso",
    duration: defaultDuration,
    variant: "success",
};

export const CreatedTodoToast: Toast = {
    description: "Tarefa adicionada com sucesso",
    duration: defaultDuration,
    variant: "success",
};
