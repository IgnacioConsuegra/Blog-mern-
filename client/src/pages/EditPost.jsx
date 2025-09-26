import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";




export function EditPost() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFile] = useState("");
  const [redirect, setRedirect] = useState("");

 
  function updatePost(ev){
    ev.preventDefault();
  }
  useEffect(() => {
    fetch("http://localhost:4000/post/"+id)
    .then(response => {
      response.json().then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })

    })
  }, [])

   if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input type="file" onChange={ev => setFile(ev.target.files)} />
      <Editor onChange={setContent} value={content}/>
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
