import { Component } from "react";
import { StyleSheet, StatusBar, SectionList, FlatList, TouchableOpacity, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import cbosUserService from "../services/user.service";
import { ScrollView } from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";

export default class DesktopComponent extends Component {
  twits: Array<any> = [
    {
      type: 3,
      id: 0,
      avatar: "~/app/commons/images/portrait_1.png",
      name: "王丽",
      tweet: "今天很忙!!",
      like: "12",
      comment: "25",
      date: "1月2日",
    },
    {
      type: 3,
      id: 1,
      avatar: "~/app/commons/images/portrait_2.png",
      name: "张孙",
      tweet: "新员工来了!",
      like: "30",
      comment: "5",
      date: "1月2日",
    },
    {
      type: 3,
      id: 2,
      avatar: "~/app/commons/images/portrait_unknown.png",
      name: "亚历克斯",
      tweet: "上次team building活动很有趣",
      like: "10",
      comment: "5",
      date: "1月1日",
    },
    {
      type: 3,
      id: 3,
      avatar: "~/app/commons/images/portrait_3.png",
      name: "张卜",
      tweet: "准备出差去北京",
      like: "10",
      comment: "6",
      date: "2018年12月26日",
    },
    {
      type: 3,
      id: 4,
      avatar: "~/app/commons/images/portrait_1.png",
      name: "王丽",
      tweet: "Coming to Sanya tomorrow!",
      like: "12",
      comment: "25",
      date: "2018年12月20日",
    },
    {
      type: 3,
      id: 5,
      avatar: "~/app/commons/images/portrait_2.png",
      name: "张孙",
      tweet: "明天是迈克的生日",
      like: "30",
      comment: "5",
      date: "2018年11月24日",
    },
    {
      type: 3,
      id: 6,
      avatar: "~/app/commons/images/portrait_1.png",
      name: "王丽",
      tweet: "今天很忙!!",
      like: "12",
      comment: "25",
      date: "1月2日",
    },
    {
      type: 3,
      id: 7,
      avatar: "~/app/commons/images/portrait_2.png",
      name: "张孙",
      tweet: "新员工来了!",
      like: "30",
      comment: "5",
      date: "1月2日",
    },
    {
      type: 3,
      id: 8,
      avatar: "~/app/commons/images/portrait_unknown.png",
      name: "亚历克斯",
      tweet: "上次team building活动很有趣",
      like: "10",
      comment: "5",
      date: "1月1日",
    },
  ];


  state = {
    appsData: [
      { name: "dms", desc: "Document management system", date: new Date() },
      { name: "cms", desc: "content management system", date: new Date() }
    ]
  }

  constructor(props: any) {
    super(props);

  }

  componentDidMount() {
    // StatusBar.setBarStyle('light-content', true)
    //StatusBar.setBackgroundColor("#00A982")

    //changeNavigationBarColor('#00A982', false, true);

    cbosUserService.getLoginedUser().then((r) => {
      if (r && r.pl && r.pl.user && r.pl.user.loginstatus) {
        console.log("user is login");
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  handleItemPress(item: any) {

  }

  formate_date_time(dt: string) {
    if (dt) {
      return dt.toString().substring(0, 10);
    }
    return
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerapps}>


          <FlatList
            horizontal={true}
            data={this.state.appsData}

            renderItem={
              ({ item }) =>

                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => this.handleItemPress(item)}
                >

                  <View style={styles.appiconcontainer}>
                    <Image style={styles.appiconpicture} source={require("../assets/images/logo.png")} />
                    <Text style={styles.appicontitle}> App Name </Text>

                  </View>


                </TouchableOpacity>
            }

            keyExtractor={(item, index) => index.toString()}
          />



        </View>
        <View style={styles.containeradds}>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>

        <View style={styles.containerchannels}>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appiconpicture: {
    marginTop: 10,
    height: 60,
    width: 60
  },
  appicontitle: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center"
  },
  appiconcontainer: {
    alignItems: "center",
    height: "90%",
    width: 100,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  containerScrollView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "gray"
  },
  containerapps: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    //backgroundColor: "red"
  },

  containeradds: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue"
  },
  containerchannels: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
