import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, isAdded, isDeleted, message } =
    useSelector((state) => state.goals);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getGoals());
    }

    if (isAdded && message) {
      console.log(message);
      toast.success(message + ' added successfully');
    }

    // if (!isAdded && message) {
    //   console.log(message);
    //   toast.error(message + ' deleted');
    // }

    if (isDeleted && message) {
      console.log(message);
      toast.error(message + ' deleted');
    }

    if (isError) {
      console.log(message);
      toast.error(message);
    }

    dispatch(reset());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, isAdded, isDeleted, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
