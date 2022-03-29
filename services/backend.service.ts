import cbosMessageService from './message.service';

export default class backendService {

  
 static read_table_rows(params:any){
   console.log("Read data from back end ")
    return params;
  }

 static query_table_row_data(params:any) {
 
      var message = {
        "ios": true,
        "sqm": params.sqm,
        "op": "ams_read_table_row",
        "pl": {
          "row": {}
        }
      };

     return  cbosMessageService.smessage(message).then((r:any)=>{
        if(r && r.pl && r.pl.row){
          return r.pl.row;
        }
        else{
          return null;
        }
      })
  }


  static  update_or_create_row_data(params:any){
 
    var new_row =  {
      "parent": params.tid,
      "vr": "1",
      "rs":{
       "sl":40
     },
      "rdt": { "en": params.rdata}
    };
 
    var message = {
      "op": "ams_update_create_table_row",
      "iop": true,
      "sqm": {"tid": params.tid, "rtid":params.rtid, lang: "en"},
      "filters":{
       "rdt.en.zdry.key":params.rdata.zdry.key,
       "rdt.en.bgdh.key":params.rdata.bgdh.key
      },
      "pl": {
        "row": new_row
      }
    };

    //console.log("data create or udpate", message);

    return cbosMessageService.smessage(message).then((r:any) => {
      //console.log("Create or update reply", r);
      
        if(r && r.pl && r.pl.row){
           return r.pl.row;
        }
        else {
         return null;
        }

      }); 
  
 
  }
 
   
 static get_qr_codes_history(params:any) {
  
          var message:any = {
            "ios": true,
            "sqm": {"tid": params.tid, ps: params.ps, pn: params.pn},
            "op": "ams_read_table_rows",
            "pl": {
              "rows": {}
            }
          };
          
          if(params.vt ){
            message.sqm.vt = params.vt;
          }
          if(params.vid){
            message.sqm.vid = params.vid;
          }

          if(params.bizueid){ // for getting the qr code of a particular business user 
            message.sqm["rdt.en.zdry.key"] = params.bizueid;
          }

         return cbosMessageService.smessage(message).then((r:any) => {
            
           if(r && r.pl && r.pl.rows && r.pl.rows.length){
             return r.pl.rows;
           }
           else {
             return null;
           }
          
          });

  }

 

 static trigger_cbos_osi_ygbgmx_commit(params:any){
 
    var message = {
      "co": "cbos_osi_ygbgmx_commit",
      //"sqm": {"tid": "60632d08a7ce760b7aea3ac6", "rtid":"chzx6y4ifpa", lang: "en"}, // table ID is not needed here. this could be supplied in the backend 
      // "pl": {
      //   "row": params.row
      // },
      cl:{
        row: params.row
      }
    };
 
   
   return cbosMessageService.smessage(message).then((r:any) => {
        //console.log("trigger_cbos_osi_ygbgmx_commit", r);
        if(r && r.pl && r.pl.row ){
          return r.pl.row; 
        }
        else {
          return null;
        }
      });
  }

 static query_table_rows_data(params:any) {
    var that = this;

      var message = {
        "sqm": params.sqm,
        "op": "ams_read_table_rows",
        "pl": {
          "rows": {}
        }
      };

      return cbosMessageService.smessage(message).then((r:any) => {

        if(r && r.pl && r.pl.rows){
          return  r.pl.rows;
        }
        else{
         return null
        }

      });

  }


static  create_new_row_data(params:any){
 
    var new_row =  {
      "parent": params.tid,
      "vr": "1",
      "rs":{
       "sl":40
     },
      "rdt": { "en": params.rdata}
    };
 
    var message = {
      "op": "ams_create_table_row",
      "iop": true,
      "sqm": {"tid": params.tid, "rtid":params.rtid, lang: "en"},
      "pl": {
        "row": new_row
      }
    };
 
    return cbosMessageService.smessage(message).then((r:any) => {
        //console.log(r);
        if(r && r.pl && r.pl.row){
         return r.pl.row;
        }
        else{
          return null
         }
  
      }); 
    }
 
  }


 

