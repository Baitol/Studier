import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface User {
  id: number;
  logo: string;
  name: string;
  role: string;
  status: string;
}

// Define the table data using the interface
const tableData: User[] = [
  {
    id: 1,
    logo: "/images/user/user-17.jpg",
    name: "Lindsey Curtis",
    role: "Web Designer",
    status: "Active",
  },
  {
    id: 2,
    logo: "/images/user/user-18.jpg",
    name: "Kaiya George",
    role: "Project Manager",
    status: "Pending",
  },
  {
    id: 3,
    logo: "/images/user/user-17.jpg",
    name: "Zain Geidt",
    role: "Content Writing",
    status: "Active",
  },
  {
    id: 4,
    logo: "/images/user/user-20.jpg",
    name: "Abram Schleifer",
    role: "Digital Marketer",
    status: "Cancel",
  },
  {
    id: 5,
    logo: "/images/user/user-21.jpg",
    name: "Carla George",
    role: "Front-end Developer",
    status: "Active",
  },
];

export default function UsersList() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={user.logo}
                        alt={user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.role}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      user.status === "Active"
                        ? "success"
                        : user.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
