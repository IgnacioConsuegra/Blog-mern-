export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://i0.wp.com/blog.utc.edu/news/files/2025/02/Robotic-Dogs-25-29.jpg?resize=880%2C627&ssl=1"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>Full-house battery backup coming later this year</h2>
        <p className="info">
          <span className="author">Ignacio C</span>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          Today its a special launch event, home backup power grid
        </p>
      </div>
    </div>
  );
}
