// digfusion

import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";

import { config } from "./config.js";

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: config.openai[0].apiKey,
	organization: config.openai[0].organization,
});

import {
	sendDataAboutText,
	sendDataAboutButton,
	sendDataAboutError,
	sendDataAboutDataBase,
} from "./tgterminal.js";

// digfusion

const TOKEN = config.TOKENs[0]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

const qu1z3xId = "923690530";
const bogdanId = "814979361";

let BotName = "metod_bot";

let usersData = [];

let match = null;

const weekDays = [
	{
		name: "Пн",
		fullName: "Понедельник",
	},
	{
		name: "Вт",
		fullName: "Вторник",
	},
	{ name: "Ср", fullName: "Среда" },
	{
		name: "Чт",
		fullName: "Четверг",
	},
	{
		name: "Пт",
		fullName: "Пятница",
	},
	{
		name: "Сб",
		fullName: "Суббота",
	},
	{
		name: "Вс",
		fullName: "Воскресенье",
	},
];

bot.setMyCommands([
	{
		command: "/restart",
		description: "Начальное меню 🏠",
	},
]);

async function firstMeeting(chatId, stageNum = 1) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		dataAboutUser.action = `firstMeeting${stageNum}`;

		switch (stageNum) {
			case 1:
				await bot.sendMessage(
					chatId,
					`<b>Метóдис на связи! 😉\n\n<b>Ваш ИИ-помощник в познании Метода Юлии Ивлиевой</b>\n\n</b>`,
					{
						parse_mode: "HTML",
						disable_web_page_preview: true,
					}
				);

				firstMeeting(chatId, 2);

				break;
			case 2:
				await bot
					.sendMessage(
						chatId,
						`Давайте <b>начнем знакомство!\n\nНапишите, как можно к вам обращаться ✍️</b>`,
						{
							parse_mode: "HTML",
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: `Оставить ${dataAboutUser.login} ☑️`,
											callback_data: `firstMeeting3`,
										},
									],
								],
							},
						}
					)
					.then((message) => {
						dataAboutUser.messageId = message.message_id;
					});
				break;
			case 3:
				await bot.editMessageText(
					`<b>${dataAboutUser.login},</b> очень прятно! 😁\n\nНа <b>этом этапе,</b> я попрошу <b>вас</b> предоставить <b>номер телефона</b>. 😊`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						// reply_markup: {
						// 	inline_keyboard: [[{ text: "", callback_data: "-" }]],
						// },
					}
				);

				await bot
					.sendMessage(chatId, `Используйте <b>удобное автозаполнение! ⬇️</b>`, {
						parse_mode: "HTML",
						disable_web_page_preview: true,
						reply_markup: {
							keyboard: [
								[
									{
										text: "Автозаполнить номер",
										request_contact: true,
										resize_keyboard: true,
									},
								],
							],
						},
					})
					.then((message) => {
						dataAboutUser.messageIdOther = message.message_id;
					});

				break;

			case 4:
				menu(chatId, true);
				break;
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function menu(chatId, afterFirstMeeting = false) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		const dateNowHHNN = new Date().getHours() * 100 + new Date().getMinutes();
		let textToSayHello = "";

		if (dateNowHHNN < 1200 && dateNowHHNN >= 600) textToSayHello = "Доброе утро";
		else if (dateNowHHNN < 1700 && dateNowHHNN >= 1200) textToSayHello = "Добрый день";
		else if (dateNowHHNN < 2200 && dateNowHHNN >= 1700) textToSayHello = "Добрый вечер";
		else if (dateNowHHNN >= 2200 || dateNowHHNN < 600) textToSayHello = "Доброй ночи";

		dataAboutUser.supportiveCount = 1;

		dataAboutUser.action = "menu";

		await bot.editMessageText(
			`${
				afterFirstMeeting
					? `<b>${dataAboutUser.login}, рад знакомству! 🙏</b>`
					: `<b>${textToSayHello}, ${dataAboutUser.login}! </b>`
			}\n\n<blockquote><b>Готов проконсультировать вас по системе Метод в реальном времени — просто задайте вопрос!\n\nИли зайдите в раздел "Пообщаться" 😊</b></blockquote>\n\n<b>Куда хотите попасть?</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							dataAboutUser.currentSession?.type == "trainingSession"
								? {
										text: `Вернуться к текущей сессии ▶️`,
										callback_data: `currentTrainingSession`,
								  }
								: {
										text: `Тренировка сессии с ИИ 🧠`,
										callback_data: `menuTrainingSession`,
								  },
						],
						[
							{
								text: `База знаний 📚`,
								callback_data: `trainingMaterials`,
							},
							{
								text: `Про Метод 🤔`,
								callback_data: `moreAbout`,
							},
						],
						[
							{
								text: `Помощь с запросом клиента 🤕`,
								callback_data: `menuHelpSession`,
							},
						],
						[
							{
								text: `Профиль 🤵‍♂️`,
								callback_data: `profile`,
							},
							{
								text: `Пообщаться 🗣️`,
								callback_data: `menuTalkingSession`,
							},
						],
					],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

// ❗ the rest of the code is commercial and not shown

//

// total lines of code: 1500

//

StartAll();

// digfusion
