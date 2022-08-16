import axios from 'axios';

const SERVER_URL = 'http://localhost:9000';


//* GET /contacts
//* get all Contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

//* GET /contacts/:contactId
//* get contact with ID
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}


//* GET /groups
//* get all groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}


//* GET /groups/:groupsId
//* get group with ID
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

//* POST /contacts
//* Create Contact
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
}


//* PUT /contacts/:contactId
//* Update Contacts
export const updateContact = (contact,contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact)
}

//* DELETE /contacts/:contactId
//* Delete Contacts

export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}

