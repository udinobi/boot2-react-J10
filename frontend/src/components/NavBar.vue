<template>
    <nav class='navbar navbar-expand-sm navbar-dark bg-dark'>
        <a class='navbar-brand' href='#'>World Geo Locations</a>
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbar-div' aria-controls='navbar-div' aria-expanded='false' aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbar-div'>
            <ul class='navbar-nav mr-auto'>
                <li class='nav-item active'><router-link to='/' class='nav-link'>Home <span class='sr-only'>(current)</span></router-link></li>
                <li class='nav-item'><router-link to='/about' class='nav-link'>About</router-link></li>
            </ul>
            <form class='form-inline my-2 my-md-0'>
                <input class='form-control' type='text' placeholder='Search'>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
        }
    }
}
</script>

<style scoped>
select {
    display: block;
    margin: auto;
}
</style>
