/**
 * Created by leo on 12/27/16.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

export default class cbosConfigService {
  enable_push_services: boolean = true;
  enable_offline_mode: boolean = false;
  active_qr_code_id: string = "";
  qr_code_IDs_List = [];
  qr_code_id_observer = null;
  static current_qr_code:string = "";

  static backend_api_urls: any = {
    restpoint_file_upload: "/api/file/upload.cjson",
    restpoint_photo_upload: "/api/mphotos/upload.cjson",
    restpoint_user_information: "/api/user.cjson",
    restpoint_login_user: "/api/applogin.cjson",
    restpoint_logout_user: "/api/logout.cjson",
    restpoint_verify_user: "/api/existinguser.cjson",
    restpoint_register_user: "/api/register.cjson",
    restpoint_weichat_login: "/api/wechat",
    restpoint_esb: "/wms/message.cjson",
    restpoint_public_data: "/api/shopdata.cjson",
    socket_base_url: ".sbos.vip",
    app_base_url: ".sbos.vip",
  };

  constructor() {}

  static get_backend_api_urls(): any {
    return cbosConfigService.backend_api_urls;
  }
  static set_current_qr_code(qrcode:string){
    cbosConfigService.current_qr_code = qrcode;
  }

  static get_current_qr_code(){
    return cbosConfigService.current_qr_code;
  }


  // static get_organization(): string {
  //   return "";
  // }

  // static set_organization(org: string): void {}

  // static get_user_login_token():string {
  //   return ""
  // }
  // static set_user_login_token(token:string):void {
  //   AsyncStorage.setItem('token',token);
  // }

  static set_organization = async (org: string) => {
    try {
      await AsyncStorage.setItem("@org", org);
    } catch (e) {
      // saving error
    }
  };

  static get_organization = async () => {
    try {
      const value = await AsyncStorage.getItem("@org");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };


  static set_user_login_token = async (token: string) => {
    try {
      await AsyncStorage.setItem("@apptoken", token);
    } catch (e) {
      // saving error
    }
  };

  static get_user_login_token = async () => {
    try {
      const value = await AsyncStorage.getItem("@apptoken");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  static transformDateTime(date: string): string {
    if (!date || typeof date.slice != "function") {
      return "";
    }
    var formattedDate = new Date(date);
    return date.slice(0, 10) + "  " + formattedDate.toString().slice(16, 21);
  }

  static transformDate(date: string): string {
    if (!date || typeof date.slice != "function") {
      return "";
    }
    var formattedDate = new Date(date);
    return date.slice(0, 10);
  }

  static fillDateWithZero(num: any) {
    if (isNaN((num = parseInt(num, 10)))) {
      return null;
    }
    return num > 0 && num < 10 ? "0" + num : num;
  }

  static formatDateTime(originalDateTime: any) {
    if (!(originalDateTime instanceof Date)) {
      if (!originalDateTime || originalDateTime.trim() === "") {
        return null;
      }
    }
    const date = new Date(originalDateTime);
    return (
      `${date.getFullYear()}-${cbosConfigService.fillDateWithZero(
        date.getMonth() + 1
      )}-${cbosConfigService.fillDateWithZero(date.getDate())}` +
      ` ${cbosConfigService.fillDateWithZero(
        date.getHours()
      )}:${cbosConfigService.fillDateWithZero(date.getMinutes())}`
    );
  }

  static weekDayTranslator(num: any) {
    switch (num) {
      case "0":
        return "周日";
      case "1":
        return "周一";
      case "2":
        return "周二";
      case "3":
        return "周三";
      case "4":
        return "周四";
      case "5":
        return "周五";
      case "6":
        return "周六";
    }
  }
}
