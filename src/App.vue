<template>

    <div class="container">
        <Header title="My Header" action="Sign Up" bgColor="lightgreen"/>
    </div>
       
    <div v-show= "!isEditMode" id="display-view">
        <h3>User Profile - View</h3>
        <p><img :src="photo"></p>

        <p><span>Name:</span> <b id="name">{{ name }}</b></p>
        <p><span>Email:</span> <b id="email">{{ email }}</b></p>

        <button @click="handleEditButton()">Edit Profile</button>
    </div>

    <div v-show= "isEditMode" id="edit-view">
        <h3>User Profile - Edit</h3>
        <p><img :src="photo"></p>

        <p><span>Name:</span> 
            <input type="text" id="input-name" v-model="name"/>
        </p>

        <p>
            <span>Email:</span> 
            <input type="text" id="input-email" v-model="email"/>
        </p>

        <button @click="handleUpdateButton()">Update Profile</button>
    </div>

    <div class="container">
        <Header title="My Footer" action="Delete Account" bgColor="pink"/>
    </div>
</template>

<script>
    import image from "./lion.jpeg";
    import Header from "./Header.vue";

    export default {
        name: "App",
        components: {
            Header
        },
        data() {
            return {
                photo:image,
                name: "",
                email: "",
                isEditMode: false
            }
        },

        async created(){
            const userData = await this.fetchUserProfile()
            this.name = userData.name
            this.email = userData.email

        },

        methods:{
            handleEditButton() {
                this.isEditMode=true;

            },

            async handleUpdateButton(){
                const payload = {
                    name: this.name,
                    email: this.email
                }
                const resJson = await this.updateUserProfile(payload)
                console.log(resJson)

                this.isEditMode=false;

            },

            async fetchUserProfile(){
                const res = await fetch('get-profile')
                return await res.json()
            },
            async updateUserProfile(payload){
                const res = await fetch('update-profile', {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify(payload)
                })
                return await res.json()
            }

        }
    }

</script>


<style>
    img {
    max-width: 40%;
    height: auto;
}

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