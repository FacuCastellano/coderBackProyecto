const { Router } = require('express')
const router = Router()


const MessageController = require('../../controllers/messages.controller')

const { factoryManager }=require("../../config/process.config")
const messageManager = factoryManager.messageManager

router.get('/', MessageController.getPrevious)


module.exports = router