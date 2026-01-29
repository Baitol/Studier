import { useState } from "react";
import { api } from "../../api";
import { Role, Permission } from "../../types/role";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { Modal } from "../ui/modal";
import {
    CloseIcon, PlusIcon
} from "../../icons";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

const apiUrl = import.meta.env.VITE_API_URL;

interface RoleModalProps {
    role: Role | null;
    onClose: () => void;
    onSaved: () => void;
    allPermissions: Permission[];
}

const statusOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
    { value: 3, label: "Pending" },
];

export default function RoleModal({ role, allPermissions, onClose, onSaved }: RoleModalProps) {
    const isEdit = Boolean(role);
    const [statusId, setStatusId] = useState(role?.status.id ?? null);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(role?.permissions ?? []);
    const [name, setName] = useState(role?.name ?? "");
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

    const handleSave = async () => {
        try {
            await api.put(`/api/roles/${role.id}`, {
                name,
                permissions: selectedPermissions.map(p => p.id),
                statusId,
            });
            onSaved();
            // Закриваємо модалку
            onClose();

            // Можеш повідомити батька через callback, щоб оновити список ролей
            // onUpdateRole(updatedRole);

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
                        Edit {role.name} Role
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
                        </div>

                        <div>
                            <Label>Status</Label>
                            <Select
                                options={statusOptions}
                                placeholder="Select status"
                                defaultValue={statusId.toString()}
                                onChange={selectStatus}
                            />
                        </div>
                    </div>
                    <div className="mt-7 flex flex-col gap-14">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Permissions
                        </h5>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Active permissions.
                            </p>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
                                <Table>
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Name
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    {selectedPermissions.map((permission) => (
                                        <TableRow key={permission.id}>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {permission.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-end text-gray-500 text-theme-sm dark:text-gray-400">
                                                <Button
                                                    variant="outline"
                                                    className=""
                                                    onClick={() => removePermission(permission)}
                                                >
                                                    <CloseIcon className="h-4 w-4" />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </Table>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Available permissions.
                            </p>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
                                <Table>
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Name
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    {availablePermissions.map((permission) => (
                                        <TableRow key={permission.id}>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {permission.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-end text-gray-500 text-theme-sm dark:text-gray-400">
                                                <Button
                                                    onClick={() => addPermission(permission)}
                                                    variant="outline"
                                                    className=""
                                                >
                                                    <PlusIcon className="h-4 w-4" />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </Modal >
    )

}