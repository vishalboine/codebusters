import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../uiControls/Button/Button';
import { increment, decrement } from '../../state/features/counter/counterSlice';

type Props = {}

const Dashboard = (props: Props) => {

    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
  return (
    <section style={{ padding: '4rem' }}>
        <p style={{ marginBottom: '2rem' }}>Count is {count}</p>
        <Button style={{ marginRight: '2rem' }} variant='success' title='Increment' onClick={() => dispatch(increment())} />
        <Button variant='danger' title='Decrement' onClick={() => dispatch(decrement())} />
    </section>
  )
}

export default Dashboard