
import { storageService } from '../../../services/async-storage.service.js'
import {utilService} from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
 email: 'user@appsus.com',
 fullname: 'Popo Ovadia'
}
export const mailService = {
    query,
    get,
    remove,
    save,
    getUser,
    getEmptyMail

}
_createDemoData()
function query(filterBy = {},sortBy='date') {
    return storageService.query(MAIL_KEY)
        .then(Mails => {
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                Mails = Mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.read) {
                Mails = Mails.filter(mail => mail.isRead === filterBy.read)
            }
            if(sortBy === 'date'){
                Mails = Mails.sort((mail1,mail2)=>(mail1.createdAt>mail2.createdAt))
            }
            else{
                Mails = Mails.sort((mail1,mail2)=>(mail1.subject.localeCompare(mail2.subject)))
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
        mail.sentAt = Date.now()
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
function _createDemoData(){
    const mails = [
        {id: 'e101',
createdAt : Date.now(),
subject: 'Miss you!',
body: 'Would love to catch up sometimes',
isRead: false,
sentAt : 1551112330594,
removedAt : null,
from: 'momo@momo.com',
to: 'user@appsus.com'},
        {id: 'e102',
createdAt : 1551133124500,
subject: 'Hallo!',
body: 'Would love to catch up sometimes',
isRead: true,
sentAt : 1551133930594,
removedAt : null,
from: 'momo@momo.com',
to: 'user@appsus.com'},
        {id: 'e103',
createdAt : 1551133930500,
subject: 'Guten Morgen!',
body: 'Would love to catch up sometimes',
isRead: false,
sentAt : 1551133930594,
removedAt : null,
from: 'momo@momo.com',
to: 'user@appsus.com'},
    ]
    utilService.saveToStorage(MAIL_KEY,mails)
}
function getUser(){
    return loggedinUser
}
function getEmptyMail(){
    const mail={
     id: '',
createdAt : Date.now(),
subject: '',
body: '',
isRead: true,
sentAt : null,
removedAt : null,
from: loggedinUser.email,
to: ''
}
         
    return mail
}
