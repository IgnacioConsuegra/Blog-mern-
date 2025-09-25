import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
export default function CreatePost(){
  return(
    <form action="">
      <input type="title" placeholder="Title"/>
      <input type="summary" placeholder="Summary"/>
      <input type="file" />
      <ReactQuill></ReactQuill>
    </form>
  )
}