import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../../Service/AuthService'
import notificationService from '../../../Service/NotificationService'
import './Logout.css'

function Logout(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      authService.logout()
      notificationService.success('Bye bye')
      navigate('/home')
    } catch (err) {
      notificationService.error(err)
    }
  }, [])
  return null
}

export default Logout
