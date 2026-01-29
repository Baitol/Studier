import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RolesList from "../../components/admin/RolesList";
import RoleCard from "../../components/admin/RoleCard";

export default function RolesManagement() {
    return (
        <>
            <PageMeta
                title="Roles"
                description="Roles"
            />
            <PageBreadcrumb pageTitle="Roles" />
            <div className="space-y-6">
                <ComponentCard title="Roles List">
                    <RolesList />
                </ComponentCard>
            </div>
        </>
    );
}