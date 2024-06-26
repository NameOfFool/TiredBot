const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

let count = 0
let buffer = ""

bot.on('message', (msg) =>{
  var requests = ["когда", "пара", "кончится", "?"]
  let check = true
  for (let word of requests){
    if(!msg.text.toString().toLowerCase().includes(word)){
      check = false;
      break;
    }
  }
  if(check)
    sendTimeMessage(msg)
})
bot.onText(/\/left/, sendTimeMessage)
bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome");
  
});
        

function getMins()
{
  var currentDate = new Date()
  var schelude = ['1000', '1140', '1320', '1530', '1710'].reverse()
  for(let i = 0; i < schelude.length-1; i++)
  {
    let date1 = structuredClone(currentDate).setHours(schelude[i].substring(0,2), schelude[i].substring(2,4))
    let date2 = structuredClone(currentDate).setHours(schelude[i + 1].substring(0,2), schelude[i + 1].substring(2,4))
    if(currentDate.getTime() < date1  && currentDate.getTime() > date2)
    {
      return Math.floor(date1 - currentDate.getTime())/(1000*60)
    }
  } 
  return -1;
}

function getCase(a)
{
  if(a % 10 == 1 && a % 100 !=11)
    return 'минута'
  else if(a % 10 >= 2 && a % 10 <=4 && (a % 100 <= 10 || a % 100 > 20))
    return 'минуты'
  else
    return 'минут' 
}
function sendTimeMessage(msg){ 
  var response = getMins() + ' ' + getCase(getMins())
  if(response==buffer)
    count+=1
  buffer = response
  switch(count){
  case 1:
    response+="!"
    break;
  case 2:
    response = response.toUpperCase()+"!!!"
    count = 0;
    buffer = ""
    break;
}
  bot.sendMessage(msg.chat.id, response);
}