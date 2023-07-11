import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../../state/features/counter/counterSlice';

type Props = {}

const Dashboard = (props: Props) => {

    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
  return (
    <section style={{ padding: '4rem' }}>
        <p style={{ marginBottom: '2rem' }}>Count is {count}</p>
    </section>
  )
}

export default Dashboard