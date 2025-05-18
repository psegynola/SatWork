<template>
    <header>
        <h1>{{title}}</h1>
        <button :style="{background:bgColor}">{{ action }}</button>
    </header>
</template>

<script>
        export default {
        name: "Header",
        props:{
            title: String,
            action: String,
            bgColor: String

            }
        }
    

</script>


<style>
button{
    background-color: lightblue;
    border: black;
    color: black;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 12px;
    border: 2px solid black;
    
}


</style>