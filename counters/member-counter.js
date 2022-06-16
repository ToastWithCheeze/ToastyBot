module.exports = async (client) =>{
    const guild = client.guilds.cache.get('987014626623488110');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('987089783400575037');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updateing Member Count');
    }, 60000);
}