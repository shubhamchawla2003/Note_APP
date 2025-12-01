import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteForm from '../context/NoteForm';
import axios from 'axios';
import { NotesEndpoint } from '../api/url';


const Home = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [notes, setNotes] = React.useState([]);
    const [filteredNotes, setFilteredNotes] = React.useState([]);
    const [query, setQuery] = React.useState('');

  // to get the notes and display them
  const fetchNotes = React.useCallback(async () => {
    try {
    const { data } = await axios.get(NotesEndpoint());
      console.log(data);
      setNotes(data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(NotesEndpoint(`/${id}`), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (data.success) {
            setNotes((prev) => prev.filter((n) => n._id !== id));
        } else {
            console.log('Delete failed', data);
        }
    } catch (error) {
        console.log("Error deleting note:", error);
    }
};

useEffect(() => {
    setFilteredNotes(notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())))
}, [query, notes]);


return (
    <div className="min-h-screen bg-gray-900 ">
        
        <Navbar setQuery={setQuery} />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.length > 0 ? filteredNotes.map((note) => (
                <div key={note._id} className="bg-white p-4 rounded-lg shadow-md relative">
                    <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                    <p className="text-gray-700">{note.content}</p>

                    <div className="flex gap-2 mt-4">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )) : <p className=' text-white text-2xl'>No Notes</p>}
        </div>

        <button
            onClick={() => setIsOpen(true)}
            className="fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-3 sm:p-4 rounded-full text-xl sm:text-2xl shadow-lg"
            aria-label="Add note"
        >
            +
        </button>
        {isOpen && <NoteForm setIsOpen={setIsOpen} onSaved={fetchNotes} />}
    </div>
)
}

export default Home
