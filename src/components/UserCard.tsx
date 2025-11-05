import type { User } from "../types"

export const UserCard = ({ name, email, company }: User) => {
    return (
        <div className="card">
            <p>
                <strong>Name: </strong>
                {name}
            </p>
            <p>
                <strong>Email: </strong>
                {email}
            </p>
            <p>
                <strong>Company: </strong>
                {company.name}
            </p>
        </div>
    )
}
