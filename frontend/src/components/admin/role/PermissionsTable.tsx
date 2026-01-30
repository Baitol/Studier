import { Permission } from "../../../types/role";
import Button from "../../ui/button/Button";
import {
    CloseIcon, PlusIcon
} from "../../../icons";
import {
    Table,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

interface PermissionsTableProps {
    title: string;
    permissions: Permission[];
    onAdd?: (perm: Permission) => void;
    onRemove?: (perm: Permission) => void;
}

export default function PermissionsTable({ title, permissions, onAdd, onRemove }: PermissionsTableProps) {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                {title}
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
                    {permissions.map((permission) => (
                        <TableRow key={permission.id}>

                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                {permission.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-end text-gray-500 text-theme-sm dark:text-gray-400">
                                {onAdd && <Button variant="outline" onClick={() => onAdd(permission)}><PlusIcon className="h-4 w-4" /></Button>}
                                {onRemove && <Button variant="outline" onClick={() => onRemove(permission)}> <CloseIcon className="h-4 w-4" /></Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div >
    );
}