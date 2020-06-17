const initialStyle = ''

//Action creators
export const clearStyle = () => {
    return {type: 'CLEAR'}
}

export const addNotificationStyle = (style, time) => {
    return  dispatch => {
        setTimeout(() => {
            dispatch(clearStyle())
        }, time * 1000)
        
        dispatch(
          {type: 'STYLE', style}
        )
    }
}
//--------------

const reducer = (state = initialStyle, action) => {
    switch (action.type) {
        case 'STYLE':
            return action.style
        case 'CLEAR':
            return ''   
        default: return state        
    }
}

export default reducer