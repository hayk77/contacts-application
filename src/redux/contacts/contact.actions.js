import { v4 as uuidv4 } from 'uuid';
import {
  GET_CONTACTS,
  CREATE_CONTACT,
  REMOVE_CONTACT,
  CONTACT_ERROR,
} from './contact.types';

export const getContacts = () => (dispatch) => {
  try {
    dispatch({
      type: GET_CONTACTS,
      payload: JSON.parse(localStorage.getItem('contacts')),
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: 'Error: Could not get contacts',
    });
  }
};

export const createContact = (formData) => (dispatch) => {
  try {
    // add to local storage
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    formData.id = uuidv4();

    if (!contacts) {
      localStorage.setItem('contacts', JSON.stringify([formData]));
    } else {
      localStorage.setItem('contacts', JSON.stringify([...contacts, formData]));
    }

    dispatch({
      type: CREATE_CONTACT,
      payload: formData,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: 'Error: Could not create contact',
    });
  }
};

export const removeContact = (id) => (dispatch) => {
  try {
    // remove from local storage
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    contacts.forEach((contact, index) => {
      if (contact.id === id) {
        contacts.splice(index, 1);
      }
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    dispatch({
      type: REMOVE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: 'Error: Could not remove contact',
    });
  }
};
