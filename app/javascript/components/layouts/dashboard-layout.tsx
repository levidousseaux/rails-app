import Menu from "@/components/ui/menu";
import React from "react";
import {Outlet} from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="h-full relative">
            <Menu>
                <Outlet/>
            </Menu>
        </div>
    )
}