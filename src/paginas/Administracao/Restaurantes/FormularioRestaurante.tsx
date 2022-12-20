import { TextField, Button, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'

export default function FormulatrioRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
                .catch(error => {
                    console.error(error)
                })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
                .catch(error => {
                    console.error(error)
                })
        }
        else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h1' variant='h6'>
                Formulário de Restaurantes
            </Typography>
            <Box component='form' onSubmit={aoSubmeterForm}>
                <TextField
                    label="Nome do Restaurante"
                    variant="standard"
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    fullWidth
                    required
                />
                <Button sx={{marginTop: 1}} type='submit' variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}