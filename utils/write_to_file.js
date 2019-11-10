const fs = require('fs');

module.exports = {
    updateDB: (filePath, str) => {
        fs.writeFile(filePath, str, (err) => {
            if (err) console.log(err)
        })
    },
    updateDBSync: (filePath, str) => {
        return fs.writeFileSync(filePath, str)
    }
}