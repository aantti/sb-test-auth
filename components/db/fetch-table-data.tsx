"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface FetchTableDataProps {
  tableName: string;
}

export function FetchTableData({ tableName }: FetchTableDataProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        /*if (!user) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }*/

        // Fetch table data with automatic auth
        const { data: tableData, error: fetchError } = await supabase
          .from(tableName)
          .select("*");

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setData(tableData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        {!user ? <div>Why: log in to view protected data?</div> : <div>Hm..</div>}        
      </div>
    );
  }

  /*if (!user) {
    return <div>Please log in to view protected data</div>;
  }*/

  return (
    <div>
      <h3>Data from {tableName}:</h3>
      <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

