import request from '@/utils/request'

export function getTableData() {
  return request.get('/sales/api/v1/partnerInvitation/invitations')
}
