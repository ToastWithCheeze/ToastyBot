const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voicechannel = message.member.voice.channel;

        if (!voicechannel) return message.channel.send('Va inne i en jävla kanal dumbass');
        const permissions = voicechannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Du har fan inte rätt permisssions för det här bög fan aka JOINA');
        if (!permissions.has('SPEAK')) return message.channel.send('Du har fan inte rätt permisssions för det här bög fan aka PRATA');
        if (!args.length) return message.channel.send('SKRIV MER FÖRFAN');

        const connection = await voicechannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.video[0] : null;
        
        }
        const video = await videoFinder(args.join(' '));
    
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voicechannel.leave();
            });
        
            await message.reply(`:thumpsup: Nu spelar ***${video.title}*** förfan`)
        } else {
            message.channel.send('Video hittades förfan inte bögfan')
        }
     }
}