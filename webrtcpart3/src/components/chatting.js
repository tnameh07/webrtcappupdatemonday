import React, { useState, useEffect, useRef } from
    'react'
    ;

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false); const [message, setMessage] = useState(
        ''
    ); const inputRef = useRef(null); useEffect(() => {
        const handleResize = () => { if (isOpen && inputRef.current) { window.scrollTo(0, document.body.scrollHeight); } }; window.addEventListener(
            'resize'
            , handleResize); return () => window.removeEventListener(
                'resize'
                , handleResize);
    }, [isOpen]); const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) { setTimeout(() => { if (inputRef.current) { inputRef.current.focus(); window.scrollTo(0, document.body.scrollHeight); } }, 100); }
    }; return (<div className="
fixed bottom-0 right-0 p-4
">      <button onClick={toggleChat} className="
bg-blue-500 text-white p-2 rounded
"      >        {isOpen ?
                'Close Chat'
                :
                'Open Chat'
            }      </button>      {isOpen && (<div className="
mt-2 p-4 bg-white border rounded shadow-lg
">          <div className="
h-40 overflow-y-auto mb-2
">            {/* Chat messages would go here */}          </div>          <input ref={inputRef} type="
text
"            value={message} onChange={(e) => setMessage(e.target.value)} className="
w-full border p-2 rounded
"            placeholder="
Type a message...
"          />        </div>)}    </div>);
};


export default ChatBox;