import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'

import { Cryptocurrencies, News} from '../components'
import Loader from './Loader'
import Exchanges from './Exchanges'

const { Title } = Typography

const Homepage = () => {
  // const [data, isFetching] = useState({})

  // const [loading, setLoading] = useState(true)

  //   useEffect(function() {
  //       async function globalStats() {
  //           const request = await fetch('https://api.coinranking.com/v2/stats', {
  //             method: 'GET',
  //             mode: 'cors',
  //             headers: {
  //               'Coinranking-API-Key': 'coinrankingac2d3c6f3f5bbd57aecd88321b92e0133609e1ea1bbc5355'
  //             }
  //           })
  //           setLoading(true)

  //           const response = await request.json()

  //           isFetching(response)
  //           setLoading(false)
  //       }
  //       globalStats(data?.stats)
  //   }, [])
    const { data, isFetching } = useGetCryptosQuery(10);

    const globalStats = data?.data?.stats
    if(isFetching) return <Loader />

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={2} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Crypto Exchanges</Title>
        <Title level={2} className="show-more"><Link to="/exchanges">Show More</Link></Title>
      </div>
      <Exchanges simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={2} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage