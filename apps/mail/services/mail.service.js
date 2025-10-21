import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const MAIL_KEY = "mailDB";
const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Popo Ovadia",
};
export const mailService = {
  query,
  get,
  remove,
  save,
  getUser,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromParams,
  getDefaultSort,
  getSortFromParams,
};
_createDemoData();
function query(filterBy = {}, sortBy = "date") {
  return storageService.query(MAIL_KEY).then((Mails) => {
    if(filterBy.type === 'starred'){
      Mails = Mails.filter((mail)=>(mail.starred && !mail.removedAt))
    }
    else if(filterBy.type === 'removed'){
      Mails = Mails.filter((mail)=>(mail.removedAt))
    }
    else if (filterBy.type === "sent") {
      Mails = Mails.filter((mail)=> (mail.from === loggedinUser.email && !mail.removedAt && mail.sentAt))
    }
     else if(filterBy.type === 'inbox'){
      Mails = Mails.filter((mail)=> (mail.from !== loggedinUser.email && !mail.removedAt && mail.sentAt))
    }
     else if(filterBy.type === 'draft'){
      Mails = Mails.filter((mail)=>(!mail.sentAt))
     }
     if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, "i");
      Mails = Mails.filter((mail) => regExp.test(mail.subject));
    }
    if (filterBy.isRead) {
      Mails = Mails.filter(
        (mail) => JSON.stringify(mail.isRead) === filterBy.isRead
      );
    }

    if (sortBy === "date") {
      Mails = Mails.sort((mail1, mail2) => mail1.sentAt > mail2.sentAt);
    } else {
      Mails = Mails.sort((mail1, mail2) =>
        mail1.subject.localeCompare(mail2.subject)
      );
    }

    return Mails;
  });
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId);
}
function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail);
  } else {
    return storageService.post(MAIL_KEY, mail);
  }
}
function _createDemoData() {
  const mails = [
    {
      id: "e101",
      createdAt: Date.now(),
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1351992330577,
      removedAt: null,
      from: "user@appsus.com",
      to: "user@appsus.com",
      starred: false
    },
    {
      id: "e102",
      createdAt: 1551133124500,
      subject: "Hallo!",
      body: "Would love to catch up sometimes  hb xsjh jodjc",
      isRead: true,
      sentAt: 1551133930594,
      removedAt: null,
      from: "momo@momo.com",
      to: "user@appsus.com",
      starred: false
    },
    {
      id: "e103",
      createdAt: 1551133930500,
      subject: "Guten Morgen!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: "momo@momo.com",
      to: "user@appsus.com",
      starred: true
    },
    {
      id: "e104",
      createdAt: 1551133930500,
      subject: "Goede Morgen!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: null,
      removedAt: null,
      from: "momo@lolo.com",
      to: "user@appsus.com",
      starred: true
    }
  ];
  utilService.saveToStorage(MAIL_KEY, mails);
}
function getUser() {
  return loggedinUser;
}
function getEmptyMail() {
  const mail = {
    id: "",
    createdAt: Date.now(),
    subject: "",
    body: "",
    isRead: true,
    sentAt: null,
    removedAt: null,
    from: loggedinUser.email,
    to: "",
  };

  return mail;
}
function getDefaultFilter(
  filterBy = { subject: "", isRead: "", type: "inbox" }
) {
  return {
    subject: filterBy.subject,
    isRead: filterBy.isRead,
    type: filterBy.type,
  };
}

function getFilterFromParams(searchParams = {}) {
  const defaultFilter = getDefaultFilter();
  return {
    subject: searchParams.get("subject") || defaultFilter.subject,
    isRead: searchParams.get("isRead") || defaultFilter.isRead,
    type: searchParams.get("type") || defaultFilter.type,
  };
}
function getDefaultSort(sortBy = "date") {
  return sortBy;
}
function getSortFromParams(searchParams = {}) {
  const defaultSort = getDefaultSort();
  return searchParams.get("sortBy") || defaultSort;
}
