// digfusion

import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";

import { config } from "./config.js";

import OpenAI from "openai";

import CryptoJS from "crypto-js";

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

const TOKEN = config.TOKENs[1]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

const qu1z3xId = "923690530";
const bogdanId = "814979361";

let BotName = "neuro_method_bot";

let usersData = [];
// let memberEmails = [
// 	"tarutinatusia@mail.ru",
// 	"Irashchirova@mail.ru",
// 	"evdokimowa.ol@yandex.ru",
// 	"Viktori11091983@gmail.com",
// 	"Irinanpf@mail.ru",
// 	"cmetaninaolga@bk.ru",
// 	"alisa-lu@list.ru",
// 	"mansts@yandex.ru",
// 	"rabota3838k@mail.ru",
// 	"kristinasadova@gmail.com",
// 	"alezzirealezzire@gmail.com",
// 	"Afanasyevaa@inbox.ru",
// 	"Indigo0206@gmail.com",
// 	"Chertovasvetlana81@mail.ru",
// 	"Rusalo4ka-25@mail.ru",
// 	"nadydommax@mail.ru",
// 	"lioa@inbox.ru",
// 	"A.x.i.n.y.a.g.o.g@gmail.com",
// 	"natalia.miller.schreiber@gmail.com",
// 	"N_galizina@mail.ru",
// 	"natalimelnichenko12@gmail.com",
// 	"missdzuba@inbox.ru",
// 	"natali-mv555@yandex.ru",
// 	"svetochek720@mail.ru",
// 	"elli-taro@mail.ru",
// 	"Z1mukimova@gmail.com",
// 	"rabota.e.a.d@yandex.ru",
// 	"milledy02@yandex.ru",
// 	"f-s-v1983@mail.ru",
// 	"deva.eva1@yandex.ru",
// 	"izmaylovams@yandex.ru",
// 	"Oliya.belova@yandex.ru",
// 	"dolginaelena0@gmail.com",
// 	"tgalkina@gmail.com",
// 	"kseniablake@gmail.com",
// 	"gnm.gk@web.de",
// 	"feneva-sochi@mail.ru",
// 	"nadyastas342@list.ru",
// 	"Cetrina@inbox.ru",
// 	"Tanya_nik2004@mail.ru",
// 	"Akyznetsova495@gmail.com",
// 	"vladima23@mail.ru",
// 	"i.aroslankina@yandex.ru",
// 	"natalysam77@icloud.com",
// 	"katavdeeva@gmail.com",
// 	"gorodz17@yandex.ru",
// 	"Palisa2003@mail.ru",
// 	"frolga2003@mail.ru",
// 	"pyshihvost@rambler.ru",
// 	"snkovalenko.67@mail.ru",
// 	"elevichmasha@gmail.com",
// 	"5800607@mail.ru",
// 	"Ir.gromova53@gmail.com",
// 	"sveta135531@mail.ru",
// 	"anastasiya070@gmail.com",
// 	"k.a.kuzmina@mail.ru",
// 	"Leon13256@mail.ru",
// 	"Magicmaris@yandex.ru",
// 	"Olga2290@mail.ru",
// 	"nkapustyanskaya@gmail.com",
// 	"saburova.saburova-sasha2016@yandex.ru",
// 	"zolotov-ivan95@rambler.ru",
// 	"irena.mia@yandex.ru",
// 	"dolche97@inbox.ru",
// 	"79647965677@yandex.ru",
// 	"egorova.dv@yandex.ru",
// 	"n.shtanina@mail.ru",
// 	"nataschulka.43@mail.ru",
// 	"super.parchina@yandex.ru",
// 	"anechka.agapova@list.ru",
// 	"kotovamargaritaed@yandex.ru",
// 	"Aliya424@rambler.ru",
// 	"bakulinBlowfish@mail.ru",
// 	"natalia.catapano@aol.com",
// 	"ek.guzovskaya@ya.ru",
// 	"mamaivana02@icloud.com",
// 	"nadia_t@mail.ru",
// 	"elena.kuksenok@yandex.ru",
// 	"maya.adambaeva8625@gmail.com",
// 	"Marinasann1111@mail.ru",
// 	"alekszhol@mail.ru",
// 	"Mercurievat19@gmail.com",
// 	"petyadobrinova@gmail.com",
// 	"eleanared@mail.ru",
// 	"Maliunia81@mail.ru",
// 	"natycek@mail.ru",
// 	"5993000@mail.ru",
// 	"vergine1@gmx.ch",
// 	"05zou05@gmail.com",
// 	"angela.dobinda@gmail.com",
// 	"nirvandi@gmail.com",
// 	"weronikadavydzik777@gmail.com",
// 	"Lenutza888@gmail.com",
// 	"rosaforos@mail.ru",
// 	"milenahi@yahoo.com",
// 	"kzlukmanova1@gmail.com",
// 	"shustrovao@gmail.com",
// 	"lenanekrasova@list.ru",
// 	"semja.will@gmail.com",
// 	"annasoma20@mail.ru",
// 	"moja_rabota@bk.ru",
// 	"Fedotovamn888.86@mail.ru",
// 	"yremchuk@mail.ru",
// 	"Inga.kraukle@gmail.com",
// 	"t9663270929@yandex.ru",
// 	"gs.beautybar@mail.ru",
// 	"kesnvk@mail.ru",
// 	"Yuliana_s-85@mail.ru",
// 	"elnare.tagieva@mail.ru",
// 	"Irina.Anoshina.msk@mail.ru",
// 	"egle338@gmail.com",
// 	"Inessafm@gmail.com",
// 	"Yelenabogdanoff@gmail.com",
// 	"kudimova_la@mail.ru",
// 	"jujik-55@mail.ru",
// 	"Anastation343@mail.ru",
// 	"8alina8yang8@mail.ru",
// 	"n_katsura@mail.ru",
// 	"Genexport2020@gmail.com",
// 	"Kiyvkv@gmail.com",
// 	"svetales888@gmail.com",
// 	"Lanamiamihomes@gmail.com",
// 	"98765-@mail.ru",
// 	"dta0207@yandex.ru",
// 	"Karmanovich090488@gmail.com",
// 	"Vera.u27@yandex.ru",
// 	"Celisheva_olga@mail.ru",
// 	"pad4evarovav@gmail.com",
// 	"tetiana@bk.ru",
// 	"Muqali2816@gmail.com",
// 	"yuliamargarita@mail.ru",
// 	"saidasheva-@mail.ru",
// 	"arzygulkarimova571@gmail.com",
// 	"Vfeodossieva@gmail.com",
// 	"lavr.krd@gmail.com",
// 	"Olga.kraizler@yandex.ru",
// 	"samhalovailana10@gmail.com",
// 	"lyapushka76@gmail.com",
// 	"vininox@icloud.com",
// 	"aina1234@bk.ru",
// 	"alex.a.grif@gmail.com",
// 	"ushakova8611@gmail.com",
// 	"Projectsofaq@gmail.com",
// 	"Bayramovazuleykha@gmail.com",
// 	"Julia.kulagina@gmail.com",
// 	"aberegovoii@mail.ru",
// 	"Komonova.nf@yandex.ru",
// 	"Evaharina@list.ru",
// 	"g.pinekenstein@web.de",
// 	"ksenia4342@yandex.ru",
// 	"Vangog-kamen@mail.ru",
// 	"temerzhanovadina@gmail.com",
// 	"kristinavier@gmail.com",
// 	"alenaburtovaya29@gmail.com",
// 	"nina-rylova@mail.ru",
// 	"yavid.luba@yahoo.com",
// 	"ekaterina49.49@mail.ru",
// 	"trofimova.natalya@mail.ru",
// 	"guranatalia482@gmail.com",
// 	"irisha2101@mail.ru",
// 	"Accutot@gmail.com",
// 	"akanikar@mail.ru",
// 	"efimovavika2006@mail.ru",
// 	"belousikjulka@mail.ru",
// 	"zacknata@yandex.ru",
// 	"Natali_grodno_83@mail.ru",
// 	"rinakent@mail.ru",
// 	"cspq@ya.ru",
// 	"ye.ginter@gmail.com",
// 	"AM087887@gmail.com",
// 	"tolkyn.mustafina@gmail.com",
// 	"Lesok82@mail.ru",
// 	"natavarf@yandex.ru",
// 	"l.tatyana@bk.ru",
// 	"milena.ld@gmail.com",
// 	"irinachernovaa@yandex.ru",
// 	"Vorirvlad89@yandex.ru",
// 	"tatyana9.92@mail.ru",
// 	"Karelia.woman@gmail.com",
// 	"pasterxxl@mail.ru",
// 	"anayram_look@yahoo.com",
// 	"garmonia497@gmail.com",
// 	"hk_gulya@mail.ru",
// 	"89032876700@yandex.ru",
// 	"vanina_marinova@yahoo.com",
// 	"mrsbannikova@mail.ru",
// 	"Tramontana_77@mail.ru",
// 	"alexapetrache96@gmail.com",
// 	"lalli.may@bk.ru",
// 	"okotenko82@gmail.com",
// 	"batyrowa70@mail.ru",
// 	"nona.schroeder07@gmail.com",
// 	"ate271108@rambler.ru",
// 	"nataliawallaceco@gmail.com",
// 	"Sj13102013@yandex.ru",
// 	"lisa0507@bk.ru",
// 	"Nazimgul91@mail.ru",
// 	"tatatabalaeva@bk.ru",
// 	"habibovagx@mail.ru",
// 	"Alinaaa_88@mail.ru",
// 	"belevskayaa@mail.ru",
// 	"bugaevat629@gmail.com",
// 	"I@dpapina.ru",
// 	"a.moshkova@gmail.com",
// 	"Inessafm@gmail.comom",
// 	"mashdem76@gmail.com",
// 	"olesy49@mail.ru",
// 	"Delonurbeksydykov@gmail.com",
// 	"Jkrohta@yandex.ru",
// 	"lazar.vladis@yandex.ru",
// 	"ava_lida@mail.ru",
// 	"weiss-t@bluewin.ch",
// 	"Ya-Iulia.Zaikina@yandex.ru",
// 	"natalya_halezina@mail.ru",
// 	"aroma_mary@mail.ru",
// 	"Zhakupova_madina1991@mail.ru",
// 	"yuliagrif@gmail.com",
// 	"dav-agaf@yandex.ru",
// 	"m.hafizova@witchesameli.com",
// 	"elvira-1974@yandex.ru",
// 	"olgaefremenko87@mail.ru",
// 	"palubvi@gmail.com",
// 	"Paubvi@gmail.com",
// 	"j.zaika@witchesameli.com",
// 	"g.pinekenstein@web.de",
// 	"e.zelenskaya@witchesameli.com",
// 	"9222078984@mail.ru",
// 	"gulnara77@inbox.ru",
// 	"panovapo94@mail.ru",
// 	"natalya.batushkina@gmail.com",
// 	"Rusalo4ka-25@mail.ru",
// 	"rusalo4ka-25@mail.ru",
// 	"lioa@inbox.ru",
// 	"nininichka@gmail.com",
// 	"rosi_s_georgieva@abv.bg",
// 	"figurova_olga@mail.ru",
// 	"e.v.stupnikova@bk.ru",
// 	"grishinaninapavlovna@gmail.com",
// 	"alga888@bk.ru",
// 	"olenka_box@mail.ru",
// 	"biyakanna@mail.ru",
// 	"namzyray-a@mail.ru",
// 	"jenny1786@list.ru",
// 	"surkuradedeeva82@gmail.com",
// 	"natalia.catapano@aol.com",
// 	"alekszhol@mail.ru",
// 	"Olza@inbox.ru",
// 	"olza@inbox.ru",
// 	"Vmetalnikova18@gmail.com",
// 	"vmetalnikova18@gmail.com",
// 	"naddina2002@mail.ru",
// 	"angela.dobinda@gmail.com",
// 	"samarskaya-katya@bk.ru",
// 	"ketrixen@yandex.ru",
// 	"79057527779new@gmail.com",
// 	"opus-75@mail.ru",
// 	"prudnikovanata79@gmail.com",
// 	"olya_status@mail.ru",
// 	"kontakt@nadinebokarev.com",
// 	"nirinia1@mail.ru",
// 	"irinagorst9@gmail.com",
// 	"projectsofaq@gmail.com",
// 	"juliex@mail.ru",
// 	"o.kondrina@witchesameli.com",
// 	"annakuzmina708@mail.ru",
// 	"d_sakyp@mail.ru",
// 	"vorirvlad89@yandex.ru",
// 	"oljaFriesen47@web.de",
// 	"vanina_marinova@yahoo.com",
// 	"alena-zav@yandex.ru",
// 	"a.cherepanova@witchesameli.com",
// 	"nona.schroeder07@gmail.com",
// 	"po4ta.snezh@ya.ru",
// 	"po4ta.snezh@ya.ru",
// 	"a.khaikova@witchesameli.com",
// ];

