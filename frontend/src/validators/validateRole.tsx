export interface RoleErrors {
  name?: string;
  statusId?: string;
}

export const ValidateRole = (name: string, statusId: number | null): RoleErrors => {
  const errors: RoleErrors = {};

  if (!name.trim()) errors.name = "Name is required";
  else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters";

  if (statusId === null) errors.statusId = "Status is required";

  return errors;
};