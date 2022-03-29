import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ModalScreen({ navigation }: RootStackScreenProps<'Modal'>) {

  const lang = "zh";
  const uimenu = {
    close: {
      "zh": "关闭",
      "en": "Close"
    }
  }


  const handleClosePress = () => {
    navigation.navigate("Root");
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.containerButton} >
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleClosePress}>
          <Text style={styles.buttonTextStyle} > {uimenu.close[lang]}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 40,
    width: 150,
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 20,
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
  },
  containerButton: {
    backgroundColor: '#E7EAED'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    marginTop: -20,
    backgroundColor: '#E7EAED'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
