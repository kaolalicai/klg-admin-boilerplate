import convertFilterOptions from 'utils/convertFilterOptions'

const Const = {
  USER_ROLES_TEXT: {
    INVESTOR: '投资者',
    BORROWER: '借款人'
  }
}

Const.USER_ROLES_OPTIONS = convertFilterOptions(Const.USER_ROLES_TEXT)

export default Const
