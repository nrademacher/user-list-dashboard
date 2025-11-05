import { useState, useEffect, useMemo } from "react"
import type { User } from "./types"
import { UserList } from "./components/UserList"
import { debounce } from "./utils"
import "./App.css"

function App() {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFetchError, setIsFetchError] = useState<boolean>(false)
    const [nameSearchTerm, setNameSearchTerm] = useState<string>("")

    useEffect(() => {
        async function fetchUsers(): Promise<User[]> {
            setIsFetchError(false)
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            if (!response.ok) {
                setIsFetchError(true)
                return []
            }
            const users = (await response.json()) as User[]
            return users.map((user) => ({
                name: user.name,
                email: user.email,
                company: { name: user.company.name },
            }))
        }
        fetchUsers()
            .then((fetchedUsers) => setAllUsers(fetchedUsers))
            .catch(() => {
                setIsFetchError(true)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(nameSearchTerm.toLowerCase()))

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNameSearchTerm(event.target.value)
    }

    const debouncedHandleSearchChange = useMemo(() => debounce(handleSearchChange, 300), [])

    return (
        <main className="container">
            <header>
                <h1>User List Dashboard</h1>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search users..."
                    onChange={debouncedHandleSearchChange}
                />
            </header>
            <div>
                {isLoading ? <p>Loading...</p> : <UserList users={filteredUsers} />}
                {isFetchError && !isLoading && <p className="error">Something went wrong.</p>}
            </div>
        </main>
    )
}

export default App
