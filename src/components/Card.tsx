export default function Card({ icon, title, description, onClick }: { icon: any, title: string; description: string; onClick: React.MouseEventHandler<HTMLDivElement>; }) {
    return (
        <div className="card" onClick={onClick}>
            <h2><span>{icon}</span> {title}</h2>
            <p>{description}</p>
        </div>
    )
}