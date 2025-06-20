import React from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

import './ButtonsStyle.css';

export function PrintTableButton() {
  const displayedUsers = useSelector(state => state.displayedUsers);
  const usersType = useSelector(state => state.usersType);

  const handleExport = () => {
    const data = [
      ['Пользователь', 'Вид пользователя'],
      ...displayedUsers.map(u => {
        const typeName = usersType.find(t => t.id === u.id_type)?.name ?? '';
        return [u.name, typeName];
      })
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button className='all-buttons' onClick={handleExport}>
      Распечатать таблицу
    </button>
  );
}

export default PrintTableButton;