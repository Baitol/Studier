import { RolesResponse, Role, Permission } from "../../types/role";
import RoleModal from "./RoleModal";
import RoleCard from "./RoleCard";
import { useEffect, useState } from "react";
import { api } from "../../api";

export default function RolesList() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const loadRoles = async () => {
        const res = await api.get<RolesResponse>("/api/roles");
        setRoles(res.data.roles);
        setAllPermissions(res.data.permissions);
    };
    useEffect(() => {

        const loadData = async () => {
            try {
                loadRoles();
            } catch (error) {
                console.error("Failed to load roles:", error);
                alert("Failed to load roles");
            }
        };

        loadData();
    }, []);



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {roles.map((role) => (
                    <RoleCard
                        key={role.name}
                        role={role}
                        onEdit={() => setSelectedRole(role)}
                    />
                ))}

            </div>
            {selectedRole && (
                <RoleModal
                    role={selectedRole}
                    onSaved={() => {
                        loadRoles();          // 🔥 оновлення
                        setSelectedRole(null);
                    }}
                    allPermissions={allPermissions}
                    onClose={() => {
                        setSelectedRole(null);
                    }}
                />
            )}
        </div>
    );
}
