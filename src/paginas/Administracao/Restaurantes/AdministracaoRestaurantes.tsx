import { TableContainer, Paper, TableHead, Table, Button, Link } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Link as RouterLink } from 'react-router-dom'
import http from '../../../http'

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
            .catch(erro => console.error(erro))
    })

    const excluir = (restauranteASerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <>
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
                            <TableCell>
                                Excluir
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
                                    [ <RouterLink to={`/admin/restaurantes/${restaurante.id}`}>editar</RouterLink> ]
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}