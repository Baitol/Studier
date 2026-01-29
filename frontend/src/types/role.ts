
export interface Permission {
  id: number;
  name: string;
}
interface status {
  id: number;
  name: string;
  color: string;
}
export interface Role {
  id: number;
  name: string;
  status: status;
  permissions: Permission[];
}
export interface RolesResponse {
  roles: Role[];
  permissions: Permission[];
}