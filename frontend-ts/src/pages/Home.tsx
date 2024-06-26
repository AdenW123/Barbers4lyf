// import HomePage from "../Components/HomePage/HomePage";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../Components/Note/Note"
import { NoteType } from "../Components/Note/Note"; // Import the NoteType interface



function Home() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id: number) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>        
        <div>
          <div>Welcome , to Barbers4lyf </div>
          <div></div>
          <br></br>
          <div>Our Mission</div>
          <div>
            Encourage people that use the skill of barbering to lose any fear in
            their abilities and teach new capabilities for barbers to start
            other business ventures.
          </div>
        </div>
      </div>
      <div>
        <div>JoinTheTeam</div>
        {/* <Button className="button"></Button> */}
      </div>

      <div>
        <h2>My Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <div className="note-container">
        <form onSubmit={createNote}>
          <label className="note-title" htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>


  );
}

export default Home
