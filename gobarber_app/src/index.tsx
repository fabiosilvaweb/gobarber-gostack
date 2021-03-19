import React from 'react';
import {StatusBar, View} from 'react-native';

const App = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: '#312E38',
          flex: 1,
        }}
      />
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
    </>
  );
};

export default App;
