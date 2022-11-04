import React from 'react';
import {Switch, Redirect } from 'react-router-dom';

export const Routes: React.FC = () => (
  <Switch>
    <Redirect to="/Login"/>
  </Switch>
);
