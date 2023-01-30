import React, { Component } from 'react';
import shortId from 'shortid';
import Container from './Container';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts !== null) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  formSubmit = ({ name, number }) => {
    const checkContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
     if (checkContact) {
        alert(`${name} is already in contacts`);
        return this.state.contacts;
      }
    this.setState(prevState => {
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

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const visibleContacts = this.filterContacts();
    const { contacts } = this.state;
    const isContacts = contacts.length !== 0;

    return (
      <Container>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmit} />

          {isContacts && (
            <>
              <h2>Contacts</h2>
              <Filter onChange={this.handleChange} filter={this.state.filter} />
            </>
          )}

          <ContactList
            filterContacts={visibleContacts}
            onClickDelete={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}

export default App;