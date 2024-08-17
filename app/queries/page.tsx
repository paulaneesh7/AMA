"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface Query {
  id: number;
  query: string;
  userId: string;
  user: User;
}

export default function Queries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQueries() {
      try {
        const response = await fetch("/api/queries");
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }

        const data = await response.json();
        setQueries(data.queries); // Assuming the API response has `queries` field containing an array of Query objects
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col mt-16 w-full px-7 md:mx-auto">
      <div className="text-2xl font-bold mb-4">Queries</div>
      <ul className="list-disc">
        {queries.map((queryObj) => (
          <li key={queryObj.id} className="mb-4">
            <div>
              <strong>Query:</strong> {queryObj.query}
            </div>
            <div>
              <strong>User:</strong> {queryObj.user.name} ({queryObj.user.email}
              )
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
