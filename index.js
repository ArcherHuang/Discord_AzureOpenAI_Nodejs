require('dotenv').config()
const { openAIPrompt } = require('./Service/openAI');

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  console.log(`使用者發送的訊息：${message.content}`);
  if (message.author.bot) return;
  const response = await openAIPrompt(message.content);
  message.reply(response);
});

client.login(process.env.DISCORD_TOKEN);