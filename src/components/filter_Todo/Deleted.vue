<template>
    <div>
        {{$store.state.counter}}
        <button @click="increament">Increament</button>
    </div>
</template>

<script>
export default {
    methods:{
        increament(){
            this.$store.commit("increament")
        }
    }
     
}
</script>