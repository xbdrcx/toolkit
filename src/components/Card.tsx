export default function Card({ title, description, onClick }: { title: string; description: string; onClick: React.MouseEventHandler<HTMLDivElement>; }) {
    return (
        <div className="card" onClick={onClick}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}