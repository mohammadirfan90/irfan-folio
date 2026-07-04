import React from "react";
import { createClient } from "@/lib/supabase/server";
import { MessagesManager } from "@/components/admin/MessagesManager";
import { ContactMessage } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  // Handle case where table is not yet deployed in the database
  if (error && (error.code === "PGRST116" || error.message?.includes("does not exist"))) {
    return (
      <div className="space-y-6">
        <div>
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-2">
            Database Setup Required
          </span>
          <h1 className="font-display text-4xl text-primary font-bold">
            Inbox Panel
          </h1>
        </div>

        <MagicCard
          mode="gradient"
          gradientColor="rgba(219, 68, 85, 0.04)"
          gradientSize={200}
          className="border border-error/20 p-8 rounded-2xl space-y-4 max-w-2xl bg-white"
        >
          <span className="material-symbols-outlined text-error text-[48px] block">
            database_alert
          </span>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">
            Table "contact_messages" Not Found
          </h3>
          <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
            The database table for contact inquiries has not been deployed to your Supabase project yet.
          </p>
          <div className="bg-surface-container-low p-4 border border-outline-variant/20 rounded-xl space-y-2">
            <p className="font-label-mono text-[10px] text-primary uppercase tracking-wider font-semibold">
              Deployment Instructions:
            </p>
            <ol className="list-decimal pl-4 font-body-sm text-xs text-on-surface-variant space-y-1">
              <li>Open your Supabase Dashboard.</li>
              <li>Go to the SQL Editor.</li>
              <li>Open or copy the queries inside [supabase/add_messages_table.sql](file:///f:/AIProjects/portfolio/supabase/add_messages_table.sql).</li>
              <li>Run the query to create the table and its associated security policies.</li>
              <li>Refresh this page to access your new Messaging inbox.</li>
            </ol>
          </div>
        </MagicCard>
      </div>
    );
  }

  const messages: ContactMessage[] = data || [];

  return (
    <div className="space-y-8">
      <div>
        <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-2">
          CMS Messaging
        </span>
        <h1 className="font-display text-4xl text-primary font-bold">
          Inbox Panel
        </h1>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}
