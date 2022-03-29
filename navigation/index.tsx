/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image, StyleSheet, Text } from 'react-native';

//import { createDrawerNavigator } from '@react-navigation/drawer'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import DesktopComponent from '../screens/DesktopComponent';
import WorkflowsComponent from '../screens/WorkflowsComponent';
import SettingsComponent from '../screens/SettingsComponent';
import DocumentsComponent from '../screens/DocumentsComponent';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginComponent from '../screens/LoginComponent';

import cbosUserService from "../services/user.service";

import ModalScreen from '../screens/ModalScreen';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  const colorScheme = useColorScheme();

  const uimenu = {
    settings: {
      "zh": "配置",
      "en": "Settings"
    },
    desktop: {
      "zh": "桌面",
      "en": "Desktop"
    },
    workflow: {
      "zh": "任务",
      "en": "Tasks"
    },
    documents: {
      "zh": "笔记",
      "en": "Notes"
    }
  }
  const _lang = "zh";

  const handleSubmitPress = (navigation: any, screenlocation: string) => {
    //alert("hello");
    navigation.navigate('Modal')
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Desktop"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Desktop"
        component={DesktopComponent}
        options={({ navigation }: RootTabScreenProps<'Desktop'>) => ({
          title: uimenu.desktop[_lang],
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <TabBarIcon name="th" color="#FFFFFF" />
            }
            else {
              return <TabBarIcon name="th" color="#000000" />
            }
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#00A982',
            height: 90
          },
          headerTitleAlign: "center",
          headerLeft: ({ }) => {
            return <Image style={styles.tinyLogo} source={require("../assets/images/logo.png")} />
          },
          headerRight: ({ }) => {
            return <Text onPress={() => { handleSubmitPress(navigation, 'desktop') }}><TabBarIcon name="bars" color="#FFFFFF" /> </Text>
          },
          headerRightContainerStyle: {
            marginRight: 16
          },
          tabBarStyle: {
            backgroundColor: '#00A982',
          }
        })}
      />

      <BottomTab.Screen
        name="Workflows"
        component={WorkflowsComponent}
        options={({ navigation }: RootTabScreenProps<'Workflows'>) => ({
          title: uimenu.workflow[_lang],
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <TabBarIcon name="list-ul" color="#FFFFFF" />
            }
            else {
              return <TabBarIcon name="list-ul" color="#000000" />
            }
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#00A982',
            height: 90,
            //alignSelf: 'center'
          },
          headerTitleAlign: "center",
          headerLeft: ({ }) => {
            return <Image style={styles.tinyLogo} source={require("../assets/images/logo.png")} />
          },
          headerRight: ({ }) => {
            return <Text onPress={() => { handleSubmitPress(navigation, 'workflows') }}><TabBarIcon name="bars" color="#FFFFFF" /> </Text>
          },
          headerRightContainerStyle: {
            marginRight: 16
          },
          tabBarStyle: {
            backgroundColor: '#00A982',
          },
          tabBarBadge: 3
        })}
      />

      <BottomTab.Screen
        name="Documents"
        component={DocumentsComponent}
        options={({ navigation }: RootTabScreenProps<'Documents'>) => ({
          title: uimenu.documents["zh"],
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <TabBarIcon name="file-text-o" color="#FFFFFF" />
            }
            else {
              return <TabBarIcon name="file-text-o" color="#000000" />
            }
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#00A982',
            height: 90
          },
          headerTitleAlign: "center",
          headerLeft: ({ }) => {
            return <Image style={styles.tinyLogo} source={require("../assets/images/logo.png")} />
          },
          headerRight: ({ }) => {
            return <Text onPress={() => { handleSubmitPress(navigation, 'documents') }}><TabBarIcon name="bars" color="#FFFFFF" /> </Text>
          },
          headerRightContainerStyle: {
            marginRight: 16
          },
          tabBarStyle: {
            backgroundColor: '#00A982',
          }
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsComponent}
        options={({ navigation }: RootTabScreenProps<'Settings'>) => ({
          title: uimenu.settings["zh"],
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <TabBarIcon name="cog" color="#FFFFFF" />
            }
            else {
              return <TabBarIcon name="cog" color="#000000" />
            }
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#00A982',
            height: 90
          },
          headerTitleAlign: "center",
          headerLeft: ({ }) => {
            return <Image style={styles.tinyLogo} source={require("../assets/images/logo.png")} />
          },
          headerRight: ({ }) => {
            return <Text onPress={() => { handleSubmitPress(navigation, 'settings') }} ><TabBarIcon name="bars" color="#FFFFFF" /> </Text>
          },
          headerRightContainerStyle: {
            marginRight: 16
          },
          tabBarStyle: {
            backgroundColor: '#00A982'
          }
        })}
      />

    </BottomTab.Navigator>
  );
}




// const Drawer = createDrawerNavigator<any>();
// function sbosDrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Workflows" component={WorkflowsComponent} />
//       <Drawer.Screen name="Documents" component={DocumentsComponent} />
//     </Drawer.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  menubar: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  logo: {
    width: 66,
    height: 58,
  },
});
