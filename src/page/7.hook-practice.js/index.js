import React, { useState, useEffect } from "react";
import "./style.scss";

const GithubListClass = () => {
  const [page, setPage] = useState(1);
  const [commits, setCommits] = useState([]);

  const nextPage = () => {
    setPage(page + 1);
  }

  const firstPage = () => {
    setPage(1);
  }

  useEffect(() => {
    fetch(`https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`, {
      method: "GET",
      headers: new Headers({"Accept": "application/vnd.github.cloak-preview"}),
    })
      .then(data => data.json())
      .then(response => setCommits(response.items))
      .catch(error => console.log(error))
  }, [page])

  return (
    <div>
      {commits.length !== 0 
      && <button onClick={ nextPage }> next page </button>}

      {commits.length === 0 
      && <button onClick={ firstPage }> first Page </button>}

      {commits.map(c => (
        <div key={c.sha}> 
          {
            c.commit && (
              <div className="commit-container">
                <p> {c.commit.committer.name}</p>
                <p> {c.commit.message}</p>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default GithubListClass;