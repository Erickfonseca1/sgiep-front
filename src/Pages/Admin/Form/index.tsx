import React from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { Divider, Box, TextField, FormControl } from '@mui/material'
import Button from '../../../utils/Button'

const AdminForm: React.FC = () => {
  return (
		<Wrapper>
			<S.PageTitle>
				Novo Administrador
			</S.PageTitle>
			<S.Subtitle>
				Preencha os campos abaixo para cadastrar um novo administrador. Um administrador é o superusuário do sistema, com acesso a todas as funcionalidades.
			</S.Subtitle>
			<Divider />

			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1 },
				}}
				noValidate
				autoComplete="off"
			>
				<FormControl
					sx={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						justifyContent: 'space-between',
						alignItems: 'center',
						mt: 1,
					}}
				>
					<TextField
						required
						id="name"
						label="Nome"
						variant="outlined"
						fullWidth
					/>
					<TextField
						required
						id="email"
						label="E-mail"
						variant="outlined"
						fullWidth
					/>
					<TextField
						required
						id="password"
						label="Senha"
						variant="outlined"
						fullWidth
					/>
					<Button
						variant="contained"
						color="primary"
						size='medium'
					>
						Cadastrar
					</Button>
				</FormControl>
			</Box>
		</Wrapper>
	)
}

export default AdminForm
