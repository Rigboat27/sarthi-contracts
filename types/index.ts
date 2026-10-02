/**
 * Shared Sarthi contracts — the single source of truth for field names and
 * response shapes. Mirrors `schemas/*.json`. If you change a field here, change
 * the schema too, and bump the version.
 */

export type AccountType =
  | "bank"
  | "demat"
  | "mutual_fund"
  | "insurance"
  | "ppf"
  | "fd";

export interface Nominee {
  name: string;
  relationship: string;
  verified: boolean;
}

export interface Holding {
  id: string;
  type: AccountType;
  provider: string;
  providerCode: string;
  label: string;
  maskedNumber?: string | null;
  value?: number | null;
  identifier?: string | null;
  detail?: string | null;
  fixUrl?: string | null;
  nominee?: Nominee | null;
}

export type FipType = "DEPOSIT" | "INVESTMENTS" | "INSURANCE" | "PPF";

export interface Fip {
  fipId: string;
  type: FipType;
  data: Holding[];
}

export interface AaConsentArtefact {
  consentId: string;
  purpose: string;
  purposeCode: string;
  fipTypes: string[];
  expiresAt?: string;
}

export interface AaConsentResponse {
  consentId: string;
  artefact: AaConsentArtefact;
}

export interface AaFetchResponse {
  consentId: string;
  fips: Fip[];
}

export interface TokenUsage {
  in?: number;
  out?: number;
}

export interface Meta {
  tokens?: TokenUsage;
  costEstimateInr?: number;
  mock?: boolean;
}

export interface ApiEnvelope<T = unknown> {
  ok: boolean;
  data: T | null;
  meta: Meta;
  error: unknown;
}

export type EntityType = "broker" | "listed company" | "RTA" | "IEPF";

export type PriorContactProof = "emailed" | "none" | "rejected";

export interface Attachment {
  /** In-memory only. Never persisted. */
  dataUrl: string;
  name: string;
  size: number;
  type: string;
}

export interface GrievanceState {
  complaintCategory: string | null;
  entityName: string | null;
  entityType: EntityType | null;
  clientIdFolioNoDpid: string | null;
  issueSummaryEnglish: string | null;
  issueSummaryOriginal: string | null;
  incidentDate: string | null;
  amountInvolved: number | null;
  priorContactDate: string | null;
  priorContactProof: PriorContactProof | null;
  priorContactConfirmed: boolean;
  priorContactTicket: string | null;
  userName: string | null;
  userPhone: string | null;
  soldDescription: string | null;
  reliefSought: string | null;
  attachments: Attachment[];
  userLanguage: string;
  skippedFields: string[];
}

export interface FamilyMember {
  name: string;
  relationship: string;
  share: number | null;
}

export interface Affidavit {
  deceasedName: string;
  applicantName: string;
  relationship: string;
  folioOrDpid?: string;
  familyTree: FamilyMember[];
  noObjectionFrom?: string[];
}
