import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import commonStyles from '@styles/commonStyles';
import {boxShadow, scaleFont} from '@styles/mixins';
import {LIGHT_BLUE} from '@styles/colors';
import {getVersion} from 'react-native-device-info/src/index';

class AboutAppScreen extends Component {
  curVersion = getVersion();

  render() {
    return (
      <SafeAreaView edges={['bottom']} style={[commonStyles.container]}>
        <View style={styles.container}>
          <View>
            <View style={styles.tradesContainer}>
              <Text style={styles.tradesTitle}>TRADES</Text>
              <View style={styles.version}>
                <Text style={styles.title}>Версия</Text>
                <Text style={styles.date}>{this.curVersion}</Text>
              </View>
              <View style={styles.version}>
                <Text style={styles.title}>Дата выпуска</Text>
                <Text style={styles.date}>26.10.21</Text>
              </View>
              <Text style={styles.aup}>AUP-Company</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
  },
  tradesTitle: {
    fontSize: scaleFont(40),
    fontWeight: '600',
    paddingBottom: 50,
  },
  tradesContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingTop: 50,
    height: '100%',
    ...boxShadow('#969696'),
    borderRadius: 6,
  },
  headerBtns: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,
  },
  version: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E2EA',
  },
  title: {
    fontWeight: '600',
  },
  aup: {
    color: '#A4A7BA',
    position: 'absolute',
    bottom: 10,
  },
});