let lastUserActivity = {}; // Времени последней активности пользователя

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

	{
		command: "/reset",
		description: "Сбросить ИИ ⛔",
	},
]);
async function payMessage(chatId, stageNum = 1) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		switch (stageNum) {
			case 1:
				await bot.editMessageText(
					`<b>Не торопись! Пока у тебя нет подписки!</b>\n\nОткрой доступ к эксклюзивному наставничеству от АТЛАНТА за 500р/мес\n\n<b>Все просто, чтобы получить доступ, нажми на кнопку ниже 👇</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: `Оплатить 💳`,
										url: `https://apolllo.ru/atlant-pay?account_id=${chatId}`,
									},
								],
								[
									{
										text: `Я оплатил ✅`,
										callback_data: `deleteexcess`,
									},
								],
							],
						},
					}
				);
				break;
			case 2:
				await bot
					.sendMessage(
						chatId,
						`<b>Твоя подписка истекла!</b>\n\nПродли доступ к уникальному наставничеству от АТЛАНТА за 500р/мес\n\nНе упусти возможность, нажми на кнопку ниже, чтобы вернуть доступ 👇`,
						{
							parse_mode: "HTML",
							disable_web_page_preview: true,

							reply_markup: {
								inline_keyboard: [
									[
										{
											text: `Оплатить 💳`,
											url: `https://apolllo.ru/atlant-pay?account_id=${chatId}`,
										},
									],
									[
										{
											text: `Я оплатил ✅`,
											callback_data: `deleteexcess`,
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
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function firstMeeting(chatId, stageNum = 1, isCorrect = true) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		dataAboutUser.action = `firstMeeting${stageNum}`;

		switch (stageNum) {
			case 1:
				await bot.sendMessage(
					chatId,
					`<b>НейроМетод на связи! 😉\n\nВаш ИИ-помощник в познании Метода Юлии Широких</b> (Ивлиевой)`,
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
						`<b>Приветствую 👋🏻</b>\n\nЧтобы зарегистрироваться в боте, <b>перейдите по ссылке из личного кабинета 🙃</b>`,
						{
							parse_mode: "HTML",
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: "Написать в Службу заботы❓",
											url: `https://t.me/amelisoul_support_bot`,
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
					? `<b>Рад знакомству! 🙏</b>`
					: `<b>${textToSayHello}, ${dataAboutUser.login}! </b>`
			}\n\nУ меня есть несколько режимов работы, рекомендую попробовать каждый!\n\n<blockquote><b>Что я умею:</b>\n- устроить тренировочную сессию\n- подготовиться ко встрече с клиентом\n- обменяться мыслями по психологии и Методу</blockquote>\n\n<b>Для запуска нажмите кнопки ниже :)</b>\n\n<i>P.S. – я еще обучаюсь, поэтому иногда могу ошибаться. Если такое случилось, нажмите на кнопку "Нужна помощь" 🥺</i>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `Как работать с ботом 🤔`,
								callback_data: `moreAbout`,
							},
						],
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
								text: `Помощь с клиентом 🤕`,
								callback_data: `menuHelpSession`,
							},
						],
						[
							{
								text: `Обменяться мыслями 🗣️`,
								callback_data: `menuTalkingSession`,
							},
						],
						[
							{
								text: `Нужна помощь❓`,
								url: `https://t.me/bogdan_obukhovskii`,
							},
							{
								text: `Мой профиль🧑‍🔬 `,
								callback_data: `profile`,
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

async function moreAbout(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		await bot.editMessageText(
			`У меня есть <b>3 режима работы.</b>\nВот их описание 🙃\n\n<blockquote><b>1) Тренировка сессии с ИИ</b>\n- в этом режиме запускается ролевая игра, в которой я нахожусь в роли клиента, а вы - в роли терапевта\n- с самого старта, я создаю себе личность, описание жизни, запрос и причину, по которой пришел к вам\n- ваша задача: в процессе диалога найти слой, на котором находится мой запрос и сформулировать исцеляющую фразу\n- по итогу сессии я дам вам обратную связь и порекомендую что можно улучшить в процессе</blockquote>\n\n<blockquote><b>2) Помощь с клиентом</b>\n- в этом режиме я уточняю у вас максимум данных по клиенту, которые у вас есть\n- генерирую идеи перед началом сессии во что можно углубиться, помогаю простроить стратегию в сессии\n- повышаю вашу насмотренность</blockquote>\n\n<blockquote><b>3) Обменяться мыслями</b>\n- в этом режиме нахожусь в формате открытого диалога\n- спрашивайте что угодно (в рамках разумного 🙂), у меня большая база знаний по нашей теме\n- с удовольствием поддержу диалог</blockquote>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: `⬅️В меню`,
								callback_data: `exit`,
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

// digfusion

async function trainingSession(chatId, stageName = "generate") {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	const dataAboutSession = dataAboutUser.currentSession;

	try {
		let response = "";

		switch (stageName) {
			case "menu":
				await bot.editMessageText(
					`<b>Тренировка сессии\nс искуственным интеллектом 🧠</b>\n\nВ этом режиме возьму на себя роль клиента, который пришел к вам на сессию. Вы – в роли терапевта.\n\n<u>Ваша задача:</u>\n- найти слой, на котором находится мой запрос и дать исцеляющую фразу. Если долго идете не в ту сторону, я могу отказаться от сессии.\n\n<blockquote>Используйте свои знания в Методе и не допускайте грубых ошибок – я обучен на групповых сессиях и буду вести себя очень похоже на настоящих клиентов. Конечно, насколько это возможно передать через чат...\n\nПо итогу сессии, я дам ей оценку и подскажу что можно улучшить.</blockquote>\n\n<b>Начнем?</b> `,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: `Сгенерировать клиента ✨`,
										callback_data: `generateTrainingSession`,
									},
								],
								[
									{
										text: `⬅️В меню`,
										callback_data: `exit`,
									},
								],
							],
						},
					}
				);

				break;
			case "generate":
				await bot.editMessageText(
					`<b>Создаю для вас клиента и наполняю его историю.. 🤔</b>\n\n<b>Добавил клиента в историю клиентов!</b>\n\n<i>Дождитесь генерации, не выходите.</i>\n\n<b>Ваша цель: выявить и помочь обработать настоящий запрос клиента по Методу. Удачи! 🤗</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [[{ text: ``, callback_data: `-` }]],
						},
					}
				);

				response = await assistantResponse(chatId, `generateTrainingSession`, false);

				if (response) {
					dataAboutUser.currentSession = response;

					trainingSession(chatId, "start");
				} else {
					menu(chatId);
				}

				break;
			case "start":
				if (!dataAboutSession) {
					trainingSession(chatId, "generate");
				} else {
					dataAboutSession.type = "trainingSession";

					await bot.editMessageText(
						`<b>Тренировка сессии\nс искуственным интеллектом 🧠\n\nКогда будете готовы - напишите приветствие в чате\n\n👤 ${dataAboutSession.name} • ${dataAboutSession.gender}</b>\n<blockquote><i>${dataAboutSession.look}</i></blockquote>\n\n<b>🤕 Запрос клиента:</b><blockquote expandable><i>${dataAboutSession.problem}</i></blockquote>\n\n<b>Начните диалог с подопечным, чтобы начать тренировку!</b> Это сообщение удалится.`,
						{
							parse_mode: "html",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: `Пересоздать 🔄️`,
											callback_data: `generateTrainingSession`,
										},
									],
									[
										{
											text: `⬅️В меню`,
											callback_data: `exit`,
										},
										{
											text: `Завершить ❌`,
											callback_data: `endTrainingSession`,
										},
									],
								],
							},
						}
					);
				}
				break;
			case "current":
				dataAboutSession.type = "trainingSession";

				await bot.editMessageText(
					`<b>Напоминаю, сейчас у вас клиент:\n\n👤 ${dataAboutSession.name} • ${dataAboutSession.gender}\n<blockquote><i>${dataAboutSession.look}</i></blockquote>\n\n🤕 Запрос клиента:</b><blockquote expandable><i>${dataAboutSession.problem}</i></blockquote>\n<b>Просто продолжите диалог,</b> это сообщение удалится.`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: `⬅️В меню`,
										callback_data: `exit`,
									},
									{
										text: `Завершить❌`,
										callback_data: `endTrainingSession`,
									},
								],
							],
						},
					}
				);
				break;
			case "end":
				await bot.editMessageText(
					`<b>Сессия со сгенерированным ИИ клиентом завершена! ✨</b>\n\n<i>Дождитесь моей оценки, не выходите.</i>\n\n<b>Расчитываю статистику этого диалога, и думаю над рекомендациями!</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [[{ text: ``, callback_data: `-` }]],
						},
					}
				);

				response = await assistantResponse(chatId, `endTrainingSession`, false);

				if (response) {
					await bot.editMessageText(response.text, {
						parse_mode: "Markdown",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [[{ text: `⬅️В меню`, callback_data: `exit` }]],
						},
					});

					dataAboutUser.currentSession = {};
				} else {
					menu(chatId);
				}
				break;
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function helpSession(chatId, stageName = "start") {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		const dataAboutSession = dataAboutUser.currentSession;

		switch (stageName) {
			case "reset":
				dataAboutUser.currentSession = {
					name: "",
					look: "",
					problem: "",

					type: "",
				};

				dataAboutUser.action = "helpSession";

				helpSession(chatId, "identification");
				break;
			case "menu":
				await bot.editMessageText(
					`<b>Помощь в работе с клиентом 🤕</b>\n\n<blockquote>В этом режиме я запрошу максимум информации по клиенту, которая у вас есть.\n\nПомогу подготовить стратегию диалога к сессии и найти идеи по слоям, где может лежать запрос\n\nОбщайтесь со мной в режиме диалога, как с экспертом</blockquote>\n\n${
						dataAboutSession?.type == "helpSession"
							? `<b>Сейчас у вас запущена сессия помощи и вы можете продолжить диалог текстом, просто напишите что-то.\n\nИли можете завершить текущую сессию и начать новую</b>`
							: `<b>Нажмите кнопку "добавить клиента", чтобы потом вы могли к нему вернуться и переобдумать сессию</b>`
					}`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									dataAboutSession?.type == "helpSession"
										? {
												text: `Завершить сессию помощи ❌`,
												callback_data: `endHelpSession`,
										  }
										: {
												text: `Добавить клиента 🤕`,
												callback_data: `resetHelpSession`,
										  },
								],
								[
									{
										text: `⬅️В меню`,
										callback_data: `exit`,
									},
									{
										text: `Клиенты (${dataAboutUser.realClientsData.length}) 📋`,
										callback_data: `historyHelpSession`,
									},
								],
							],
						},
					}
				);
				break;
			case "identification":
				await bot.editMessageText(
					`<b>Помощь в работе с клиентом 🤕\n\n<blockquote>Чтобы заполнить данные по клиенту, нажмите на "Добавить" около нужного поля\n\nКогда появится "... ✏️" около поля - напишите текстом значение</blockquote>\n\n👤Имя подопечного:\n<blockquote>${
						dataAboutUser.action == "editNameHelpSession"
							? `Напишите сообщением значение поля <a href="https://t.me/${BotName}/?start=editcancelHelpSession">✏️</a>`
							: `${
									dataAboutSession.name
							  } <a href="https://t.me/${BotName}/?start=editNameHelpSession">${
									dataAboutSession.name ? `Поменять` : `Добавить`
							  }</a>`
					}</blockquote>\nОписание клиента:</b>\n<blockquote><i>${
						dataAboutUser.action == "editLookHelpSession"
							? `Напишите сообщением значение поля <a href="https://t.me/${BotName}/?start=editcancelHelpSession">✏️</a>`
							: `${
									dataAboutSession.look
							  } </i><b><a href="https://t.me/${BotName}/?start=editLookHelpSession">${
									dataAboutSession.look ? `Поменять` : `Добавить`
							  }</a></b><i>`
					}</i></blockquote>\n<b>Запрос клиента:</b>\n<blockquote><i>${
						dataAboutUser.action == "editProblemHelpSession"
							? `Напишите сообщением значение поля <a href="https://t.me/${BotName}/?start=editcancelHelpSession">✏️</a>`
							: `${
									dataAboutSession.problem
							  } </i><b><a href="https://t.me/${BotName}/?start=editProblemHelpSession">${
									dataAboutSession.problem ? `Поменять` : `Добавить`
							  }</a></b><i>`
					}</i></blockquote>\n\n<b>${
						dataAboutSession.name && dataAboutSession.look && dataAboutSession.problem
							? `Все параметры собраны! Уже вижу куда можно углубиться! Приступим? 🧐`
							: `Прежде чем начать, заполните все параметры о клиенте!`
					}</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text:
											dataAboutSession.name &&
											dataAboutSession.look &&
											dataAboutSession.problem
												? `Узнать решение от ИИ ☑️`
												: ``,
										callback_data: `createHelpSession`,
									},
								],
								[
									{
										text: `⬅️Назад`,
										callback_data: `menuHelpSession`,
									},
									{
										text:
											dataAboutSession.name ||
											dataAboutSession.look ||
											dataAboutSession.problem
												? `Сбросить 🔄️`
												: "",
										callback_data: `resetHelpSession`,
									},
								],
							],
						},
					}
				);
				break;
			case "create":
				dataAboutSession.type = `helpSession`;

				dataAboutUser.realClientsData.push({
					name: dataAboutSession.name,
					look: dataAboutSession.look,
					problem: dataAboutSession.problem,
				});

				if (dataAboutUser.realClientsData.length > 3) dataAboutUser.realClientsData.shift();

				await bot.editMessageText(
					`<b>Думаю над всей ситуацией.. 🧐</b>\n\n<i>Дождитесь генерации, не выходите.</i>\n\n<b>Общайтесь со мной, как с экспертом! 😉</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [[{ text: ``, callback_data: `-` }]],
						},
					}
				);
				console.log(dataAboutUser.currentSession);

				let response = await assistantResponse(
					chatId,
					`startHelpSession ${JSON.stringify(dataAboutUser.currentSession)}`,
					false
				);

				await bot.sendMessage(chatId, `<b>🤕 Помощь от ИИ:</b>\n\n${response.text}`, {
					parse_mode: "HTML",
					disable_web_page_preview: true,
				});

				try {
					await bot.deleteMessage(chatId, dataAboutUser.messageId);
				} catch (error) {}
				break;
			case "end":
				await bot
					.editMessageText(
						`<b>Сессия с помощью ИИ - завершена!\n\nКлиент:</b>\n<blockquote><b>👤 ${dataAboutSession.name}</b>\n\n<i>🤕 "${dataAboutSession.problem}"</i></blockquote>\n\n<b>Позже вы можете вернуться к решению проблемы клиента, через раздел "Клиенты 📋"</b>`,
						{
							parse_mode: "html",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									[
										{ text: `⬅️Назад`, callback_data: `exit` },
										{
											text: `Клиенты (${dataAboutUser.realClientsData.length}) 📋`,
											callback_data: `historyHelpSession`,
										},
									],
								],
							},
						}
					)

					.then((message) => {
						dataAboutUser.messageId = message.message_id;
					});

				dataAboutUser.currentSession = {};
				break;

			case "history":
				let historyButtons = null;

				if (dataAboutUser.realClientsData.length > 0) {
					historyButtons = [];

					dataAboutUser.realClientsData.forEach((obj, index) => {
						historyButtons.push([
							{ text: `👤 ${obj.name}`, callback_data: `chooseClient${index}` },
						]);
					});
				}

				await bot
					.editMessageText(
						`<b>История клиентов 👨‍🦳</b>\n\nЗдесь вы можете вернуться к мозгоштурму по клиентам. ИИ помнит ваш прошлый диалог по нему, если он был не так давно.\n\n${
							historyButtons
								? `<b>Для этого просто нажмите на интересующего 👇</b>`
								: `<b>Ваш список пуст. Добавьте своего первого клиента уже сейчас! 👇</b>`
						}`,
						{
							parse_mode: "html",
							chat_id: chatId,
							message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									...(historyButtons || [
										[
											{
												text: `Добавить первого клиента 🤕`,
												callback_data: `resetHelpSession`,
											},
										],
									]),
									[
										{ text: `⬅️Назад`, callback_data: `exit` },
										{
											text: "Нужна помощь❓",
											url: "https://t.me/bogdan_obukhovskii",
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
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function profile(chatId, editLogin = false, afterEdit = false) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		if (!editLogin) {
			await bot.editMessageText(
				`<b><i>Мой профиль 🧑‍🔬</i>\n\nДанные:\n</b>Логин: <b>${
					dataAboutUser.login
				}</b> - <a href="https://t.me/${BotName}/?start=editLogin">изменить</a>${
					dataAboutUser.phoneNumber
						? `\nТелефон: <b>+${dataAboutUser.phoneNumber}</b>`
						: ``
				}\n\n<b>Тренировочные сессии:</b>\nВсего: <b>${
					dataAboutUser.sessionsData.totalCount
				}${
					dataAboutUser.sessionsData.totalCount == 0
						? ` - <a href="https://t.me/${BotName}/?start=menuTrainingSession">создать</a>`
						: ``
				}</b>\n\n<b>Сессии помощи:</b>\nВсего клиентов: <b>${
					dataAboutUser.realClientsData.length
				} ${
					dataAboutUser.realClientsData.length == 0
						? ` - <a href="https://t.me/${BotName}/?start=menuHelpSession">создать</a>`
						: ` - <a href="https://t.me/${BotName}/?start=historyHelpSession">выбрать</a>`
				}</b>\n\nВы с нами с <b>${dataAboutUser.date}</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{ text: `⬅️Назад`, callback_data: `exit` },
								// { text: `digfusion❔`, callback_data: `digfusionInfo` }
							],
							[{ text: `Сбросить ИИ ⛔`, callback_data: `reset` }],
						],
					},
				}
			);
		}
		if (editLogin) {
			dataAboutUser.action = "editLogin";

			await bot.editMessageText(
				`<i><b>Изменение логина ⚙️\n\n</b>Логин используется для идентификации пользователя! 🔒</i><b>\n\n${
					afterEdit
						? `Изменённый: <code>${dataAboutUser.supportiveCount}</code>`
						: `Текущий: <code>${dataAboutUser.login}</code>`
				}${
					afterEdit
						? "\n\nПрименить изменения для логина? 🤔"
						: "\n\nНапишите, как можно к вам обращаться ✍️"
				}</b>`,
				{
					parse_mode: "html",
					chat_id: chatId,
					message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: `${
										dataAboutUser.login != dataAboutUser.telegramFirstName
											? "Сбросить 🔄️"
											: ""
									}`,
									callback_data: "resetLogin",
								},
							],
							[
								{
									text: `⬅️Назад`,
									callback_data: "profile",
								},
								{
									text: `${afterEdit ? "Принять✅" : ""}`,
									callback_data: "editLogin",
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

// digfusion

async function talkingSession(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		await bot.editMessageText(
			`<b>Общение с НейроМетодом 🗣️\n\nДиалог со мной запущен всегда!\n\nЗадавайте вопросы где угодно!</b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: usersData.find((obj) => obj.chatId == chatId).messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [[{ text: `⬅️Назад`, callback_data: `exit` }]],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function digfusionInfo(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		await bot.editMessageText(
			`<b><i>❔digfusion • О компании 💁🏻‍♂️</i></b>\n\n<i>Это приложение разработано <b>digfusion</b></i>\n<blockquote><b><i>digfusion</i></b> - <b>начинающий стартап,</b> разрабатывающий <b>свои приложения</b> и предоставляющий услуги по <b>созданию чат-ботов</b> различных типов! ☑️\n\nПросмотреть все <b>наши проекты, реальные отзывы, каталог услуг</b> и <b>прочую информацию о компании</b> можно в нашем <b>Telegram канале</b> и <b>боте-консультанте! 🤗</b></blockquote>\n<b><a href="https://t.me/digfusion">Инфо</a> • <a href="https://t.me/digfusionbot">Услуги</a> • <a href="https://t.me/digfeedbacks">Отзывы</a></b>`,
			{
				parse_mode: "html",
				chat_id: chatId,
				message_id: dataAboutUser.messageId,
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [[{ text: "⬅️Назад", callback_data: "profile" }]],
				},
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

async function assistantResponse(chatId, request, thinkingMessage = true) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		if (thinkingMessage) {
			const thinkingMessageVariations = dataAboutUser.currentSession?.type
				? dataAboutUser.currentSession?.type == "trainingSession"
					? [
							`👤 ${dataAboutUser.currentSession.name} печатает..`,
							`👤 ${dataAboutUser.currentSession.name} думает над ответом..`,
							`👤 ${dataAboutUser.currentSession.name} пишет сообщение..`,
					  ]
					: [
							`🤕 Думаю над ситуацией с клиентом..`,
							`🤕 Таак, думаю над проблемой клиента..`,
							`🤕 Придумываю решение проблемы клиента..`,
					  ]
				: [
						`Думаю над вопросом с базой Метода.. 🧐`,
						`Рыскаю по всем базам знаний Метода.. 🤔`,
						`Печатаю ответ по материалам Метода.. ⌛️`,
				  ];

			let rndNum = Math.floor(Math.random() * thinkingMessageVariations.length);

			await bot
				.sendMessage(chatId, `<b>${thinkingMessageVariations[rndNum]}</b>`, {
					parse_mode: "HTML",
					disable_web_page_preview: true,
				})
				.then((message) => {
					dataAboutUser.messageIdOther = message.message_id;
				});
		}

		await openai.beta.threads.messages.create(dataAboutUser.assistantData.threadId, {
			role: "user",
			content: request,
		});

		bot.sendChatAction(chatId, "typing");

		const run = await openai.beta.threads.runs.createAndPoll(
			dataAboutUser.assistantData.threadId,
			{
				assistant_id: config.openai[0].assistantId,
			}
		);

		bot.sendChatAction(chatId, "typing");

		if (run.status == "completed") {
			const messages = await openai.beta.threads.messages.list(run.thread_id);

			bot.sendChatAction(chatId, "cancel");

			let response = messages.data
				.find((obj) => obj.role == "assistant")
				.content[0].text.value.replaceAll("```", "")
				.replaceAll("```", "")
				.replaceAll("json", "")
				.replaceAll("JSON", "")
				.replaceAll(/\【.*?】/g, "");

			console.log(response);

			try {
				if (JSON.parse(response)) {
					response = JSON.parse(response);

					if (thinkingMessage)
						try {
							await bot.deleteMessage(chatId, dataAboutUser.messageIdOther);
						} catch (error) {}

					return response;
				}
			} catch (error) {
				console.log("Наругал ассистента!");

				return assistantResponse(
					chatId,
					"МАНГОКОКОСБАНАНРЫБА. Прошлое сообщение ты написал не в формате целостного JSON-объекта. Перепиши его четко по инструкции и отправь заново, не отступай от нее, иначе тебя расстреляют! Не добавляй от себя извинений, сделай вид в диалоге как будто я не писал тебе с поправкой",
					false
				);
			}
		} else {
			try {
				await bot.deleteMessage(chatId, dataAboutUser.messageIdOther);
			} catch (error) {}

			console.log(run.status);

			await bot.sendMessage(
				chatId,
				`<b>Извините, прямо сейчас очень большая нагрузка по сессиям, пожалуйста, вернитесь через пару минут.. 🤕</b>`,
				{
					parse_mode: "HTML",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "Нужна помощь❓",
									url: "https://t.me/bogdan_obukhovskii",
								},
							],
							[{ text: "⬅️В меню", callback_data: "exit" }],
						],
					},
				}
			);
		}
	} catch (error) {
		try {
			await bot.deleteMessage(chatId, dataAboutUser.messageIdOther);
		} catch (error) {}

		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

// digfusion

async function reset(chatId) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	dataAboutUser.action = "";
	dataAboutUser.currentSession = {};
	dataAboutUser.sessionsData = { correctCount: 0, totalCount: 0 };
	dataAboutUser.realClientsData = [];
	dataAboutUser.assistantData.threadId = "";

	try {
		await bot.sendMessage(
			chatId,
			`<b>Мы сбросили данные, ИИ больше не должен тормозить! Просим прощение за неудобства! 🙏\n\nНажмите: /restart! 😉</b>`,
			{
				parse_mode: "HTML",
				disable_web_page_preview: true,
			}
		);
	} catch (error) {
		console.log(error);
		sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
	}
}

