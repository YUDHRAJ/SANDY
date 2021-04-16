const db = require('quick.db');
const Discord = require('discord.js');
const config = require('../../botconfig.json');
const backemo = config.BACKWARDEMOJI;
const foremo = config.FORWARDEMOJI;
const exitemo = config.EXITEMOJI;

module.exports = {
	name: 'serveremojilist',
	hidden: false,
	description: 'Use This Command To get All of your server Emojis!',
	usage: 'serveremojilist',
	category: 'ServerInfo',
	permissions: false,
	admin: false,
	mod: false,
	guildowner: false,
	owner: false,
	aliases: ['sel'],
	timeout: false,
	run: async (
		client,
		message,
		args,
		colour,
		commandname,
		embed,
		nickname,
		prefix,
		arrowemoji,
		erroremoji,
		sucessemoji,
		wrongemoji
	) => {
		const list = [];
		let emojis = message.guild.emojis.cache.array();
		if (emojis.size === 0) {
			return message.channel
				.send(
					embed
						.setColor(`${colour}`)
						.setDescription(
							`<a:ERROR:${erroremoji}>┊There are no Emojis in this Server! `
						)
						.setAuthor(nickname, message.author.displayAvatarURL())
						.setFooter(
							`┊${commandname}┊  ${client.user.username}`,
							client.user.displayAvatarURL()
						)
				)
				.then(m => {
					m.delete({ timeout: 60000 }).catch(() => undefined);
				});
		}
		emojis = emojis.map(
			(e, i) =>
				`${i + 1})   ${e}\n**NAME:** \`${e.name}\`\n**ID:** \`${
					e.id
				}\`\n**DOWNLOAD:** [CLICK HERE](${e.url})`
		);
		for (var i = 0; i < emojis.length; i += 10) {
			const items = emojis.slice(i, i + 10);
			list.push(items.join(`\n`));
		}
		const symbols = [`${backemo}`, `${exitemo}`, `${foremo}`];
		let page = 0;
		let e = embed
			.setDescription(list[page])
			.setAuthor(nickname, message.author.displayAvatarURL())
			.setColor(`${colour}`)
			.setFooter(
				`┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
				client.user.displayAvatarURL()
			);

		const msg = await message.channel.send(e);
		symbols.forEach(symbol => msg.react(symbol));
		let doing = true;

		while (doing) {
			let r;
			const filter = (r, u) =>
				symbols.includes(r.emoji.id) && u.id === message.author.id;
			try {
				r = await msg.awaitReactions(filter, {
					max: 1,
					time: 120000,
					errors: ['time']
				});
			} catch {
				return msg.delete().catch(() => undefined);
			}
			const u = message.author;
			r = r.first();
			if (r.emoji.id === symbols[2]) {
				if (!list[page + 1]) {
					msg.reactions
						.resolve(r.emoji.id)
						.users.remove(u.id)
						.catch(() => undefined);
				} else {
					page++;
					msg.reactions
						.resolve(r.emoji.id)
						.users.remove(u.id)
						.catch(() => undefined);
					let newM = embed
						.setDescription(list[page])
						.setAuthor(nickname, message.author.displayAvatarURL())
						.setColor(`${colour}`)
						.setFooter(
							`┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
							client.user.displayAvatarURL()
						);
					msg.edit(newM).catch(() => undefined);
				}
			}
			if (r.emoji.id === symbols[0]) {
				if (!list[page + 1]) {
					msg.reactions
						.resolve(r.emoji.id)
						.users.remove(u.id)
						.catch(() => undefined);
				} else {
					page--;
					msg.reactions
						.resolve(r.emoji.id)
						.users.remove(u.id)
						.catch(() => undefined);
					let newM = embed
						.setDescription(list[page])
						.setAuthor(nickname, message.author.displayAvatarURL())
						.setColor(`${colour}`)
						.setFooter(
							`┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
							client.user.displayAvatarURL()
						);
					msg.edit(newM).catch(() => undefined);
				}
			}
			if (r.emoji.id === symbols[1]) {
				msg.delete().catch(() => undefined);
				return;
			}
		}
	}
};
