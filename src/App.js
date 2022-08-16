import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import './App.css';
import { ContactContext } from './context/contactContext';
import { useImmer } from 'use-immer';
import {toast, ToastContainer} from 'react-toastify';

//My Components 😍
import Navbar from './components/Navbar';
import Contacts from './components/Contact/Contacts';
import AddContact from './components/Contact/AddContact';
import EditContact from './components/Contact/EditContact';
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
  updateContact,
} from './services/contactService';
import ViewContact from './components/Contact/ViewContact';
import {
  CURRENTLINE,
  PURPLE,
  YELLOW,
  FOREGROUND,
  COMMENT,
} from './helpers/colors';

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [contactQuery, setContactQuery] = useImmer({ text: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async values => {
    try {
      setLoading(draft => !draft);
      const { status, data } = await createContact(values);

      /*
       * NOTE
       * 1- Rerender -> forceRender, setForceRender
       * 2- setContact(data)
       */

      if (status === 201) {
        toast.success('مخاطب با موفقیت ساخته شد', {icon: '😍'})
        setContacts(draft => {
          draft.push(data);
        });
        setFilteredContacts(draft => {
          draft.push(data);
        });
        setLoading(prevLoading => !prevLoading);
        navigate('/contacts');
      }
    } catch (err) {
      console.log(err.message);
      setLoading(prevLoading => !prevLoading);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: '1em',
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async contactId => {
    const allContacts = [...contacts];
    try {
      setContacts(draft => draft.filter(c => c.id !== contactId));
      setFilteredContacts(draft => draft.filter(c => c.id !== contactId));

      // Sending delete request to server
      const { status } = await deleteContact(contactId);
      toast.error('مخاطب با موفقیت پاک شد', {icon: '😎'});


      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = event => {
    setContactQuery({ ...contactQuery, text: event.target.value });

    setFilteredContacts(draft =>
      draft.filter(c =>
        c.fullname.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        setFilteredContacts,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position='top-right' theme='colored'/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};
export default App;
