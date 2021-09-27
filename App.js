/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [glucoseDate, setGlucoseDate] = useState('');

  function _onPressButton() {
    /* Permission options */
    const permissions = {
      permissions: {
        // read: [AppleHealthKit.Constants.Permissions.HeartRate],
        write: [AppleHealthKit.Constants.Permissions.BloodGlucose],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      /* Can now read or write to HealthKit */

      // const options = {
      //   startDate: new Date(2020, 1, 1).toISOString(),
      // };

      // AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
      //   /* Samples are now collected from HealthKit */
      // });
    });
  }

  function startImportGlucose() {
    BackgroundTimer.runBackgroundTimer(() => {
      const rndInt = Math.floor(Math.random() * 15) + 2;
      let input = {
        value: rndInt, //mmol/l
        startDate: new Date().toISOString(), // Optional, defaults to now
        endDate: new Date().toISOString(), // Optional, defaults to startDate
        unit: 'mmolPerL', // Optional, defaults to mmolPerL
      };
      setGlucoseDate(input.startDate);
      AppleHealthKit.saveBloodGlucoseSample(input, (err, result) => {
        if (err) {
          console.log(err);

          return;
        }
        // blood glucose successfully saved
        console.log('saved blood glucose: ', result);
      });
    }, 300000);
  }

  function stopImportGlucose() {
    BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>last glucose point saved at: </Text>
        <Text>{glucoseDate}</Text>
        <View contentInsetAdjustmentBehavior="automatic" style={styles.View}>
          <Button
            style={styles.buttonBla}
            onPress={_onPressButton}
            title="Allow Permission"
          />
          <Button
            style={styles.buttonBla}
            onPress={startImportGlucose}
            title="import Glucose to health"
          />
          <Button
            style={styles.buttonBla}
            onPress={stopImportGlucose}
            title="stop import Glucose to health"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',

    height: '100%',
  },
  buttonBla: {
    backgroundColor: 'red',
    color: 'green',
    marginTop: 100,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
