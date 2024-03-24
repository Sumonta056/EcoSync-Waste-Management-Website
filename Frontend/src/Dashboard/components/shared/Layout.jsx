import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
	return (
		<div className="flex flex-row w-screen h-screen overflow-hidden bg-neutral-100">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 min-h-0 p-4 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
