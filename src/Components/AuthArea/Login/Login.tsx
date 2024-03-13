import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CredentialsModel from '../../../Models/CredentialsModel'
import authService from '../../../Service/AuthService'
import notificationService from '../../../Service/NotificationService'
import './Login.css'

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>()

  const navigate = useNavigate()

  async function send(crendetials: CredentialsModel) {
    try {
      await authService.login(crendetials)
      notificationService.success('Welcome back!')
      navigate('/home')
    } catch (err) {
      notificationService.error(err)
    }
  }
  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>
        <label>Role:</label>
        <select defaultValue="" {...register('role',{
        required: {value : true, message: "Please select a user type"}})}>
          <option value="" disabled>
            Select Role:
          </option>
          <option>Customer</option>
          <option>Company</option>
          <option>Admin</option>
        </select>
        <span>{formState.errors?.role?.message}</span>
        <br />
        <label>Email:</label>
        <input
          type="email"
          {...register('email', {
            required: { value: true, message: 'email is required' },
          })}
        />
        <span>{formState.errors?.email?.message}</span>
        <br />
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: { value: true, message: 'password is required' },
          })}
        />
        <span>{formState.errors?.password?.message}</span>
        <br />
        <button>✚</button>
      </form>
    </div>
  )
}

export default Login
