import { RolesResponse, Role, Permission } from "../../types/role";

import RoleCard from "./RoleCard";
import { useEffect, useState } from "react";

interface RolesListPrps {
    roles: Role[];
    onEdit: (role: Role) => void;
}
export default function RolesList({roles, onEdit}:RolesListPrps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {roles.map((role) => (
                    <RoleCard
                        key={role.name}
                        role={role}
                        onEdit={() => onEdit(role)}
                    />
                ))}
            </div>
        </div>
    );
}
