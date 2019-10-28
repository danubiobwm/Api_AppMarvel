import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.85.197.142' })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}

// 192.168.1.15
