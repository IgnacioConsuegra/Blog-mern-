import { formatISO9075  } from "date-fns";



export default function Post({title, summary, cover, content, createdAt, author}) {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://i0.wp.com/blog.utc.edu/news/files/2025/02/Robotic-Dogs-25-29.jpg?resize=880%2C627&ssl=1"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <span className="author">{author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">
          {summary}
        </p>
      </div>
    </div>
  );
}
