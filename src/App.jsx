import React from 'react';
import ChatMascotPlugin from './components/ChatMascotPlugin';
import './App.css';

export default function App() {
  return (
    <div>
      <header style={{ padding: 20 }}>
        <h1>Тестовая страница</h1>
        <p>Это обычный сайт. Плагин с маскотом появится в углу.</p>
      </header>
      <ChatMascotPlugin />
    </div>
  );
}
