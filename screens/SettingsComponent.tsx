import { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import cbosUserService from "../services/user.service";
import cbosConfigService from '../services/config.service';

export default class SettingsComponent extends Component {
  state: {
    user: any,
  }

  uimenu: any = {
    logout: {
      "zh": "登出",
      "en": "Logout"
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };

    //const [userOrg, setUserOrg] = useState('');
    // const[userName, setUserName] = useState('');
    // const[userLogin, setUserLogin] = useState('');
    // const[userMobile, setUserMobile] = useState('');
    // const[userRole, setUserRole] = useState('');
    // const[userAvater, setUserAvatar] = useState('');
    // const[userPassword, setUserPassword] = useState('');
    // const[showImage, setShowImage] = useState(false);
    // const[errortext, setErrortext] = useState('');
    // const passwordInputRef = createRef();
  }


  componentDidMount() {

    cbosUserService.getLoginedUser().then((r) => {
      if (r && r.pl && r.pl.user && r.pl.user.loginstatus) {

        cbosConfigService.get_organization().then((org) => {
          if (org) {
            r.pl.user.avatar = "https://" + org + cbosConfigService.get_backend_api_urls().app_base_url + "/" + r.pl.user.avatar;
            //this.state.user.avatar = var_url;
            this.setState({ user: r.pl.user });
            console.log("avatar url", this.state.user.avatar);
            console.log("username", this.state.user.ul);

          }
        })

      }
      else {
        console.log("user is not login here")
        this.props.navigation.navigate('Login');
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <View style={styles.containerPicture}>
            {this.state.user.avatar && <Image style={styles.picture} source={{ uri: this.state.user.avatar }} />}
          </View>

          <View style={styles.containerStatus}>
            <Text style={{ fontSize: 16, marginTop: 5 }}>{this.state.user.fullname}{'/'}{this.state.user.role}</Text>
            <Text style={{ fontSize: 12 }}>{this.state.user.username}</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.handleLogoutPress}>
              <Text style={styles.buttonTextStyle} > {this.uimenu.logout[this.state.user.ul]}</Text>
            </TouchableOpacity>

          </View>

        </View>
        {/* <Text style={styles.title}>Settings</Text> */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

  handleLogoutPress = () => {
    cbosUserService.logoutLocalUser().then((r) => {
      if (r && r.pl && r.pl.user && !r.pl.user.loginstatus) {
        this.props.navigation.navigate('Login');
      }
    });
  }

}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#eee',
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
  picture: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7EAED'
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: '#FFFFFF',
    width: "100%",
    height: 100,
    marginTop: 0
  },
  containerPicture: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 100,
    marginLeft: 10
  },
  containerStatus: {
    flex: 2,
    alignItems: "flex-start",
    backgroundColor: '#FFFFFF',
    height: 100,
    marginLeft: 10,
    marginRight: 10
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
