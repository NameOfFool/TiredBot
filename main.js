const TelegramBot = require('node-telegram-bot-api');
const token = '6332055925:AAFK7xv_415GnnQb6WZyG5S6mrkiWw0sO40';
const bot = new TelegramBot(token, { polling: true });

getMins()
bot.on('message', (msg) => {
  var requests = ["когда эта пара закончится", "когда конец пары?"];
  var response = getMins() + ' ' + getCase(getMins())
  if(requests.includes(msg.text.toString().toLowerCase()))
  bot.sendMessage(msg.chat.id, response); 
});

function getMins()
{
  var currentDate = new Date()
  currentDate = new Date('2000-01-01T' + currentDate.getHours() + ':' + currentDate.getMinutes())
  var schelude = ['10:00:00', '11:40:00', '13:20:00', '15:30:00'].reverse()
  for(let i = 0; i < schelude.length-1; i++)
  {
    let date1 = new Date('2000-01-01T'+schelude[i]).getTime()
    console.log(currentDate.getMinutes())
    let date2 = new Date('2000-01-01T'+schelude[i + 1]).getTime()
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