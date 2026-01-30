import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RolesList from "../../components/admin/role/RolesList";
import { useEffect, useState } from "react";
import { RolesResponse, Role, Permission } from "../../types/role";
import RoleModal from "../../components/admin/role/RoleModal";
import { api } from "../../api";
import Button from "../../components/ui/button/Button";

export default function RolesManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
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
        <>
            <PageMeta
                title="Roles"
                description="Roles"
            />
            <PageBreadcrumb pageTitle="Roles" />
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            setSelectedRole(null);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Role
                    </Button>
                </div>
                <ComponentCard title="Roles List">
                    <RolesList
                        onEdit={(role) => {
                            setSelectedRole(role);
                            setIsModalOpen(true);
                        }}
                        roles={roles} />
                </ComponentCard>
            </div>
            {isModalOpen && (
                <RoleModal
                    role={selectedRole}
                    onSaved={() => {
                        loadRoles();      
                        setSelectedRole(null);
                        setIsModalOpen(false);
                    }}
                    allPermissions={allPermissions}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedRole(null);
                    }}
                />
            )}
        </>
    );
}