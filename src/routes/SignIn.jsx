import React, { useState } from 'react'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, UserAuth } from '../context/AuthContext'
export const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const guestUser = (e) => {
		e.preventDefault()
		setEmail('guest@example.com')
		setPassword('123456')
	}
	const navigate = useNavigate()
	const { signIn } = UserAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await signIn(email, password)
			navigate('/account')
		} catch (error) {}
	}

	return (
		<div>
			<div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
				<h1 className='text-2xl font-bold'>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className='my-4'>
						<label>Email</label>
						<div className='my-2 w-full relative rounded-2xl shadow-xl'>
							<input
								onChange={(e) => setEmail(e.target.value)}
								className='w-full p-2 bg-primary border border-input rounded-2xl'
								type='email'
								value={email}
							/>
							<AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
						</div>
					</div>

					<div className='my-4'>
						<label>Password</label>
						<div className='my-2 w-full relative rounded-2xl shadow-xl'>
							<input
								className='w-full p-2 bg-primary border border-input rounded-2xl'
								type='password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<AiFillLock className='absolute right-2 top-3 text-gray-400' />
						</div>
					</div>

					<button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
						Sign In
					</button>
					<button
						className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
						onClick={guestUser}
					>
						Sign In as Guest
					</button>
				</form>
				<p className='my-4'>
					Don't have an account?
					<Link className='text-accent' to='/signup'>
						Signup
					</Link>
				</p>
			</div>
		</div>
	)
}
