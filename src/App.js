import { useState, useEffect, useRef } from 'react';
import './App.css'
import Cookies from 'js-cookie'

const oldTestamentDefault = JSON.stringify([
  {name: 'Genesis', chapters: 50, completed: []},
  {name: 'Exodus', chapters: 40, completed: []},
  {name: 'Leviticus', chapters: 27, completed: []},
  {name: 'Numbers', chapters: 36, completed: []},
  {name: 'Deuteronomy', chapters: 34, completed: []},
  {name: 'Joshua', chapters: 24, completed: []},
  {name: 'Judges', chapters: 21, completed: []},
  {name: 'Ruth', chapters: 4, completed: []},
  {name: '1 Samuel', chapters: 31, completed: []},
  {name: '2 Samuel', chapters: 24, completed: []},
  {name: '1 Kings', chapters: 22, completed: []},
  {name: '2 Kings', chapters: 25, completed: []},
  {name: '1 Chronicles', chapters: 29, completed: []},
  {name: '2 Chronicles', chapters: 36, completed: []},
  {name: 'Ezra', chapters: 10, completed: []},
  {name: 'Nehemiah', chapters: 13, completed: []},
  {name: 'Esther', chapters: 10, completed: []},
  {name: 'Job', chapters: 42, completed: []},
  {name: 'Psalms', chapters: 150, completed: []},
  {name: 'Proverbs', chapters: 31, completed: []},
  {name: 'Ecclesiastes', chapters: 12, completed: []},
  {name: 'Song of Solomon', chapters: 8, completed: []},
  {name: 'Isaiah', chapters: 66, completed: []},
  {name: 'Jeremiah', chapters: 52, completed: []},
  {name: 'Lamentations', chapters: 5, completed: []},
  {name: 'Ezekiel', chapters: 48, completed: []},
  {name: 'Daniel', chapters: 12, completed: []},
  {name: 'Hosea', chapters: 14, completed: []},
  {name: 'Joel', chapters: 3, completed: []},
  {name: 'Amos', chapters: 9, completed: []},
  {name: 'Obadiah', chapters: 1, completed: []},
  {name: 'Jonah', chapters: 4, completed: []},
  {name: 'Micah', chapters: 7, completed: []},
  {name: 'Nahum', chapters: 3, completed: []},
  {name: 'Habakkuk', chapters: 3, completed: []},
  {name: 'Zephaniah', chapters: 3, completed: []},
  {name: 'Haggai', chapters: 2, completed: []},
  {name: 'Zechariah', chapters: 14, completed: []},
  {name: 'Malachi', chapters: 4, completed: []}
])

const newTestamentDefault = JSON.stringify([
  {name: 'Matthew', chapters: 28, completed: []},
  {name: 'Mark', chapters: 16, completed: []},
  {name: 'Luke', chapters: 24, completed: []},
  {name: 'John', chapters: 21, completed: []},
  {name: 'Acts', chapters: 28, completed: []},
  {name: 'Romans', chapters: 16, completed: []},
  {name: '1 Corinthians', chapters: 16, completed: []},
  {name: '2 Corinthians', chapters: 13, completed: []},
  {name: 'Galatians', chapters: 6, completed: []},
  {name: 'Ephesians', chapters: 6, completed: []},
  {name: 'Philippians', chapters: 4, completed: []},
  {name: 'Colossians', chapters: 4, completed: []},
  {name: '1 Thessalonians', chapters: 5, completed: []},
  {name: '2 Thessalonians', chapters: 3, completed: []},
  {name: '1 Timothy', chapters: 6, completed: []},
  {name: '2 Timothy', chapters: 4, completed: []},
  {name: 'Titus', chapters: 3, completed: []},
  {name: 'Philemon', chapters: 1, completed: []},
  {name: 'Hebrews', chapters: 13, completed: []},
  {name: 'James', chapters: 5, completed: []},
  {name: '1 Peter', chapters: 5, completed: []},
  {name: '2 Peter', chapters: 3, completed: []},
  {name: '1 John', chapters: 5, completed: []},
  {name: '2 John', chapters: 1, completed: []},
  {name: '3 John', chapters: 1, completed: []},
  {name: 'Jude', chapters: 1, completed: []},
  {name: 'Revelation', chapters: 22, completed: []}
])

