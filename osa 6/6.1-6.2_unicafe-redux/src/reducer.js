const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good + 1
      const newGoodState = {
        good: newGood, 
        ok: state.ok,
        bad: state.bad
      }
      return newGoodState
    case 'OK':
      const newOk = state.ok + 1
      const newOkState = {
        good: state.good, 
        ok: newOk,
        bad: state.bad
      }
      return newOkState
    case 'BAD':
      const newBad = state.bad + 1
      const newBadState = {
        good: state.good, 
        ok: state.ok,
        bad: newBad
      }
      return newBadState
    case 'ZERO':
      const deleteAll = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return deleteAll
    default: return state
  }
  
}

export default counterReducer