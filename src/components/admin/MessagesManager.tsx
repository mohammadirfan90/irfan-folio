"use client";

import React, { useState } from "react";
import { deleteMessageAction } from "@/actions/contact";
import { ContactMessage } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setErrorMsg("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setIsDeleting(true);
    setErrorMsg("");

    try {
      const res = await deleteMessageAction(id);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        setSelectedMessage(null);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      {/* Messages List Column */}
      <div className="md:col-span-5">
        <MagicCard
          mode="gradient"
          gradientColor="rgba(42, 77, 215, 0.03)"
          gradientSize={200}
          className="border border-outline-variant/20 rounded-2xl shadow-sm p-6 space-y-6"
        >
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
            <h2 className="font-headline-md text-[18px] text-primary font-semibold">
              Inbox ({messages.length})
            </h2>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <p className="text-sm text-on-surface-variant font-body-md">
                No messages received yet.
              </p>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block ${
                    selectedMessage?.id === msg.id
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-white border-outline-variant/15 hover:border-outline-variant/40"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="font-display font-semibold text-sm text-primary truncate max-w-[70%]">
                      {msg.name}
                    </span>
                    <span className="font-label-mono text-[9px] text-on-surface-variant shrink-0 mt-0.5">
                      {new Date(msg.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="font-body-md font-medium text-xs text-on-surface truncate mb-1">
                    {msg.subject}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant font-body-sm line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </button>
              ))
            )}
          </div>
        </MagicCard>
      </div>

      {/* Message Detail Viewer Column */}
      <div className="md:col-span-7">
        {selectedMessage ? (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.03)"
            gradientSize={200}
            className="border border-outline-variant/20 rounded-2xl shadow-sm p-6 space-y-6"
          >
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-outline-variant/10 pb-4 gap-4">
              <div className="space-y-1 truncate">
                <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-wider block">
                  Message Details
                </span>
                <h3 className="font-display text-lg font-bold text-primary truncate">
                  {selectedMessage.subject}
                </h3>
                <p className="text-xs text-on-surface-variant font-body-md">
                  From: <span className="font-semibold text-on-surface">{selectedMessage.name}</span> &lt;
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="hover:underline text-secondary font-medium"
                  >
                    {selectedMessage.email}
                  </a>
                  &gt;
                </p>
              </div>

              <span className="font-label-mono text-[10px] text-on-surface-variant shrink-0 mt-1">
                {new Date(selectedMessage.created_at).toLocaleString()}
              </span>
            </div>

            {/* Message Body */}
            <div className="font-body-md text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed min-h-[20vh] bg-surface-container-low/50 p-4 border border-outline-variant/10 rounded-xl">
              {selectedMessage.message}
            </div>

            {errorMsg && (
              <p className="font-body-md text-xs text-error bg-surface p-2 border border-outline-variant/10 rounded">
                {errorMsg}
              </p>
            )}

            {/* Actions Bar */}
            <div className="flex gap-3 pt-4 border-t border-outline-variant/10">
              <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                <Button size="sm" className="cursor-pointer">
                  Reply via Email
                </Button>
              </a>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={() => handleDelete(selectedMessage.id)}
                className="cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete Message"}
              </Button>
            </div>
          </MagicCard>
        ) : (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.02)"
            gradientSize={150}
            className="bg-surface-container-low border border-dashed border-outline-variant/30 p-12 rounded-2xl text-center cursor-default"
          >
            <span className="material-symbols-outlined text-on-surface-variant/40 text-[48px] mb-2 block">
              mail
            </span>
            <p className="font-body-md text-sm text-on-surface-variant">
              Select a message from the inbox to read its details or send a reply.
            </p>
          </MagicCard>
        )}
      </div>
    </div>
  );
}
