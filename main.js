const TelegramBot = require('node-telegram-bot-api');
const token = '6332055925:AAFK7xv_415GnnQb6WZyG5S6mrkiWw0sO40';
const bot = new TelegramBot(token, { polling: true });
bot.on('message', (msg) => {
  var requests = ["когда эта пара закончится", "когда конец пары?"];
  var response = getMins() + ' ' + getCase(getMins())
  if(requests.includes(msg.text.toString().toLowerCase()))
  bot.sendMessage(msg.chat.id, response); 
});
function getMins()
{
  var currentDate = new Date()
  var schelude = ['1000', '1140', '1320', '1530'].reverse()
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
  else if(a % 10 >= 2 && a % 10 <=4)
    return 'минуты'
  else
    return 'минут' 
}