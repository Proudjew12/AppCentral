import {utilService} from './services/util.service.js'
import { storageService } from './services/async-storage.service.js'

const MAIL_KEY = 'mailDB'


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(Mails => {
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                Mails = Mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.read) {
                Mails = Mails.filter(mail => mail.isRead === filterBy.read)
            }
            return Mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}
function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}