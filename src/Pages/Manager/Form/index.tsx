import React from 'react'
import Wrapper from '../../../utils/Wrapper'
import * as S from './styles'
import { Divider, Box, TextField, FormControl } from '@mui/material'
import Button from '../../../utils/Button'
import { registerUser } from '../../../Services/auth'
import { UserType } from '../../../Types/user'

const ManagerForm: React.FC = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleRegisterManager = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await registerUser(name, email, password, UserType.MANAGER)
    
    if (response) {
      setMessage('Gestor cadastrado com sucesso!')

      clearFields()
    } else {
      setMessage('Erro ao cadastrar gestor.')
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
        Novo Gestor
      </S.PageTitle>
      <S.Subtitle>
        Preencha os campos abaixo para cadastrar um novo gestor. Um gerente é o usuário responsável por gerenciar as atividades esportivas, professores e cidadãos.
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
        onSubmit={handleRegisterManager}
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
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />  
            <TextField
              required
              id="password"
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
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
            type="submit"
            color="primary"
            variant="contained"
          >
            Cadastrar
          </Button>
        </div>
      </Box>
    </Wrapper>
  )
}

export default ManagerForm