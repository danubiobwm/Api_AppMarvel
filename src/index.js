import React from 'react';
import '~/components/statusBarConfig';
import './config/ReactotronConfig';
import Routes from './routes';

console.disableYellowBox = true;

export default function App() {
  return <Routes />;
}
