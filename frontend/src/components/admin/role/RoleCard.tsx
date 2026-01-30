import { Role } from "types/role";

function getRandomMutedColor() {
    const hue = Math.floor(Math.random() * 360); // випадковий тон
    const saturation = 30; // низька насиченість для тьмяного кольору
    const lightness = 85; // світлий відтінок
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

interface RoleCardProps {
    role: Role;
    onEdit: () => void;
}


export default function RoleCard({role, onEdit }: RoleCardProps) {
    const bgColor = getRandomMutedColor();
    // role.status.color = "text-red-600";
    return (
        <div style={{ backgroundColor: bgColor }} onClick={onEdit}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-2xl font-semibold mb-2">{role.name}</div>
            <p className={`text-sm font-medium ${role.status.color}`}>
                {role.status.name}
            </p>
        </div>
    );
}