// src/components/CRUD.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Alert from './Alert';

function Userlists() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });
    const [editingUser, setEditingUser] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);


    useEffect(() => {
        // Fetch data from the API and set it in the users state
        axios
            .get('https://run.mocky.io/v3/db7714b9-4225-4441-8688-a30661ffa83c')
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    useEffect(() => {
        // Save user data to local storage whenever the 'users' state changes
        localStorage.setItem('userList', JSON.stringify(users));
    }, [users]);

    const handleFormChange = () => {
        setAlert(null); // Clear any existing alert
    };


    const handleCreate = () => {
        setIsFormVisible(true);
    };


    const handleSave = () => {

        if (formData.username.trim() === '' || formData.email.trim() === '') {
            setAlert({ message: 'Please fill in both username and email.', type: 'error' });
            return;
        }


        const newUser = {
            id: users.length + 1,
            username: formData.username,
            email: formData.email,
        };


        setUsers([...users, newUser]);


        setFormData({
            username: '',
            email: '',
        });

        setIsFormVisible(false);

    };

    const handleEdit = (user) => {
        setIsFormVisible(true);
        setEditingUser(user);
        setFormData({
            username: user.username,
            email: user.email,
        });
    };

    const handleUpdate = () => {

        if (formData.username.trim() === '' || formData.email.trim() === '') {
            setAlert({ message: 'Please fill in both username and email.', type: 'error' });
            return;
        }

        if (editingUser) {
            const updatedUsers = [...users];
            const userIndex = updatedUsers.findIndex((user) => user.id === editingUser.id);

            if (userIndex !== -1) {
                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    username: formData.username,
                    email: formData.email,
                };
                setUsers(updatedUsers);
                setEditingUser(null);
                setFormData({
                    username: '',
                    email: '',
                });
            }
        }

        setIsFormVisible(false);
    };



    const handleDelete = (id) => {
        setDeleteItemId(id);
    };

    const confirmDelete = () => {
        // Perform the delete action here using the deleteItemId state
        const updatedUsers = users.filter((user) => user.id !== deleteItemId);
        setUsers(updatedUsers);
        // Close the delete confirmation dialog
        setDeleteItemId(null);
    };

    const cancelDelete = () => {
        // Close the delete confirmation dialog without deleting
        setDeleteItemId(null);
    };


    return (
        <div className="px-4 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">DATA PENGGUNA</h2>
                <button
                    className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded shadow-lg font-bold"
                    onClick={handleCreate}
                >
                    Tambah
                </button>
            </div>

            {isFormVisible && (
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Buat atau Ubah Data Pengguna</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value });
                                handleFormChange();
                            }}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                handleFormChange();
                            }}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {editingUser ? (
                            <button onClick={handleUpdate} className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded shadow-lg font-bold">
                                Ubah
                            </button>
                        ) : (
                            <button onClick={handleSave} className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded shadow-lg font-bold">
                                Tambah
                            </button>
                        )}
                        <button onClick={() => { setIsFormVisible(false); handleFormChange(); setEditingUser(null); }} className="text-red-500">
                            Batal
                        </button>
                    </div>
                </div>
            )}


            <hr className="border-b mt-4 mb-4" />

            <ul>
                {users.map((user) => (
                    <li key={user.id} className="bg-gray-200 py-6 px-8 mb-4 rounded shadow-md" style={{ backgroundColor: '#f2f2f2' }}>
                        <div className="grid grid-cols-4 items-center">
                            <div className="col-span-1">
                                <p style={{ color: '#8d8383' }}><b>Username</b></p>
                                <p className="font-semibold">{user.username}</p>
                            </div>
                            <div className="col-span-2">
                                <p style={{ color: '#8d8383' }}><b>Email</b></p>
                                <p className="font-semibold">{user.email}</p>
                            </div>
                            <div className="col-span-1 text-right">
                                <button onClick={() => handleEdit(user)} className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded shadow-lg mr-4 font-bold">
                                    Ubah
                                </button>
                                <button onClick={() => handleDelete(user.id)} disabled={editingUser} className="bg-red-800 hover-bg-red-900 text-white py-2 px-4 rounded shadow-lg font-bold">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>


            <h2><b>Jumlah Data {users.length}</b></h2>

            <div>
                {alert && <Alert message={alert.message} type={alert.type} />}
                {/* Rest of your code */}
            </div>


            {deleteItemId && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md text-center">
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={confirmDelete} className="bg-red-500 text-white py-2 px-4 rounded m-2">Yes</button>
                        <button onClick={cancelDelete} className="bg-gray-300 py-2 px-4 rounded m-2">No</button>
                    </div>
                </div>
            )}

        </div >
    );
}

export default Userlists;
