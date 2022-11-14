const PUrl = "Dc WebHookLink";
const Sheetid = 'GoogleSheetID'

var ss = SpreadsheetApp.openById(Sheetid)
var sheet = ss.getSheetByName("JoinRes");
var Range = sheet.getDataRange().getValues();
var dateS;

var item = [];


function onEdit(e) {

  var Lr = sheet.getLastRow();
  Range[Lr-1].forEach(toJson);

  DcExecute(item)

}

function toJson(self,ind){

  if(ind == 0){

    dateS = self;

  }else if(ind == 1){
    var Obj = {
      "name": Range[0][ind],
      "value": self,
      "inline": false
    }
    //Obj[Range[0][ind]] = self;
    item.push(Obj);

  }else{

    var Obj = {
      "name": Range[0][ind],
      "value": self,
      "inline": true
    }
    //Obj[Range[0][ind]] = self;
    item.push(Obj);

  }

}

function DcExecute(self){
  
  var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify({
            "content": "‌‌‌",
            "embeds": [{
                "title": "Knock! Knock! Someone Joining Da Club",
                "description": "มีสมาชิกใหม่ประสงค์จะเข้าชมรม คร้าบ",
                "thumbnail": {
		                "url": 'https://i.imgur.com/8mbTi4p.png',
	              },
                "color": 33023,
                "fields": self,
                "footer": {
                    "text": "Timestamp (GMT+7): "+ dateS
                }
            }]
        })
    };

    Logger.log(options);
    UrlFetchApp.fetch(PUrl, options);

}
