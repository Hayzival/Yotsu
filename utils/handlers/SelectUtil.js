const { promisify } = require('util');
const { glob } = require('glob')
const pGlob = promisify(glob)
const Logger = require('../Logger');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/selects/**/*.js`)).map(async (selectMenuFile) => {
        const select = require(selectMenuFile)
        if (!select.name) return Logger.warn(`Select non-fonctionnel : pas de nom ↓\nFichier -> ${cmdFile}`)
        client.buttons.set(select.name, select)
    });
};