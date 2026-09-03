"use client";

import { useState } from "react";
import { ExternalLink, Mail, MapPin, Phone, Radio, Trash2 } from "lucide-react";

import type { Candidate, Stage } from "@/types/candidate";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/features/candidates/components/rating-stars";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
import { useCandidatesStore } from "@/store/candidates-store";
import { formatDate, formatRelativeTime, initials } from "@/lib/format";

interface CandidateDetailSheetProps {
  candidate: Candidate | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (candidate: Candidate) => void;
}

const STAGE_ITEMS = STAGE_LIST.map((stage) => ({
  value: stage.value,
  label: stage.label,
}));

export function CandidateDetailSheet({
  candidate,
  onOpenChange,
  onEdit,
}: CandidateDetailSheetProps) {
  return (
    <Sheet open={Boolean(candidate)} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        {candidate && (
          <CandidateDetail
            key={candidate.id}
            candidate={candidate}
            onEdit={() => onEdit(candidate)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function CandidateDetail({
  candidate,
  onEdit,
}: {
  candidate: Candidate;
  onEdit: () => void;
}) {
  const moveCandidate = useCandidatesStore((state) => state.moveCandidate);
  const rateCandidate = useCandidatesStore((state) => state.rateCandidate);
  const addNote = useCandidatesStore((state) => state.addNote);
  const removeNote = useCandidatesStore((state) => state.removeNote);
  const [note, setNote] = useState("");

  const submitNote = (event: React.FormEvent) => {
    event.preventDefault();
    const body = note.trim();
    if (!body) return;
    addNote(candidate.id, body);
    setNote("");
  };

  return (
    <>
      {/* pr-12 keeps the header clear of the sheet's close button. */}
      <SheetHeader className="gap-3 pr-12">
        <div className="flex items-start gap-3">
          <span className="bg-muted text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            {initials(candidate.name)}
          </span>
          <div className="min-w-0 flex-1">
            <SheetTitle className="truncate">{candidate.name}</SheetTitle>
            <SheetDescription className="truncate">
              {candidate.role}
            </SheetDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </div>

        <dl className="text-muted-foreground grid gap-1.5 text-xs">
          <ContactRow icon={<Mail className="size-3.5" />} label="Email">
            <a
              href={`mailto:${candidate.email}`}
              className="hover:text-foreground underline-offset-2 hover:underline"
            >
              {candidate.email}
            </a>
          </ContactRow>
          {candidate.phone && (
            <ContactRow icon={<Phone className="size-3.5" />} label="Phone">
              {candidate.phone}
            </ContactRow>
          )}
          {candidate.location && (
            <ContactRow icon={<MapPin className="size-3.5" />} label="Location">
              {candidate.location}
            </ContactRow>
          )}
          {candidate.source && (
            <ContactRow icon={<Radio className="size-3.5" />} label="Source">
              {candidate.source}
            </ContactRow>
          )}
          {candidate.resumeUrl && (
            <ContactRow
              icon={<ExternalLink className="size-3.5" />}
              label="Résumé"
            >
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline-offset-2 hover:underline"
              >
                View résumé
              </a>
            </ContactRow>
          )}
        </dl>

        {candidate.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {candidate.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </SheetHeader>

      <div className="flex flex-col gap-5 px-4 pb-6">
        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="flex flex-col gap-1.5">
            <h3 className="text-xs font-medium">Stage</h3>
            <Select
              items={STAGE_ITEMS}
              value={candidate.stage}
              onValueChange={(value) =>
                moveCandidate(candidate.id, value as Stage)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGE_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section className="flex flex-col gap-1.5">
            <h3 className="text-xs font-medium">Rating</h3>
            <div className="flex h-8 items-center gap-2">
              <RatingStars
                size="md"
                value={candidate.rating}
                onChange={(rating) => rateCandidate(candidate.id, rating)}
              />
              <span className="text-muted-foreground text-xs">
                {candidate.rating > 0 ? `${candidate.rating}/5` : "Unrated"}
              </span>
            </div>
          </section>
        </div>

        <Separator />

        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">
            Notes
            {candidate.notes.length > 0 && (
              <span className="text-muted-foreground ml-1.5 text-xs font-normal">
                {candidate.notes.length}
              </span>
            )}
          </h3>

          <form onSubmit={submitNote} className="flex flex-col gap-2">
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Interview feedback, next steps…"
              rows={3}
            />
            <Button
              type="submit"
              size="sm"
              className="self-end"
              disabled={!note.trim()}
            >
              Add note
            </Button>
          </form>

          {candidate.notes.length === 0 ? (
            <p className="text-muted-foreground text-xs">
              No notes yet. Capture interview feedback as it happens.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {candidate.notes.map((item) => (
                <li
                  key={item.id}
                  className="group/note bg-muted/50 flex items-start gap-2 rounded-lg p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm wrap-break-word whitespace-pre-wrap">
                      {item.body}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {formatRelativeTime(item.createdAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Delete note"
                    className="text-muted-foreground opacity-0 transition-opacity group-hover/note:opacity-100 focus-visible:opacity-100"
                    onClick={() => removeNote(candidate.id, item.id)}
                  >
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Separator />

        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Activity</h3>
          <ol className="flex flex-col gap-2.5">
            {candidate.activity.slice(0, 8).map((entry) => (
              <li key={entry.id} className="flex items-start gap-2.5 text-xs">
                <span
                  className="bg-border mt-1 size-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                <span className="flex-1">{entry.message}</span>
                <span className="text-muted-foreground shrink-0">
                  {formatRelativeTime(entry.createdAt)}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground text-xs">
            Applied {formatDate(candidate.createdAt)}
          </p>
        </section>
      </div>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <dt className="flex items-center gap-2">
        {icon}
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="truncate">{children}</dd>
    </div>
  );
}
