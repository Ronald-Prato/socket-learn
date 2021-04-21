type RejectReasonCode = 'MatchRejected'

export interface IRejectInfo {
  guilty: string
  reason: RejectReasonCode
}
