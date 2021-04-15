const db = require('quick.db');
module.exports = {
	name: 'modrole',
	description: 'Use This Command To Set Server Modrole!',
	usage: `Modrole <@Your Moderole>`,
	category: 'Settings',
	permissions: ["ADMINISTRATOR"],
	aliases: ['setmodrole'],
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
		const modrole = message.mentions.roles.first();
		const currentmodrole = db.get(`modrole_${message.guild.id}`);
		if (!args[0]) {
			return message.channel
				.send(
					embed
						.setColor(`${colour}`)
						.setDescription(
							`<a:ERROR:${erroremoji}>┊Your Current Mod Role Is\n<a:ARROW:${arrowemoji}>┊<@&${currentmodrole}>`
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
		if (!modrole) {
			return message.channel
				.send(
					embed
						.setColor(`${colour}`)
						.setDescription(
							`<a:ERROR:${erroremoji}>┊Please Give Me Valid Modrole That You Want To Set!`
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
		if (args[1]) {
			return message.channel
				.send(
					embed
						.setColor(`${colour}`)
						.setDescription(
							`<a:ERROR:${erroremoji}>┊You Cannot Set Modrole More Than 1 Argument!`
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
		db.delete(`modrole_${message.guild.id}`);
		db.set(`modrole_${message.guild.id}`, modrole.id);
		await message.channel
			.send(
				embed
					.setColor(`${colour}`)
					.setDescription(
						`<a:SUCCESSFULL:${sucessemoji}>┊Sucessfully Set To New Modrole.\n<a:ARROW:${arrowemoji}>┊Now Your Modrole Is <@&${modrole.id}>`
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
};
