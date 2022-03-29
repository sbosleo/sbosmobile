
import cbosConfigService from './config.service';

export default class cbosMessageService {

  constructor(){
   
  }

 static pmessage(m: any) { //public endpoint communication message

  var var_token:any = "";

  return cbosConfigService.get_user_login_token().then((token)=>{
     var_token = token;
     return cbosConfigService.get_organization();
  }).then((org)=>{
    var message = {
      "m": {
        "dns": "wms",
        "sns": "spa",
        "vr": "1.0.0",
        "op": m.op,
        "wf": m.wf,
        "pl": m.pl,
        "co": m.co,
        "cl": m.cl,
        "sqm": m.sqm,
        "ios": m.ios,
        "iop": m.iop,
        "filters":m.filters,
      }
    };

    var var_url = "https://" + org +  cbosConfigService.get_backend_api_urls().app_base_url + cbosConfigService.get_backend_api_urls().restpoint_public_data;
    var oHeader:any = {'Content-Type': 'application/json', 'Accept': 'application/json', 'token': var_token};
    return fetch(var_url,{ method: 'POST', headers:oHeader, body:JSON.stringify(message)});

  }).then((response) => response.json()).then((r) =>{
      //console.log(" pmessage ", r);
      return r;  
    }).catch((error) =>{
        console.error(error);
    });
    
  }


 static smessage(m: any) { //Secucred end point communication message

  var var_org:any = "";
  
  return cbosConfigService.get_organization()
  .then((org)=>{
    var_org = org;
    return cbosConfigService.get_user_login_token();
  }).then((token)=>{
    var message:any = {
      "m": {
        "dns": "wms",
        "sns": "spa",
        "vr": "1.0.0",
        "op": m.op,
        "wf": m.wf,
        "pl": m.pl,
        "co": m.co,
        "cl": m.cl,
        "filters":m.filters,
        "sqm": m.sqm,
        "ios": m.ios,
        "iop": m.iop,
      }
    };

    var var_url = "https://" + var_org +  cbosConfigService.get_backend_api_urls().app_base_url + cbosConfigService.get_backend_api_urls().restpoint_esb;
    var oHeader:any = {"Content-Type": "application/json", "Accept": "application/json", "token": token};
    return fetch(var_url,{ method: 'POST',headers:oHeader, body:JSON.stringify(message)});

  })
  .then((response) => response.json()).then((r) =>{   
    //console.log("smessage ", r);
    return r;
   }).catch((error) =>{
       console.error(error);
   });
  }



}
