import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = ( { simplified } ) => {
  const count = simplified ? 10 : 100
  const { data: exchangesList, isFetching } = useGetCryptosQuery(count)
  const exchanges = exchangesList?.data?.coins

  if (isFetching) return <Loader />;

  return (
    <>
      <Row className='exchange-row-container'>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Price</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Link to={`/crypto/${exchange.uuid}`}>
                <Panel
                  className='panel-custom'
                  key={exchange.uuid}
                  showArrow={false}
                  hoverable
                  header={(
                    <Row className="exchange-row" key={exchange.uuid}>
                      <Col span={6}>
                        <Text><strong>{exchange.rank}.</strong></Text>
                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                        <Text><strong>{exchange.name} | {exchange.symbol}</strong></Text>
                      </Col>
                      <Col span={6}>{millify(exchange.marketCap)}</Col>
                      <Col span={6}>${millify(exchange.price)}</Col>
                      <Col span={6}>{millify(exchange.change)}</Col>
                    </Row>
                    )}
                > 
                </Panel>
              </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges