import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        list_data: [],
        list_key:[],
        counter:0
    },
    mutations: {
        add_list: (state, data) => {
            state.list_data=[]
            console.log('data')
            data.forEach((items) => {
                const item = items.data();
                const key=items.id
                state.list_data.push(item);
                state.list_key.push(key)
            });
        },
        increament:(state)=>{
            state.counter++
        }
    }
})
