const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
};

const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
};

const nodeStyle = {
    border: '1px solid #4A5568',
    borderRadius: '6px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    cursor: 'grab',
    background: '#2D3748',
    color: '#CBD5E0',
    fontWeight: 500,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

export const DraggableNode = ({ type, label }) => {
    return (
        <div 
            style={nodeStyle}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={onDragEnd}
            draggable
        >
            <span>{label}</span>
        </div>
    );
};
