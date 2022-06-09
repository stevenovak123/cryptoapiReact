import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'

export const Navbar = () => {
	const [menuToggle, setMenuToggle] = useState(false)
	const handleMenuToggle = () => {
		setMenuToggle(!menuToggle)
	}
	const { user, logout } = UserAuth()
	const navigate = useNavigate()
	const handleSignOut = async () => {
		try {
			await logout()
			navigate('/')
		} catch (error) {
			console.log(error.message)
		}
	}
	const toggleAndSignout = () => {
		handleMenuToggle()
		handleSignOut()
	}

	return (
		<nav className='rounded-div flex items-center justify-between h-20 font-bold z-50 top-0 sticky'>
			<Link onClick={handleMenuToggle} to='/'>
				<h1 className='text-2xl'>CryptoBase</h1>
			</Link>
			<div className='hidden md:block z-50 '>
				<ThemeToggle />
			</div>
			{user?.email ? (
				<div className='hidden md:block z-50 '>
					<Link to='/account' className='p-4'>
						Account
					</Link>
					<button
						onClick={handleSignOut}
						className='bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg  hover:shadow-2x'
					>
						Sign Out
					</button>
				</div>
			) : (
				<div className='hidden md:block'>
					<Link to='/signin' className='p-4 hover:text-accent'>
						Sign In
					</Link>
					<Link
						to='/signup'
						className='bg-button text-btnText px-5  py-2 rounded-2xl shadow-lg  hover:shadow-2xl '
					>
						Sign Up
					</Link>
				</div>
			)}
			{/* //* Menu icon */}
			<div
				className='block md:hidden cursor-pointer z-10'
				onClick={handleMenuToggle}
			>
				{menuToggle ? (
					<AiOutlineClose size={25} />
				) : (
					<AiOutlineMenu size={25} />
				)}
			</div>

			{/* //*Mobile Menu */}
			<div
				className={
					menuToggle
						? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full  h-[90%] bg-primary ease-in duration-300 z-10'
						: 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
				}
			>
				<ul className='w-full p-4'>
					<li className='border-b py-6'>
						<Link onClick={handleMenuToggle} to='/'>
							Home
						</Link>
					</li>
					<li className='border-b py-6'>
						<Link onClick={handleMenuToggle} to='/account'>
							Account
						</Link>
					</li>
					<li className='py-6'>
						<ThemeToggle />
					</li>
				</ul>
				<div className='flex flex-col w-full p-4 '>
					<ul>
						{user?.email ? (
							<li>
								<Link to='/'>
									<button
										onClick={toggleAndSignout}
										className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
									>
										Sign out
									</button>
								</Link>
							</li>
						) : (
							<>
								<li>
									<Link to='/signin'>
										<button
											onClick={handleMenuToggle}
											className='w-full my-2 p-3 bg-primary  text-primary border-secondary border rounded-2xl shadow-xl'
										>
											Sign In
										</button>
									</Link>
								</li>
								<li>
									<Link to='/signup'>
										<button
											onClick={handleMenuToggle}
											className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'
										>
											Sign Up
										</button>
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}
