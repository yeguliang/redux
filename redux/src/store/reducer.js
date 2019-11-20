const defaultState = {
    inputValue:'请输入内容',
    list:[
        '1'
    ]
}
export default (state = defaultState , action )=>{
    // console.log(state,action,'564556')
    if(action.type === 'change-input-value'){
        const newState=JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState;
    }
    if(action.type === 'change-list'){
        const newState=JSON.parse(JSON.stringify(state))
        newState.list=action.list
        newState.inputValue=''
        return newState;
    }

  if(action.type === 'getTodoList'){
    const newState=JSON.parse(JSON.stringify(state))
    newState.list=action.list
    return newState;
  }
   
    if(action.type === 'list-delete'){
        const newState=JSON.parse(JSON.stringify(state))
        newState.list=action.list
        return newState;
    }
    return state
}