const bookmarkDefault = {book: '', chapter: 0}

const App = () => {


  const [oldTestament, setOldTestament] = useState(JSON.parse(oldTestamentDefault))
  const [newTestament, setNewTestament] = useState(JSON.parse(newTestamentDefault))
  const [bookmark, setBookmark] = useState(bookmarkDefault)
  const [progress, setProgress] = useState(0)
  const [flag, setFlag] = useState(false)
  
  const [doubleClickTimer, setDoubleClickTimer] = useState(null);
  const myDiv = useRef(null);
  const oldT = useRef(null);
  const newT = useRef(null);

  const setCookies = () => {
    Cookies.set('br_app_oldTestament', JSON.stringify(oldTestament));
    Cookies.set('br_app_newTestament', JSON.stringify(newTestament));
    Cookies.set('br_app_bookmark', JSON.stringify(bookmark));
  }

  const getCookies = () => {
    const oldTestamentCookie = Cookies.get('br_app_oldTestament');
    const newTestamentCookie = Cookies.get('br_app_newTestament');
    const bookmarkCookie = Cookies.get('br_app_bookmark');
    // console.log(oldTestamentCookie, newTestamentCookie, bookmarkCookie);
    setOldTestament(oldTestamentCookie ? JSON.parse(oldTestamentCookie) : JSON.parse(oldTestamentDefault))
    setNewTestament(newTestamentCookie ? JSON.parse(newTestamentCookie) : JSON.parse(newTestamentDefault))
    setBookmark(bookmarkCookie ? JSON.parse(bookmarkCookie) : bookmarkDefault)
  }

  const clearBible = () => {
    setOldTestament(JSON.parse(oldTestamentDefault))
    setNewTestament(JSON.parse(newTestamentDefault))
    setBookmark(bookmarkDefault)
  }

  const handleRightClick = (book, chapter) => {
    if(bookmark.book === book.name && bookmark.chapter === chapter)
      setBookmark({book: '', chapter: 0})
    else
      setBookmark({book: book.name, chapter: chapter})
    setFlag(!flag)
  }

  const handleClick1 = (book, i) => {
    if (doubleClickTimer) {
      // Double-click
      clearTimeout(doubleClickTimer);
      setDoubleClickTimer(null);
      // console.log('Double click');
      handleRightClick(book, i)
    } else {
      // Single click
      setDoubleClickTimer(setTimeout(() => {
        setDoubleClickTimer(null);
        // console.log('Click');
        const aux = [...oldTestament]
        aux.map((b => {
          if(b.name === book.name) {
            let index = book.completed.indexOf(i);
            if (index > -1) {
              b.completed.splice(index, 1);
            } else {
              b.completed.push(i)
            }
          }
          return 0
        }))
        
        setOldTestament(aux)
        setFlag(!flag)
      }, 250));
    }
  };

  const handleClick2 = (book, i) => {
    if (doubleClickTimer) {
      // Double-click
      clearTimeout(doubleClickTimer);
      setDoubleClickTimer(null);
      // console.log('Double click');
      handleRightClick(book, i)
    } else {
      // Single click
      setDoubleClickTimer(setTimeout(() => {
        setDoubleClickTimer(null);
        // console.log('Click');
        const aux = [...newTestament]
        aux.map((b => {
          if(b.name === book.name) {
            let index = book.completed.indexOf(i);
            if (index > -1) {
              b.completed.splice(index, 1);
            } else {
              b.completed.push(i)
            }
          }
          return 0
        }))
        
        setNewTestament(aux)
        setFlag(!flag)
      }, 250));
    }
  };

  const scrollToDiv = () => {
    myDiv.current.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToOldT = () => {
    oldT.current.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToNewT = () => {
    newT.current.scrollIntoView({ behavior: 'smooth' });
  }

  const oldTestamentBooks = oldTestament.map(book => {
    const buttons = [];
  
    for (let i = 1; i <= book.chapters; i++) {
      const isBookmark = bookmark.book === book.name && bookmark.chapter === i
      const buttonColor = book.completed.includes(i) ? 'lightgreen' : null;
        buttons.push(
          <button
            style={{backgroundColor: buttonColor, color: isBookmark ? 'red' : null, borderColor: isBookmark ? 'red' : null, border: isBookmark ? '3px solid red' : null, cursor: 'pointer'}}
            key={i}
            onClick={() => handleClick1(book, i)}
          >
            {i}
          </button>
        );
    }
  
    return (
      <div key={book.name} ref={bookmark.book === book.name ? myDiv : null} style={{backgroundColor: book.completed.length === book.chapters && 'lightgreen'}} className="book-card">
        <h2 style={{fontSize: 24}}>{book.name} <span style={{fontSize: 15}}>({book.completed.length}/{book.chapters})</span></h2>
        <div className="book-card-content">
          {buttons}
        </div>
      </div>
    );
  });

  const newTestamentBooks = newTestament.map(book => {
    const buttons = [];
  
    for (let i = 1; i <= book.chapters; i++) {
      const isBookmark = bookmark.book === book.name && bookmark.chapter === i
      const buttonColor = book.completed.includes(i) ? 'lightgreen' : null;
        buttons.push(
          <button
            style={{backgroundColor: buttonColor, color: isBookmark ? 'red' : null, borderColor: isBookmark ? 'red' : null, border: isBookmark ? '3px solid red' : null, cursor: 'pointer'}}
            key={i}
            onClick={() => handleClick2(book, i)}
          >
            {i}
          </button>
        );
    }
  
    return (
      <div key={book.name} ref={bookmark.book === book.name ? myDiv : null} style={{backgroundColor: book.completed.length === book.chapters && 'lightgreen'}} className="book-card">
        <h2 style={{fontSize: 24}}>{book.name} <span style={{fontSize: 15}}>({book.completed.length}/{book.chapters})</span></h2>
        {buttons}
      </div>
    );
  });

  // Retrieve cookies on mount
  useEffect(() => {
    getCookies()
  }, [])

  useEffect(() => {
    const calculateProgress = () => {
      let count = 0

      oldTestament.map((book => {
        count += book.completed.length
        return 0
      }))

      newTestament.map((book => {
        count += book.completed.length
        return 0
      }))

      setProgress((count * 100 / 1189).toFixed(2))
    }

    calculateProgress()
  }, [handleClick1, handleClick2, clearBible])

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <div style={{position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <div style={{marginTop: '15px', margin: '15px 25px', fontWeight: '600', fontSize: 20}}>
          <span style={{fontSize: 10}}>Jump to:</span>
          <div style={{marginTop: '5px', fontSize: 11, backgroundColor: 'lightblue', padding: '2px 5px', borderRadius: '5px', cursor: 'pointer'}} onClick={scrollToOldT}>Old testament</div>
          <div style={{marginTop: '2px', fontSize: 11, backgroundColor: 'lightblue', padding: '2px 5px', borderRadius: '5px', cursor: 'pointer'}} onClick={scrollToNewT}>New testament</div>
        </div>
        <div style={{marginRight: '5px'}}>
          <div style={{marginTop: '10px', marginRight: '20px', fontWeight: '600', fontSize: 16, backgroundColor: 'white', padding: '3px 8px', borderRadius: '8px'}}>Progress: {progress}%</div>
          {bookmark.book && <div style={{backgroundColor: 'white', marginTop: '3px', padding: '4px 10px', borderRadius: '10px', cursor: 'pointer'}} onClick={scrollToDiv}>Bookmark: <span style={{marginLeft: '10px'}}>{bookmark.book} {bookmark.chapter}</span></div>}
        </div>
      </div>
      <div style={{paddingTop: '75px'}}>
        <h1 style={{display: 'flex', justifyContent: 'center'}} ref={oldT}>Old Testament:</h1>
        <div className="books">
          {oldTestamentBooks}
        </div>
      </div>
      <div>
        <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '75px'}} ref={newT}>New Testament:</h1>
        <div className="books">
          {newTestamentBooks}
        </div>
      </div>
      <div style={{width: '95%', display: 'flex', justifyContent: 'center', margin: '20px', marginTop: '50px'}}>
        <button style={{cursor: 'pointer', color: 'green', margin: '0 35px'}} onClick={setCookies}>Save progress</button>
        <button style={{cursor: 'pointer', color: 'red'}} onClick={clearBible}>Delete progress</button>
      </div>
    </div>
  );
};

export default App;
