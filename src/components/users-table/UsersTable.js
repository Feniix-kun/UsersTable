import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from './actions';
import ResetButton from './buttons/ResetButton';
import LoadButton from './buttons/LoadButton';
import PrintTableButton from './buttons/PrintTableButton';

import './UsersTable.css'

export function UsersTable() {
  const dispatch = useDispatch();
  const displayedUsers = useSelector(state => state.displayedUsers);
  const usersType = useSelector(state => state.usersType);

  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', id_type: 1 });

  const handleEditClick = user => {
    setEditingId(user.id);
    setFormValues({ name: user.name, id_type: user.id_type });
  };

  const handleSave = id => {
    dispatch(updateUser(id, formValues.name, Number(formValues.id_type)));
    setEditingId(null);
  };

  return (
    <div className="users-table-wrapper">
      <div className="table-box">
        <table className="user-table">
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Вид пользователя</th>
              <th className="actions-col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map(user => {
              const typeName = usersType.find(t => t.id === user.id_type)?.name;
              const isEditing = editingId === user.id;

              return (
                <tr key={user.id}>
                  <td>
                    {isEditing ? (
                      <input
                        value={formValues.name}
                        onChange={e =>
                          setFormValues(f => ({ ...f, name: e.target.value }))
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={formValues.id_type}
                        onChange={e =>
                          setFormValues(f => ({
                            ...f,
                            id_type: e.target.value,
                          }))
                        }
                      >
                        {usersType.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      typeName
                    )}
                  </td>
                  <td className="actions-col">
                    {isEditing ? (
                      <div className="actions-col-button">
                        <button className='button-table' onClick={() => handleSave(user.id)}>Сохранить</button>
                        <button className='button-table' onClick={() => setEditingId(null)}>Отмена</button>
                      </div>
                    ) : (
                      <div className="actions-col-button">
                        <button className='button-table' onClick={() => handleEditClick(user)}>Редактировать</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-row">
          <ResetButton clearEditing={() => setEditingId(null)} />
          <LoadButton clearEditing={() => setEditingId(null)} />
          <PrintTableButton />
        </div>
      </div>
    </div>
  );
}

export default UsersTable;