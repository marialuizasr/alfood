import { TextField, Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { METHODS } from 'http'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'
import IRestaurante from '../../../interfaces/IRestaurante'
import ITag from '../../../interfaces/ITag'

export default function FormulatrioPrato() {

    const [nomePrato, setNomePrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const parametros = useParams()

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length) {
            setImagem(evento.target.files[0])
        }
        else {
            setImagem(null)
        }
    }

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => setNomePrato(resposta.data.nome))
                .catch(error => {
                    console.error(error)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const formData = new FormData()
        formData.append('nome', nomePrato)
        formData.append('descricao', descricaoPrato)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        if(imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(resposta => alert('Prato cadastrado com sucesso!'))
            .catch(erro => console.error(erro))
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'>
                Formulário de Pratos
            </Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    label="Nome do Prato"
                    variant="standard"
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    fullWidth
                    required
                    margin='dense'
                />
                <TextField
                    label="Descrição do Prato"
                    variant="standard"
                    value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)}
                    fullWidth
                    required
                    margin='dense'
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <input type="file" onChange={selecionarArquivo}/>
                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined">Salvar</Button>
            </Box>
        </Box>

    )
}