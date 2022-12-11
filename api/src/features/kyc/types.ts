export type HookData = {
  applicantId: string,
  inspectionId: string,
  applicantType: string,
  correlationId: string,
  levelName: 'basic-kyc-level',
  sandboxMode: boolean,
  externalUserId: string,
  type: 'applicantReviewed',
  reviewResult: { reviewAnswer: 'GREEN' },
  reviewStatus: 'completed',
  createdAt: string // '2022-12-09 19:01:28+0000',
  clientId: string
}
