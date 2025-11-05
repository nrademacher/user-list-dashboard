import type { User } from "../types"
import { UserCard } from "./UserCard"

export const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="user-list">
      {users.map((user) =>
        <UserCard key={user.email} {...user} />
      )
      }
    </div>
  )
}
