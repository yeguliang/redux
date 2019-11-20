import React,{Component} from 'react'
import store from  './../../store/index'
import axios from  'axios'

export default class Home extends Component{
    constructor(props){
        super(props)
        // console.log(store.getState())
        this.state=store.getState()
        store.subscribe(this.handleStoreChange.bind(this))
        // console.log(this.state.inputValue)
    }
    render(){
        // console.log(this.state.inputValue)
        return(
        <div>
           <div>
               <input type={'text'}  value={this.state.inputValue} onChange={(e)=>this.handleInputChange(e)} onFocus={this.handleFocus.bind(this)}/>
               <button onClick={this.handleSubmit.bind(this)}>提交</button>
           </div>
           <div>
               <ul>
                   {
                    this.state.list.map((v,i)=>(
                        <li key={v} onClick={()=>{this.handleDelete(i)}}>
                            {v}
                        </li>      
                    ))
                   }
               </ul>
           </div>
        </div>
        )
    }
    componentDidMount(){
        this.getTodoList()
    }
    getTodoList(){
        const action = ()=>{
            axios.get('/list.json').then((res)=>{
                const data = res.data;
                const action={
                  type:' getTodoList',
                  list:data,
                }
                store.dispatch(action)
            })
        }
        store.dispatch(action)
      //redux-thunk:可以传函数 函数会执行 再通过函数传值
    }
    handleStoreChange(){
        this.setState({...store.getState()})
    }
    handleFocus(){
        // console.log(1111)
        const action={
            type:'change-input-value',
            value:"",
        }
        store.dispatch(action)
    }
    handleSubmit(){
        let arr=JSON.parse(JSON.stringify(this.state.list))
        arr.push(this.state.inputValue)
        const action={
            type:'change-list',
            list:arr,
        }
        store.dispatch(action)
    }
    handleInputChange(e){
        // console.log(e.target.value)
        const action={
            type:'change-input-value',
            value:e.target.value,
        }
        store.dispatch(action)
    }
    handleDelete(i){
        // console.log(i)
        let arr=JSON.parse(JSON.stringify(this.state.list))
        arr.splice(i,1)
        const action={
            type:'list-delete',
            list:arr
        }  
        store.dispatch(action)
    }
}