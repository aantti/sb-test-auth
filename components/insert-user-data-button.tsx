"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export function InsertUserDataButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    }
    getUser();
  }, []);

  const handleInsert = async () => {
    if (!user) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from('only_auth_users_can_read')
        .insert({
          text_note: `Added by ${user.email}`,
          user_id: user.id
        });

      if (insertError) {
        console.error('Error inserting user data:', insertError);
        setMessage(`Error: ${insertError.message}`);
      } else {
        setMessage('Successfully added your data!');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mt-4">
      <Button 
        onClick={handleInsert} 
        disabled={loading}
        className="mb-2"
      >
        {loading ? 'Adding...' : 'Add My Data to Table'}
      </Button>
      {message && (
        <div className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
