import { TableContainer, Paper, TableHead, Table } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(erro => {
                console.error(erro)
            })
    })

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}