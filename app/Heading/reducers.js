const def = {title: '-'}

export const heading = (state = def, action) => {
  if (action.type === 'SET_TITLE') {
    return {title: action.title}
  }
  return state
}