function StartAll() {
	if (TOKEN == config.TOKENs[1]) BotName = "neuro_method_bot";
	if (TOKEN == config.TOKENs[0]) BotName = "digtestingbot";

	if (fs.readFileSync("DB.json") != "[]" && fs.readFileSync("DB.json") != "") {
		let dataFromDB = JSON.parse(fs.readFileSync("DB.json"));

		usersData = dataFromDB.usersData || null;
	}

	bot.on("text", async (message) => {
		const chatId = message.chat.id;
		let text = message.text;

		let dataAboutUser = usersData?.find((obj) => obj.chatId == chatId);

		if (!dataAboutUser) {
			usersData.push({
				chatId: chatId,
				login: message.from.first_name,
				phoneNumber: "",
				email: "",

				methodId: null,

				messageId: null,
				action: "",

				messageIdOther: null,
				telegramFirstName: message.from.first_name,
				supportiveCount: true,

				currentSession: {},

				paymentData: {
					access: false,
					lastTime: "",
				},

				// {
				// 	name: null,
				// 	gender: null,
				// 	look: null,
				// 	background: null,
				// 	problem: null,

				// 	selfStory: null,
				// 	familyStory: null,
				// 	problemSolving: null,
				// 	difficult: null,
				// },

				sessionsData: { correctCount: 0, totalCount: 0 },

				realClientsData: [],

				assistantData: {
					threadId: "",
					openaiNum: Math.floor(Math.random() * config.openai.length),
				},

				date: `${new Date().getDate().toString().padStart(2, "0")}.${(
					new Date().getMonth() + 1
				)
					.toString()
					.padStart(2, "0")}.${(new Date().getFullYear() % 100)
					.toString()
					.padStart(2, "0")}`,
			});

			dataAboutUser = usersData.find((obj) => obj.chatId == chatId);
		}

		if (dataAboutUser) {
			try {
				if (
					dataAboutUser.paymentData.access ||
					dataAboutUser.action.includes("firstMeeting")
				) {
					if (!dataAboutUser.assistantData.threadId) {
						const thread = await openai.beta.threads.create();

						dataAboutUser.assistantData.threadId = thread.id;

						console.log(dataAboutUser.assistantData.threadId);
					}

					if (Array.from(text)[0] != "/") {
						if (
							dataAboutUser.action.includes("firstMeeting") ||
							dataAboutUser.action == "editLogin" ||
							(dataAboutUser.action?.includes("edit") &&
								dataAboutUser.action?.includes("HelpSession"))
						) {
							if (
								dataAboutUser.action == "editLogin" &&
								text != dataAboutUser.login
							) {
								dataAboutUser.supportiveCount = text;
								profile(chatId, true, true);
							}

							if (
								dataAboutUser.action.includes("edit") &&
								dataAboutUser.action.includes("HelpSession")
							) {
								match = dataAboutUser.action.match(/^edit(.*)HelpSession$/);

								if (text == "000") {
									dataAboutUser.currentSession = {
										name: "Максим Свиблов",
										look: "40 лет, светло-карие глаза, коротко стриженные русые волосы. Одет в темный свитер и джинсы. Сидит расслабленно, облокотившись на спинку кресла.",
										problem:
											"Неуверенность в себе и своих профессиональных решениях, ощущение застоя в карьере.",

										type: "",
									};
								} else {
									dataAboutUser.currentSession[`${match[1]}`.toLowerCase()] =
										text;
								}

								dataAboutUser.action = "helpSession";

								helpSession(chatId, "identification");
							}

							try {
								await bot.deleteMessage(chatId, message.message_id);
							} catch (error) {}
						} else {
							const dataAboutSession = dataAboutUser.currentSession;

							try {
								bot.deleteMessage(chatId, dataAboutUser.messageId);
							} catch (error) {}

							let response = await assistantResponse(
								chatId,
								`${
									dataAboutSession?.type
										? dataAboutSession.type
										: "talkingSession"
								} ${text}`,
								true
							);

							await bot.sendMessage(
								chatId,
								`${
									dataAboutSession.type?.includes("trainingSession")
										? `*👤 ${dataAboutSession.name}:*`
										: dataAboutSession.type?.includes("helpSession")
										? `*🤕 Помощь от ИИ:*`
										: `*🧑‍🔬 Ответ от НейроМетода:*`
								}\n\n${response.text}\n\n${
									response.action == "problemIsSolved"
										? `Проблема решена вами! 😆`
										: response.action == "problemIsFailed"
										? `Проблема не решена, клиент не доволен. 😔`
										: ``
								}`,
								{
									parse_mode: "Markdown",
									disable_web_page_preview: true,
									reply_markup: {
										inline_keyboard: [
											[
												{
													text:
														response.action == "problemIsSolved"
															? "Завершить сессию ✅"
															: response.action == "problemIsFailed"
															? `Завершить сессию ❌`
															: ``,
													callback_data: "endTrainingSession",
												},
												// {
												// 	text: "Написать 💭",
												// 	url: "https://t.me/digsupport",
												// },
											],
										],
									},
								}
							);
						}
					} else {
						if (
							text.includes("/start menuTrainingSession") ||
							text.includes("/start generateTrainingSession") ||
							text.includes("/start startTrainingSession") ||
							text.includes("/start endTrainingSession") ||
							text.includes("/start currentTrainingSession")
						) {
							match = text.match(/^\/start (.*)TrainingSession$/);

							trainingSession(chatId, match[1]);
						}

						if (
							text.includes("/start menuHelpSession") ||
							text.includes("/start identificationHelpSession") ||
							text.includes("/start resetHelpSession") ||
							text.includes("/start createHelpSession") ||
							text.includes("/start endHelpSession") ||
							text.includes("/start historyHelpSession")
						) {
							match = text.match(/^\/start (.*)HelpSession$/);

							helpSession(chatId, match[1]);
						} else if (text.includes("/start edit") && text.includes("HelpSession")) {
							match = text.match(/^\/start edit(.*)HelpSession$/);

							dataAboutUser.action = `edit${match[1]}HelpSession`;

							helpSession(chatId, "identification");
						}

						if (text.includes("/start acs")) {
							match = text.match(/^\/start acs(.*)$/);

							if (!dataAboutUser.paymentData.access) {
								let decryptedText = CryptoJS.AES.decrypt(
									atob(match[1]),
									config.encryptionData.secretKey
								).toString(CryptoJS.enc.Utf8);

								console.log(decryptedText);

								if (decryptedText.includes("+") && decryptedText.includes("-")) {
									decryptedText = decryptedText.match(/^\+(.*)\-$/);
									console.log(decryptedText);

									if (
										!usersData.find(
											(obj) => obj.methodId && obj.methodId == decryptedText
										)
									) {
										// acs.push(decryptedText);

										dataAboutUser.methodId = decryptedText;

										dataAboutUser.paymentData.access = true;
										dataAboutUser.paymentData.lastTime = new Date().getTime();

										await bot.sendMessage(chatId, "ㅤ").then((message) => {
											dataAboutUser.messageId = message.message_id;
										});

										menu(chatId, true);
									} else {
										await bot.sendMessage(
											chatId,
											`<b>Пользователь с такими данными уже существует! ☹️\n\nРасшиф: (${decryptedText})</b>`,
											{
												parse_mode: "HTML",
												disable_web_page_preview: true,
												reply_markup: {
													inline_keyboard: [
														[
															{
																text: "Написать в Службу заботы❓",
																url: `https://t.me/amelisoul_support_bot`,
															},
														],
													],
												},
											}
										);
									}
								} else {
									await bot.sendMessage(
										chatId,
										`<b>Неверные данные, пожалуйста, используйте ссылку из вашего профиля! 😐\n\nРасшиф: (${decryptedText})</b>`,
										{
											parse_mode: "HTML",
											disable_web_page_preview: true,
											reply_markup: {
												inline_keyboard: [
													[
														{
															text: "Написать в Службу заботы❓",
															url: `https://t.me/amelisoul_support_bot`,
														},
													],
												],
											},
										}
									);
								}
							} else {
								await bot.sendMessage(chatId, "ㅤ").then((message) => {
									dataAboutUser.messageId = message.message_id;
								});

								menu(chatId);
							}
						}

						switch (text) {
							case "/restart":
							case "/start":
								if (text == "/restart" && dataAboutUser.paymentData.access) {
									try {
										await bot.deleteMessage(chatId, dataAboutUser.messageId);
									} catch (error) {}

									await bot.sendMessage(chatId, "ㅤ").then((message) => {
										dataAboutUser.messageId = message.message_id;
									});

									menu(chatId);
								} else firstMeeting(chatId);
								break;
							case "/reset":
								bot.deleteMessage(chatId, dataAboutUser.messageId);

								reset(chatId);
								break;
							case "":
								break;
							case "":
								break;
							case "/start editLogin":
								profile(chatId, true);
								break;
							case "":
								break;
							case "":
								break;
							case "":
								break;
							case "/data":
								if (chatId == qu1z3xId || chatId == bogdanId) {
									fs.writeFileSync(
										"DB.json",
										JSON.stringify({ usersData: usersData }, null, 2)
									);
								}
								break;
						}

						try {
							await bot.deleteMessage(chatId, message.message_id);
						} catch (error) {}
					}
				} else {
					switch (text) {
						case "/restart":
						case "/start":
							try {
								await bot.deleteMessage(chatId, dataAboutUser.messageId);
							} catch (error) {}

							firstMeeting(chatId);
							break;
						case "":
							break;
						// case "/pay":
						// 	await bot.sendMessage(chatId, "ㅤ").then((message) => {
						// 		dataAboutUser.messageId = message.message_id;
						// 	});

						// 	payMessage(chatId, 1);
						// 	break;
						// case "/pay2":
						// 	payMessage(chatId, 2);
						// 	break;
					}
				}
			} catch (error) {
				console.log(error);
				sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
			}

			// fs.writeFileSync(
			// 	"DB.json",
			// 	JSON.stringify({ usersData: usersData, }, null, 2)
			// );

			if (chatId != qu1z3xId) {
				sendDataAboutText(chatId, dataAboutUser.login, text);
			}
			lastUserActivity[chatId] = Date.now();
		}
	});

	// digfusion

	bot.on("callback_query", async (query) => {
		const chatId = query.message.chat.id;
		const data = query.data;

		let dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

		if (dataAboutUser) {
			try {
				if (
					dataAboutUser.paymentData.access ||
					dataAboutUser.action.includes("firstMeeting")
				) {
					dataAboutUser.messageId = query.message.message_id;

					if (!dataAboutUser.inBlackList) {
						if (data.includes("firstMeeting")) {
							match = data.match(/^firstMeeting(.*)$/);

							firstMeeting(chatId, parseInt(match[1]));
						}

						if (
							data.includes("menuTrainingSession") ||
							data.includes("generateTrainingSession") ||
							data.includes("startTrainingSession") ||
							data.includes("endTrainingSession") ||
							data.includes("currentTrainingSession")
						) {
							match = data.match(/^(.*)TrainingSession$/);

							if (dataAboutUser.currentSession?.type == "helpSession") {
								bot.answerCallbackQuery(query.id, {
									text: `У вас уже запущена сессия помощи от ИИ с клиентом\n\nДля начала завершите ее, для начатия следущей`,
									show_alert: true,
								});
							} else {
								trainingSession(chatId, match[1]);
							}
						}

						if (
							data.includes("menuHelpSession") ||
							data.includes("identificationHelpSession") ||
							data.includes("resetHelpSession") ||
							data.includes("createHelpSession") ||
							data.includes("endHelpSession") ||
							data.includes("historyHelpSession")
						) {
							match = data.match(/^(.*)HelpSession$/);

							if (dataAboutUser.currentSession?.type == "trainingSession") {
								bot.answerCallbackQuery(query.id, {
									text: `У вас уже запущена тренировочная сессия со сгенерированным клиентом\n\nДля начала завершите ее, для начатия следущей`,
									show_alert: true,
								});
							} else {
								helpSession(chatId, match[1]);
							}
						}

						if (data.includes("chooseClient")) {
							match = data.match(/^chooseClient(.*)$/);

							if (dataAboutUser.currentSession?.type == "helpSession") {
								bot.answerCallbackQuery(query.id, {
									text: `У вас уже запущена сессия помощи от ИИ с одним клиентом\n\nДля начала завершите ее, для выбора другого пациента!`,
									show_alert: true,
								});
							} else {
								const certainClient =
									dataAboutUser.realClientsData[parseInt(match[1])];

								if (certainClient) {
									dataAboutUser.currentSession = {
										name: certainClient.name,
										look: certainClient.look,
										problem: certainClient.problem,

										type: "",
									};

									helpSession(chatId, "identification");
								}
							}
						}

						if (
							data.includes("previousPage") ||
							data.includes("nextPage") ||
							data.includes("firstPage")
						) {
							match = data.match(/^(.*)Page$/);

							if (match[1] == "previous" && dataAboutUser.supportiveCount > 1) {
								--dataAboutUser.supportiveCount;
							} else if (match[1] == "next") {
								++dataAboutUser.supportiveCount;
							} else if (match[1] == "first") {
								dataAboutUser.supportiveCount = 1;
							}

							// if (dataAboutUser.action == "workoutsHistoryList")
							workoutsHistoryList(chatId, 1);
						}

						// qbuttons

						switch (data) {
							case "exit":
								menu(chatId);
								break;

							case "reset":
								bot.deleteMessage(chatId, dataAboutUser.messageId);

								reset(chatId);
								break;
							case "":
								break;
							case "":
								break;
							case "":
								break;
							case "":
								break;
							case "profile":
								profile(chatId);
								break;
							case "digfusionInfo":
								digfusionInfo(chatId);
								break;
							case "resetLogin":
								dataAboutUser.login = dataAboutUser.telegramFirstName;

								bot.answerCallbackQuery(query.id, {
									text: `Ваш логин снова \n«${dataAboutUser.login}» 😉`,
									show_alert: true,
								});

								profile(chatId);
								break;
							case "editLogin":
								dataAboutUser.login = dataAboutUser.supportiveCount;

								bot.answerCallbackQuery(query.id, {
									text: `Ваш логин изменен на\n«${dataAboutUser.login}» 😉`,
									show_alert: true,
								});

								profile(chatId);
								break;
							case "menuTalkingSession":
								if (dataAboutUser.currentSession?.type == "trainingSession") {
									bot.answerCallbackQuery(query.id, {
										text: `У вас уже запущена тренировочная сессия со сгенерированным клиентом\n\nДля начала завершите ее, для разговора с НейроМетодом!`,
										show_alert: true,
									});
								} else if (dataAboutUser.currentSession?.type == "helpSession") {
									bot.answerCallbackQuery(query.id, {
										text: `У вас уже запущена сессия помощи от ИИ с клиентом\n\nДля начала завершите ее, для разговора с НейроМетодом!`,
										show_alert: true,
									});
								} else {
									talkingSession(chatId);
								}
								break;
							case "":
								break;
							case "":
								break;
							case "moreAbout":
								moreAbout(chatId);
								break;
							case "":
								break;
							case "":
								break;
							case "":
								break;
							case "deleteexcess":
								try {
									await bot.deleteMessage(chatId, query.message.message_id);
								} catch (error) {}
								break;
						}

						if (query.message.message_id == dataAboutUser.messageIdOther) {
							try {
								await bot.deleteMessage(chatId, query.message.message_id);
								dataAboutUser.messageIdOther = null;
							} catch (error) {}
						}
					}
				} else {
					// payMessage(chatId, 1);
					// dataAboutUser.supportiveCount =
					// 	dataAboutUser.supportiveCount != "email" &&
					// 	dataAboutUser.supportiveCount != "phoneNumber"
					// 		? `email`
					// 		: dataAboutUser.supportiveCount;
					// firstMeeting(chatId, 3);
				}

				if (chatId != qu1z3xId) {
					sendDataAboutButton(chatId, dataAboutUser.login, data);
				}

				lastUserActivity[chatId] = Date.now();
			} catch (error) {
				if (String(error).includes("Cannot read properties of undefined")) {
					menu(chatId);
				}

				console.log(error);
				sendDataAboutError(chatId, dataAboutUser.login, `${String(error)}`);
			}
		}
	});

	// digfusion

	cron.schedule(`0 */10 * * * *`, function () {
		try {
			for (const chatId in lastUserActivity) {
				if (Date.now() - lastUserActivity[chatId] > 5 * 60 * 1000) {
					const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

					if (dataAboutUser.type) {
						bot.sendMessage(chatId, "<b>Продолжим общение? 🙃</b>", {
							parse_mode: "HTML",
							disable_web_page_preview: true,
							reply_markup: {
								inline_keyboard: [
									[
										{
											text: `Удалить это и продолжить ✅`,
											callback_data: `deleteexcess`,
										},
									],
									[
										{
											text: "Написать в Службу заботы❓",
											url: `https://t.me/amelisoul_support_bot`,
										},
									],
								],
							},
						});
						delete lastUserActivity[chatId]; // Удаляем пользователя после отправки сообщения
					}
				}
			}
		} catch (error) {}
	});

	cron.schedule(`0 */1 * * *`, function () {
		try {
			if (TOKEN == config.TOKENs[1]) {
				fs.writeFileSync("DB.json", JSON.stringify({ usersData: usersData }, null, 2));

				if (new Date().getHours() % 12 == 0)
					sendDataAboutDataBase({ usersData: usersData });
			}
		} catch (error) {}
	});
}

StartAll();

// digfusion
