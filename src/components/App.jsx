import React, { useState, useEffect, useRef } from 'react';
import shortId from 'shortid';
import Container from './Container';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const initial = useRef(false);

  useEffect(() => {
    const contactsData = JSON.parse(localStorage.getItem('contacts'));
    if (contactsData !== null) {
      setContacts(prevState => [...prevState, ...contactsData]);
    }
  }, []);

  useEffect(() => {
    if (initial.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    initial.current = true;
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.currentTarget;
    setFilter({ value });
  };

  const formSubmit = ({ name, number }) => {
    const checkContact = prevState.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContact) {
      alert(`${name} is already in contacts`);
      return contacts;
    }

    setContacts(prevState => {
      const contacts = prevState.contacts;

      return {
        contacts: [
          {
            id: shortId.generate(),
            name,
            number,
          },
          ...contacts,
        ],
      };
    });
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(contacts.name.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

    const visibleContacts = filterContacts(filter);
    const { contacts } = this.state;
    const isContacts = contacts.length !== 0;

    return (
      <Container>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={formSubmit} />

          {isContacts && (
            <>
              <h2>Contacts</h2>
              <Filter onChange={handleChange} filter={filter} />
            </>
          )}

          <ContactList
            filterContacts={visibleContacts}
            onClickDelete={deleteContact}
          />
        </div>
      </Container>
    );
  };
};

export default App;
