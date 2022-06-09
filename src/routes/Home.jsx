import React from 'react'
import { CoinSearch } from '../components/CoinSearch'
import { TrendingCoin } from '../components/TrendingCoin'

export const Home = ({ coins }) => {
	return (
		<div>
			<CoinSearch coins={coins} />
			<TrendingCoin />
		</div>
	)
}
