const Database = require('../db/config')

module.exports = { 
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomId = ""
        let isRoom = true

        while (isRoom) {
            // gera número da sala com 6 caracteres integer concatenados
            for(var i=0;i<6;i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }
    
            // verifica se esse room já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
    
            isRoom = roomsExistIds.some(roomsExistId => roomsExistIds === roomId)
        }

        if(! isRoom){
            // insert rooms
            await db.run(`INSERT INTO rooms (
              id,
              pass  
            ) VALUES (
                ${parseInt(roomId)},
                ${pass}
            )`)
        }       

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()

        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length == 0) {
            if(questionsRead.length == 0) {
                isNoQuestions = true
            }
        }

        res.render("room", {
            roomId: roomId,
            questions: questions,
            questionsRead: questionsRead,
            isNoQuestions: isNoQuestions,
        })  
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
 }