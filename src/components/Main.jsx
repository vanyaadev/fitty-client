import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../routes';
import Cookies from 'js-cookie';
import { useMe } from '../api/queries';

export default function Main() {
  const navigate = useNavigate();
  const { data: user, isError } = useMe();

  // useEffect(() => {
  //   if (!user || isError) {
  //     navigate(pageRoutes.auth);
  //   }
  // }, [user, isError]);

  return <div>Main page</div>;
}
