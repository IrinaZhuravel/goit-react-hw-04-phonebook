import { useState, useEffect, useRef } from 'react';
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
      setContacts(contactsData);
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
    setFilter(value);
  };

  const formSubmit = ({ name, number }) => {
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContact) {
      alert(`${name} is already in contacts`);
      return contacts;
    }
    setContacts(prevState => {
      return [
        {
          id: shortId.generate(),
          name,
          number,
        },
        ...prevState,
      ];
    });
  };

  const filterContacts = name => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const isContacts = contacts.length !== 0;
  const visibleContacts = filterContacts(filter);

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

export default App;
