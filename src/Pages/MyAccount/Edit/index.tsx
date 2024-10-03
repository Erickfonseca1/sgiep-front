import { useState, useEffect } from 'react'
import * as S from './styles'
import { Box, Divider, FormControl, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import { getUserProfile, updateUserProfile } from '../../../Services/users'
import { UserProfileType } from '../../../Types/user'
import Wrapper from '../../../utils/Wrapper'
import Button from '../../../utils/Button'

const EditProfile = () => {
  const { userId } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  
  // Validação de erro
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault()

    // Verifica erros antes de submeter
    if (!validateForm()) return

    const updatedUser: Partial<UserProfileType> = { name, email, phone, address }

    const response = await updateUserProfile(userId!, updatedUser)
    if (response) {
      setMessage('Perfil atualizado com sucesso!')
      navigate('/my-account')
    } else {
      setMessage('Erro ao atualizar perfil.')
    }
  }

  useEffect(() => {
    if (!userId) return

    const fetchProfile = async () => {
      const response = await getUserProfile(userId)
      setName(response.name)
      setEmail(response.email)
      setPhone(response.phone)
      setAddress(response.address)
    }

    fetchProfile()
  }, [userId])

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', address: '' }

    // Validações básicas
    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório'
    }
    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (phone && !/^\d{10,11}$/.test(phone)) {
      newErrors.phone = 'Telefone inválido (deve possuir DDD e 9)'
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error !== '')
  }

  return (
    <Wrapper>
      <S.PageTitle>Editar Perfil</S.PageTitle>
      <S.Subtitle>Atualize suas informações pessoais abaixo:</S.Subtitle>
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
        onSubmit={handleUpdateProfile}
        noValidate
        autoComplete="off"
      >
        <div>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
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
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              required
              id="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              disabled
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="phone"
              label="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              id="address"
              label="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
          </FormControl>
          {message && (
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
          )}
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
            size="medium"
            onClick={() => navigate('/my-account')}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
          >
            Salvar Alterações
          </Button>
        </div>
      </Box>
    </Wrapper>
  )
}

export default EditProfile
