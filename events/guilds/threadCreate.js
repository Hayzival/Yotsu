module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread) {
        if (thread.isThread()) thread.join();
        const LogChannel = client.channels.cache.get('595560297167585283')
        LogChannel.send(`Nom du thread: ${thread.name}\nID du thread: ${thread.id}\n`)
    }
}