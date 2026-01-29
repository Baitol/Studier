import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import UsersList from "../../components/admin/UsersList";
export default function UsersManagement() {
    return (
        <>
            <PageMeta
                title="Users"
                description="Users"
            />
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard title="Users List">
                    <UsersList />
                </ComponentCard>
            </div>
        </>
    );
}