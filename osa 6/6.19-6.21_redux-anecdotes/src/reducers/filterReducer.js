const initialFilter = ''

//Action creators
export const typeUpdate = (content) => {
return {type: 'TYPE', content}
}
//--------------

const reducer = (state = initialFilter, action) => {
    switch (action.type) {
        case 'TYPE':
            const content = action.content
            return content
        default: return state    
    }
            
}

export default reducer