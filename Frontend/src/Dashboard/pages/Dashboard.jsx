import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import RecentOrders from '../components/RecentOrders'
import ProfilePieChar from '../components/ProfilePieChart'
import PopularProducts from '../components/PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row w-full gap-4">
				<TransactionChart />
				<ProfilePieChar />
			</div>
			<div className="flex flex-row w-full gap-4">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
	)
}
