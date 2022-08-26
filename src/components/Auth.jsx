import React, { useEffect, useState } from 'react';
import { useMe } from '../api/queries';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../routes';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@mui/material';
import { api } from '../utils/api';

const Auth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useMe();
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && !isError) {
      navigate(pageRoutes.schedule);
    }
  }, [user, isError]);

  const onSubmit2 = async (event) => {
    event.preventDefault();
    api.get('http://localhost:5001/auth/me');
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    try {
      api
        .post('http://localhost:5001/auth/login', {
          email,
          password,
        })
        .then(() => queryClient.refetchQueries());

      if (false) {
        Cookies.set('access', true);
        navigate(pageRoutes.main);
        queryClient.invalidateQueries();
      } else if (false) {
        toast.error('Invalid details', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      toast.error('Invalid details', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={onSubmit} className="col-lg-6 offset-lg-3 ">
        <div className="row justify-content-center">
          <h1 id="login-message" className="mb-5">
            Zaloguj się
          </h1>
          <label htmlFor="email">
            Email:
            <input
              id="input-email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="input-pass"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary form-control"
            disabled={btnLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
