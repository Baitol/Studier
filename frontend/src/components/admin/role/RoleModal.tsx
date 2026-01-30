import { useState } from "react";
import { api } from "../../../api";
import { Role, Permission } from "../../../types/role";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Select from "../../form/Select";
import { Modal } from "../../ui/modal";
import { ValidateRole } from "../../../validators/validateRole";
import PermissionsTable from "./PermissionsTable";
import {
    TrashBinIcon
} from "../../../icons";

interface RoleModalProps {
    role: Role | null;
    onClose: () => void;
    onSaved: () => void;
    allPermissions: Permission[];
}
interface statusOptions {
    value: number;
    label: string;
};
const statusOptions: statusOptions[] = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
    { value: 3, label: "Pending" },
];
interface RoleErrors {
    name?: string;
    statusId?: string;
}
export default function RoleModal({ role, allPermissions, onClose, onSaved }: RoleModalProps) {
    const [statusId, setStatusId] = useState(role?.status.id ?? null);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(role?.permissions ?? []);
    const [name, setName] = useState(role?.name ?? "");
    const [errors, setError] = useState<RoleErrors>({});
    const availablePermissions = allPermissions.filter(
        (perm) => !selectedPermissions.some((p) => p.id === perm.id)
    );
    const addPermission = (perm: Permission) => {
        setSelectedPermissions([...selectedPermissions, perm]);
    };

    const removePermission = (perm: Permission) => {
        setSelectedPermissions(selectedPermissions.filter(p => p.id !== perm.id));
    };
    const selectStatus = (statusId: string) => {
        setStatusId(Number(statusId));
    };
    const handleDelete = async () => {
        try {
            if (role) {
                await api.delete(`/api/roles/${role.id}`);
            }
            onSaved();
        } catch (error) {
            console.error('Failed to save role:', error);
            alert(error);
        }
    };
    const handleSave = async () => {
        const validationErrors = ValidateRole(name, statusId);
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }
        try {
            let payload = {
                name,
                permissions: selectedPermissions.map(p => p.id),
                statusId,
            }
            if (role) {
                await api.put(`/api/roles/${role.id}`, payload);
            } else {
                await api.post('/api/roles', payload);
            }
            onSaved();
        } catch (error) {
            console.error('Failed to save role:', error);
            alert(error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} className="max-w-[700px] m-4">

            <div className="flex max-h-[90vh] flex-col no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">

                <div className="px-2 pr-14">

                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {role ? `Edit ${role.name} Role` : 'Create Role'}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Update role's details.
                    </p>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label>Status</Label>
                            <Select
                                options={statusOptions}
                                placeholder="Select status"
                                defaultValue={statusId?.toString() ?? 2}
                                onChange={selectStatus}
                            />
                        </div>
                    </div>
                    <div className="mt-7 flex flex-col gap-14">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Permissions
                        </h5>
                        <PermissionsTable
                            title="Active Permissions"
                            permissions={selectedPermissions}
                            onRemove={removePermission}
                        />
                        <PermissionsTable
                            title="Available Permissions"
                            permissions={availablePermissions}
                            onAdd={addPermission}
                        />
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6">
                        {/* Delete кнопка зліва */}
                        <Button size="sm" variant="outline" onClick={handleDelete}>
                            <TrashBinIcon />
                        </Button>

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Решта кнопок справа */}
                        <div className="flex items-center gap-3">
                            <Button size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )

}