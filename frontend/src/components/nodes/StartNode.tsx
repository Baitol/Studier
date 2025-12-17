import { Position, Handle } from '@xyflow/react';

export function StartNode({ data }) {
    const handleClick = (e) => {
        alert(JSON.stringify({
            tag: e.target.tagName,
            id: e.target.id,
            className: e.target.className,
            innerText: e.target.innerText
        }));
    };

    return (
        <div style={{ padding: 10, background: "#4ade80", borderRadius: 8, pointerEvents: "all" }}>
            <button
                onClick={handleClick}
                style={{
                    padding: "8px 16px",
                    background: "white",
                    borderRadius: 6,
                    cursor: "pointer",
                }}
            >
                START
            </button>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}