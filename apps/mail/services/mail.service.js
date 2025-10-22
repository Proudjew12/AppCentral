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
    id: "28b069d6",
    createdAt: 1598819017985,
    subject: "Good morning",
    body: "Good morning",
    isRead: false,
    sentAt: 1598819017985,
    removedAt: null,
    from: "user@appsus.com",
    to: "contact@mail.com",
    starred: false
  },
  {
    id: "b129ed52",
    createdAt: 1709779523877,
    subject: "Buenos días",
    body: "Buenos días",
    isRead: true,
    sentAt: 1709779523877,
    removedAt: null,
    from: "friend@mail.com",
    to: "contact@mail.com",
    starred: false
  },
  {
    id: "b4d61ec1",
    createdAt: 1641095476028,
    subject: "Bonjour",
    body: "Bonjour",
    isRead: true,
    sentAt: 1641095476028,
    removedAt: null,
    from: "user@appsus.com",
    to: "contact@mail.com",
    starred: true
  },
  {
    id: "af7efe98",
    createdAt: 1763557869306,
    subject: "Guten Morgen",
    body: "Guten Morgen",
    isRead: true,
    sentAt: 1763557869306,
    removedAt: null,
    from: "test@example.com",
    to: "contact@mail.com",
    starred: true
  },
  {
    id: "f4c4e685",
    createdAt: 1635283806093,
    subject: "Buongiorno",
    body: "Buongiorno",
    isRead: true,
    sentAt: 1635283806093,
    removedAt: null,
    from: "friend@mail.com",
    to: "contact@mail.com",
    starred: false
  },
  {
    id: "aec4dc07",
    createdAt: 1763239528243,
    subject: "おはようございます",
    body: "おはようございます",
    isRead: false,
    sentAt: 1763239528243,
    removedAt: null,
    from: "test@example.com",
    to: "user@appsus.com",
    starred: false
  },
  {
    id: "a0fa9b4b",
    createdAt: 1628823465796,
    subject: "Доброе утро",
    body: "Доброе утро",
    isRead: false,
    sentAt: 1628823465796,
    removedAt: null,
    from: "friend@mail.com",
    to: "contact@mail.com",
    starred: true
  },
  {
    id: "7445d16a",
    createdAt: 1763375617667,
    subject: 'Goede morgen',
    body: 'Goede morgen',
    isRead: false,
    sentAt: 1763375617667,
    removedAt: null,
    from: "friend@mail.com",
    to: "user@appsus.com",
    starred: true
  },
  {
    id: "145e3769",
    createdAt: 1645051369319,
    subject: "Bom dia",
    body: "Bom dia",
    isRead: true,
    sentAt: 1645051369319,
    removedAt: null,
    from: "user@appsus.com",
    to: "team@appsus.com",
    starred: true
  },
  {
    id: "a085ae63",
    createdAt: 1721628511399,
    subject: "שָׁלוֹם בּוֹקֶר טוֹב",
    body: "שָׁלוֹם בּוֹקֶר טוֹב",
    isRead: true,
    sentAt: 1721628511399,
    removedAt: null,
    from: "user@appsus.com",
    to: "user@appsus.com",
    starred: false
  }
  
]
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
