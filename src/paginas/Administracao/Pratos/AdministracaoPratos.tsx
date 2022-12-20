import { TableContainer, Paper, TableHead, Table, Button, Link } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import { Link as RouterLink } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

export default function AdministracaoPratos() {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
            .catch(erro => console.error(erro))
    })

    const excluir = (pratoASerExcluido: IPrato) => {
        http.delete(`pratos/${pratoASerExcluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
                setPratos([...listaPratos])
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
                                Descrição
                            </TableCell>
                            <TableCell>
                                Tag
                            </TableCell>
                            <TableCell>
                                Imagem
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
                        {pratos.map(prato =>
                            <TableRow key={prato.id}>
                                <TableCell>
                                    {prato.nome}
                                </TableCell>
                                <TableCell>
                                    {prato.descricao}
                                </TableCell>
                                <TableCell>
                                    {prato.tag}
                                </TableCell>
                                <TableCell>
                                    [<a href={prato.imagem} target='_blank'>ver imagem</a>]
                                </TableCell>
                                <TableCell>
                                    [<RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink>]
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' color='error' onClick={() => excluir(prato)}>
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