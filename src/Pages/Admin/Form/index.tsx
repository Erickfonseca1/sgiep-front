import React from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { Divider, Box, TextField, FormControl } from '@mui/material'
import Button from '../../../utils/Button'
import { registerUser } from '../../../Services/auth'
import { UserType } from '../../../Types/user'

const AdminForm: React.FC = () => {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [message, setMessage] = React.useState('')

	const handleRegisterAdmin = async (event: React.FormEvent) => {
		event.preventDefault()
		const response = await registerUser(name, email, password, UserType.ADMIN)
		
		if (response) {
			setMessage('Administrador cadastrado com sucesso!')

			clearFields()
		} else {
			setMessage('Erro ao cadastrar administrador.')
		}
	}

	const clearFields = () => {
		setName('')
		setEmail('')
		setPassword('')
	}

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
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'space-between',
				}}
				onSubmit={handleRegisterAdmin}
				noValidate
				autoComplete="off"
			>
				<div>
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
							value={name}
							onChange={(e) => setName(e.target.value)}
							variant="outlined"
							fullWidth
						/>
						<TextField
							required
							id="email"
							label="E-mail"
							value={email}
							variant="outlined"
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
						/>
						<TextField
							required
							id="password"
							label="Senha"
							value={password}
							type='password'
							variant="outlined"
							onChange={(e) => setPassword(e.target.value)}
							fullWidth
						/>
						
					</FormControl>
					{message && 
						<p 
							style={{ 
								color: 'green', 
								display: 'flex', 
								justifyContent: 'flex-end',
								marginTop: '1rem', 
							}}
						>
							{message}
						</p>
					}
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						marginTop: '1rem',
						gap: '1rem',
					}}
				>
					<Button
						variant="outlined"
						color="secondary"
						size='medium'
						onClick={() => window.history.back()}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						color="primary"
						size='medium'
						type='submit'
					>
						Cadastrar
					</Button>
				</div>
			</Box>
		</Wrapper>
	)
}

export default AdminForm
