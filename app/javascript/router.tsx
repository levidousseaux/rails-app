import {ListTodo} from "lucide-react";
import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import TodoList from "@/pages/todo-list/todo-list";

export const DASHBOARD_ROUTES = [
    {
        label: "Tarefas",
        icon: ListTodo,
        href: "/todos",
        disabled: false,
        element: <TodoList/>
    }
];

export const APP_ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
            {path: "", element: <TodoList/>},
            ...DASHBOARD_ROUTES.map(x => ({
                path: x.href,
                element: x.element
            }))],
    },
]);

