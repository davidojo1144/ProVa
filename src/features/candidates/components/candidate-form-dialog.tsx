"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import type { Candidate, CandidateDraft, Stage } from "@/types/candidate";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STAGE_LIST } from "@/features/candidates/lib/stages";
import {
  candidateSchema,
  parseTags,
  type CandidateFormValues,
} from "@/features/candidates/schemas/candidate-schema";
import { useCandidatesStore } from "@/store/candidates-store";
import { cn } from "@/lib/utils";

interface CandidateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Present when editing an existing candidate. */
  candidate?: Candidate | null;
  /** Stage pre-selected when adding from a board column. */
  defaultStage?: Stage;
}

const STAGE_ITEMS = STAGE_LIST.map((stage) => ({
  value: stage.value,
  label: stage.label,
}));

export function CandidateFormDialog({
  open,
  onOpenChange,
  candidate,
  defaultStage = "applied",
}: CandidateFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {candidate ? "Edit candidate" : "Add candidate"}
          </DialogTitle>
          <DialogDescription>
            {candidate
              ? "Update the details for this candidate."
              : "Add someone to the hiring pipeline."}
          </DialogDescription>
        </DialogHeader>

        {/* Remounts per candidate so defaults reload without an effect. */}
        <CandidateForm
          key={candidate?.id ?? `new-${defaultStage}`}
          candidate={candidate}
          defaultStage={defaultStage}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function CandidateForm({
  candidate,
  defaultStage,
  onDone,
}: {
  candidate?: Candidate | null;
  defaultStage: Stage;
  onDone: () => void;
}) {
  const addCandidate = useCandidatesStore((state) => state.addCandidate);
  const updateCandidate = useCandidatesStore((state) => state.updateCandidate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: candidate?.name ?? "",
      email: candidate?.email ?? "",
      role: candidate?.role ?? "",
      stage: candidate?.stage ?? defaultStage,
      phone: candidate?.phone ?? "",
      location: candidate?.location ?? "",
      source: candidate?.source ?? "",
      resumeUrl: candidate?.resumeUrl ?? "",
      tags: candidate?.tags.join(", ") ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const draft: CandidateDraft = {
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role.trim(),
      stage: values.stage,
      phone: values.phone?.trim() || undefined,
      location: values.location?.trim() || undefined,
      source: values.source?.trim() || undefined,
      resumeUrl: values.resumeUrl?.trim() || undefined,
      tags: parseTags(values.tags),
    };

    if (candidate) {
      updateCandidate(candidate.id, draft);
    } else {
      addCandidate(draft);
    }

    onDone();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          error={errors.name?.message}
          className="sm:col-span-2"
        >
          <Input
            autoFocus
            placeholder="Amara Okafor"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="amara@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message} optional>
          <Input placeholder="+234 800 000 0000" {...register("phone")} />
        </Field>

        <Field label="Role" error={errors.role?.message}>
          <Input
            placeholder="Frontend Engineer"
            aria-invalid={Boolean(errors.role)}
            {...register("role")}
          />
        </Field>

        <Field label="Stage" error={errors.stage?.message}>
          <Controller
            control={control}
            name="stage"
            render={({ field }) => (
              <Select
                items={STAGE_ITEMS}
                value={field.value}
                onValueChange={(value) => field.onChange(value as Stage)}
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
            )}
          />
        </Field>

        <Field label="Location" error={errors.location?.message} optional>
          <Input placeholder="Lagos, NG" {...register("location")} />
        </Field>

        <Field label="Source" error={errors.source?.message} optional>
          <Input placeholder="Referral, LinkedIn…" {...register("source")} />
        </Field>

        <Field
          label="Résumé link"
          error={errors.resumeUrl?.message}
          optional
          className="sm:col-span-2"
        >
          <Input
            placeholder="https://…"
            aria-invalid={Boolean(errors.resumeUrl)}
            {...register("resumeUrl")}
          />
        </Field>

        <Field
          label="Tags"
          error={errors.tags?.message}
          optional
          hint="Comma separated"
          className="sm:col-span-2"
        >
          <Input placeholder="react, typescript" {...register("tags")} />
        </Field>
      </div>

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {candidate ? "Save changes" : "Add candidate"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="justify-between">
        <span>{label}</span>
        {optional && (
          <span className="text-muted-foreground text-xs font-normal">
            {hint ?? "Optional"}
          </span>
        )}
      </Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
