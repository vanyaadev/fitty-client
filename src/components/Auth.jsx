import React, { useEffect, useState } from 'react';
import { useMe } from '../api/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../routes';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { Link } from '@mui/material';

const Auth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useMe();
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && !isError) {
      navigate(pageRoutes.main);
    }
  }, [user, isError]);

  const onSubmit = async event => {
    event.preventDefault();
    setBtnLoading(true);
    try {
      //const resp = await getTokenByPassword(email, password);
      //const resp = await api.get(
      //'https://github.com/login/oauth/authorize?client_id=f7eae16f4bf63f8a2736&redirect_uri=http://localhost:4000/github?scope=user:email'
      //);
      window.location.href =
        'https://github.com/login/oauth/authorize?client_id=f7eae16f4bf63f8a2736&redirect_uri=http://localhost:4000/github?scope=user:email';

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={onSubmit} className="col-lg-6 offset-lg-3 ">
      <Link
        href={
          'https://github.com/login/oauth/authorize?client_id=f7eae16f4bf63f8a2736&redirect_uri=http://localhost:4000/github?scope=user:email'
        }
      >
        <span>Sign in with GitHub</span>
      </Link>
      <div className="row justify-content-center">
        <h1 id="login-message" className="mb-5">
          Zaloguj się
        </h1>
        <label htmlFor="email">
          Email:
          <input
            id="input-email"
            type="email"
            onChange={e => {
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
            onChange={e => {
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
  );
};

export default Auth;
