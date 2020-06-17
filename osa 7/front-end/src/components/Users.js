import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
    Table, Header1, TableCell, TableCellBold 
} from './style-components/generalStyles'

const Users = () => {
    const [users, setUsers] = useState([])
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        const userListCheck = []
        const userList = []

        // eslint-disable-next-line
        blogs.map(blog => {
            const user = blog.user
            
            if(!userListCheck.includes(user.id)) {
                const newUser = {
                    id: user.id,
                    name: user.name,
                    blogs: 1
                }

                userListCheck.push(user.id)
                userList.push(newUser)
            } else {
                const index = userList.findIndex(
                    listUser => listUser.id === user.id
                )
                
                userList[index].blogs += 1
            }
        })

        setUsers(userList)

    },[blogs])

    return (
        <div>
            <Header1>Users</Header1>
            <Table>
            <thead>
                <tr>
                    <TableCell></TableCell>
                    <TableCellBold>blogs created</TableCellBold>
                </tr>
                
            </thead>
            <tbody>
                {users.map(user => 
                    <tr key={user.id}>
                        <TableCell>
                            <Link to={`/${user.id}`}>{user.name}</Link>
                        </TableCell>
                        <TableCell>{user.blogs}</TableCell>
                    </tr>
                )}  
            </tbody>
            </Table> 
             
        </div>
    )
}

export default Users