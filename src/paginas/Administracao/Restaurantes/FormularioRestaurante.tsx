import { TextField, Button } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FormulatrioRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if(parametros.id) {
            axios.get(``)
        }
    }, [])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <form onClick={aoSubmeterForm}>
            <TextField
                label="Nome do Restaurante"
                variant="standard"
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
            />
            <Button type='submit' variant="outlined">Salvar</Button>
        </form>
    )
}