/**
 * Created by leo on 12/29/16.
 */
import cbosConfigService from './config.service';
import cbosMessageService from './message.service';

export default class cbosUserService {
      static user: any = null;
  
  constructor(){

   }

  static getCommonHeaders() {
     return { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  }


  static userIsLogin() {
        if (cbosUserService.user && cbosUserService.user.loginstatus) {
            return true;
        }
        else {
         return false;
        }
    }


  static logoutLocalUser() {

    var var_url = "";
    var oHeader = {};
    
    return cbosConfigService.get_organization().then((org)=>{
    var_url = "https://" + org +  cbosConfigService.get_backend_api_urls().app_base_url + cbosConfigService.get_backend_api_urls().restpoint_logout_user; 
    return cbosConfigService.get_user_login_token();
    }).then((token)=>{
      oHeader = {"Content-Type": "application/json", "Accept": "application/json", "token":token};
      return fetch(var_url,{ method:'GET',headers:oHeader});
    }).then((response) => response.json()).then((r) =>{
          if(r && r.pl && r.pl.user && !r.pl.user.loginstatus){
             cbosUserService.user = null;
             cbosConfigService.set_user_login_token("");
          }
          return r;
      }).catch((error) =>{
          console.error(error);
      });

  }


  static loginUser(m:any):Promise<any> {

    var var_org = m.pl.user.org; //cbosConfigService.get_organization();
    //var_org = var_org||"mf";
    var var_url = "https://" + var_org +  cbosConfigService.get_backend_api_urls().app_base_url + cbosConfigService.get_backend_api_urls().restpoint_login_user;
    //console.log("login users ...", var_url, m);

    return fetch(var_url,{ method: 'POST',headers:cbosUserService.getCommonHeaders(), body:JSON.stringify(m)})
    .then((response) => response.json()).then((r) =>{
        //console.log("user login message ",r);
        if(r && r.pl && r.pl.user && r.pl.user.loginstatus && r.pl.token){
          cbosUserService.user = r.pl.user;
          cbosConfigService.set_user_login_token(r.pl.token); 
          cbosConfigService.set_organization(var_org);
         }
       return r;
    }).catch((error) =>{
        console.error(error);
    });


    }

  static getLoginedUser() {
    var var_url = "";
    var oHeader ={};
    //console.log(" on ")
   return cbosConfigService.get_organization().then((org)=>{
       org = org || 'mf';
       var_url = "https://" + org +  cbosConfigService.get_backend_api_urls().app_base_url + cbosConfigService.get_backend_api_urls().restpoint_user_information;
      //console.log(" on ", org);
      return cbosConfigService.get_user_login_token();

    }).then((token)=>{
     
       oHeader = {"Content-Type": "application/json", "Accept": "application/json", "token":token};      
       return fetch(var_url,{method: 'GET',headers:oHeader});

    }).then((response) => response.json()).then((r) =>{
      //console.log("user login message ",r);
      if(r && r.pl && r.pl.user && r.pl.user.loginstatus){
        cbosUserService.user = r.pl.user;
      }

     return r;
  }).catch((error) =>{
      console.error(error);
  });
    

    }


  static  updateUserData(params:any){

      var message = {
        "op": "ups_update_user",
        "pl": {
          "user": params.user
        }
      };
      //console.log(message);
     return cbosMessageService.smessage(message).then((r:any)=>{
      
        console.log("updateUserData", r);

        if(r && r.pl && r.pl.user  && r.pl.user.mb ){
           cbosUserService.user = r.pl.user;
           return r.pl.user;
        }
        
        return null
        //console.log(r);
      });
    
  }



  static  changeUserPass(params:any){
        var message = {
            "op": "ups_changed_user_password",
            "pl": {"user": params.user}
        };
    

        return cbosMessageService.smessage(message).then((r:any)=>{
      
          console.log("updateUserData", r);
    
            if(r && r.pl && r.pl.user && r.pl.user.mb ){
               cbosUserService.user = r.pl.user;
               return r.pl.user;
            }
            
            return null
            //console.log(r);
          });

    }




}

