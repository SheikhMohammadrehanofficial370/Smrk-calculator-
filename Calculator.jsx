
import React, { useState, useEffect } from 'react';
import { 
  Delete, Moon, Sun, Menu, 
  Facebook, Instagram, MessageSquare, Twitter, Linkedin, 
  Send, Globe, Mail, Github, MessageCircle, 
  Youtube, X, Rss
} from 'lucide-react';

const App = () => {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  // Keyboard support fixed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9]/.test(e.key)) appendNumber(e.key);
      if (e.key === '.') appendNumber('.');
      if (e.key === '+') chooseOperation('+');
      if (e.key === '-') chooseOperation('-');
      if (e.key === '*') chooseOperation('×');
      if (e.key === '/') chooseOperation('÷');
      if (e.key === 'Enter' || e.key === '=') compute();
      if (e.key === 'Backspace') deleteDigit();
      if (e.key === 'Escape') clear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentOperand, previousOperand, operation]);

  const socialLinks = [
    { name: 'SMRK Gaming Blog', url: 'https://smrkgamingofficial.blogspot.com/?m=', icon: <Rss size={18} />, color: 'bg-[#FF5722]' },
    { name: 'SMRK YouTube', url: 'https://www.youtube.com/@smrkgamingofficial', icon: <Youtube size={18} />, color: 'bg-[#FF0000]' },
    { name: 'SMRK Facebook', url: 'https://www.facebook.com/share/1BvwZwspuC/', icon: <Facebook size={18} />, color: 'bg-[#1877F2]' },
    { name: 'SMRK Instagram', url: 'https://www.instagram.com/sheikhmohammadrehanofficial370', icon: <Instagram size={18} />, color: 'bg-[#E4405F]' },
    { name: 'SMRK Discord', url: 'https://discord.gg/Xys6Mda7N', icon: <MessageSquare size={18} />, color: 'bg-[#5865F2]' },
    { name: 'SMRK X (Twitter)', url: 'https://x.com/smrkofficial370', icon: <X size={18} />, color: 'bg-[#000000]' },
    { name: 'SMRK LinkedIn', url: 'https://www.linkedin.com/in/sheikhmohammad-rehan-550877374', icon: <Linkedin size={18} />, color: 'bg-[#0A66C2]' },
    { name: 'SMRK Telegram', url: 'https://t.me/Mohammadrehan370', icon: <Send size={18} />, color: 'bg-[#26A5E4]' },
    { name: 'SMRK GitHub', url: 'https://github.com/SheikhMohammadrehanofficial370', icon: <Github size={18} />, color: 'bg-[#181717]' },
    { name: 'SMRK WhatsApp', url: 'https://whatsapp.com/channel/0029VbBf6NpHAdNRk1vu2c2x', icon: <MessageCircle size={18} />, color: 'bg-[#25D366]' },
    { name: 'SMRK Official Web', url: 'https://sheikhmohammadrehanofficial370.my.canva.site/smrk-organisation-', icon: <Globe size={18} />, color: 'bg-[#6366F1]' },
    { name: 'SMRK Business Mail', url: 'mailto:SheikhMohammadrehanofficial370@gmail.com', icon: <Mail size={18} />, color: 'bg-[#EA4335]' },
  ];

  const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  };

  const chooseOperation = (op) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') compute();
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  const clear = () => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation(null);
  };

  const deleteDigit = () => {
    if (currentOperand === '0') return;
    const newVal = currentOperand.toString().slice(0, -1);
    setCurrentOperand(newVal === '' ? '0' : newVal);
  };

  const compute = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = current === 0 ? 'Error' : prev / current; break;
      default: return;
    }
    setCurrentOperand(result.toString());
    setOperation(null);
    setPreviousOperand('');
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center font-sans select-none ${isDarkMode ? 'bg-[#020617]' : 'bg-[#f8fafc]'}`}>
      <div className={`w-full max-w-md h-full sm:h-[90vh] flex flex-col relative overflow-hidden sm:rounded-[50px] shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-[#0f172a]'}`}>
        
        {/* Top Bar */}
        <div className="flex justify-between items-center px-8 pt-14 pb-6">
          <button onClick={() => setShowDrawer(true)} className={`p-4 rounded-2xl active:scale-90 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
            <Menu size={24} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-black italic tracking-tighter leading-none">SMRK</h1>
            <span className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">Pro Elite</span>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-4 rounded-2xl active:scale-90 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {isDarkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-indigo-600" />}
          </button>
        </div>

        {/* Display */}
        <div className="flex-1 flex flex-col justify-end px-10 pb-12 text-right">
          <div className="text-xl h-8 font-bold opacity-30 tracking-wide">
            {previousOperand} {operation}
          </div>
          <div className="text-7xl font-black break-all tracking-tighter leading-none">
            {currentOperand}
          </div>
        </div>

        {/* Keypad */}
        <div className={`grid grid-cols-4 gap-4 p-8 rounded-t-[60px] ${isDarkMode ? 'bg-[#1e293b]/50' : 'bg-slate-50 border-t border-slate-200'}`}>
          <button onClick={clear} className="col-span-2 p-6 rounded-[35px] bg-red-500 hover:bg-red-600 text-white font-black text-xl shadow-lg active:scale-95 transition-all">AC</button>
          <button onClick={deleteDigit} className={`p-6 rounded-[35px] flex justify-center items-center active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>
            <Delete size={26} />
          </button>
          <button onClick={() => chooseOperation('÷')} className="p-6 rounded-[35px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl active:scale-95 transition-all">÷</button>
          
          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => appendNumber(n.toString())} className={`p-6 rounded-[35px] font-black text-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>{n}</button>
          ))}
          <button onClick={() => chooseOperation('×')} className="p-6 rounded-[35px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl active:scale-95 transition-all">×</button>
          
          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => appendNumber(n.toString())} className={`p-6 rounded-[35px] font-black text-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>{n}</button>
          ))}
          <button onClick={() => chooseOperation('-')} className="p-6 rounded-[35px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl active:scale-95 transition-all">−</button>
          
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => appendNumber(n.toString())} className={`p-6 rounded-[35px] font-black text-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>{n}</button>
          ))}
          <button onClick={() => chooseOperation('+')} className="p-6 rounded-[35px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl active:scale-95 transition-all">+</button>
          
          <button onClick={() => appendNumber('.')} className={`p-6 rounded-[35px] font-black text-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>.</button>
          <button onClick={() => appendNumber('0')} className={`p-6 rounded-[35px] font-black text-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 shadow-sm'}`}>0</button>
          <button onClick={compute} className={`col-span-2 p-6 rounded-[35px] font-black text-4xl active:scale-95 transition-all ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white shadow-2xl'}`}>=</button>
        </div>

        {/* Drawer */}
        <div className={`fixed inset-0 z-[100] transition-all duration-500 ${showDrawer ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowDrawer(false)}></div>
          <div className={`absolute top-0 left-0 w-[85%] max-w-[320px] h-full shadow-2xl flex flex-col transition-transform duration-500 ${showDrawer ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
            <div className="p-10 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col items-center relative">
              <div className="w-20 h-20 bg-white/10 rounded-[25px] flex items-center justify-center mb-4 border border-white/20 backdrop-blur-lg">
                <span className="text-4xl font-black italic">S</span>
              </div>
              <h3 className="font-black text-2xl italic">SMRK HUB</h3>
              <button onClick={() => setShowDrawer(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-3 rounded-[20px] transition-all ${isDarkMode ? 'hover:bg-white/5 text-slate-200' : 'hover:bg-slate-100 text-slate-700'}`}>
                  <div className={`w-10 h-10 rounded-[15px] flex items-center justify-center text-white ${link.color}`}>{link.icon}</div>
                  <span className="text-xs font-bold">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
