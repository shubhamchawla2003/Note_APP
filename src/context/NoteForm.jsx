import React from 'react'
import axios from 'axios';

const NoteForm = ({ setIsOpen, onSaved }) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const payload = { title: title.trim(), content: content.trim() }
        if (!payload.title && !payload.content) return

            try{
            const response = await axios.post('http://localhost:5000/api/note/add',
                {title,content},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }
            );
            
            console.log(response.data);
            if (response.data.success) {
                // call onSaved callback to refresh list in parent
                if (typeof onSaved === 'function') {
                    await onSaved();
                }
                setTitle('');
                setContent('');
                setIsOpen(false);
            }
        }catch(err){
            console.log(err);      
        }

        

        
        
    }

    const handleCancel = () => {
        setTitle('')
        setContent('')
        setIsOpen(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="note-form fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 mx-auto w-full max-w-xl bg-white p-4 sm:p-6 rounded-none sm:rounded-lg shadow-sm space-y-4 overflow-auto max-h-screen sm:max-h-[80vh]"
            aria-modal="true"
            role="dialog"
        >
            <div className="flex flex-col">
                <label htmlFor="note-title" className="mb-1 text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="note-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="note-content" className="mb-1 text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="note-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note..."
                    rows={6}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-vertical text-base"
                />
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-3 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-3 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default NoteForm
